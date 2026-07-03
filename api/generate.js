export const config = {
  maxDuration: 60,
};

const STYLE_PROMPTS = {
  cinematic: 'cinematic lighting, film-grade composition, dramatic depth, professional color grading',
  anime: 'anime and manga inspired, clean linework, expressive composition, polished illustration',
  photographic: 'photorealistic, professional photography, realistic lens, natural detail, sharp focus',
  '3d-model': 'high-end 3D render, detailed materials, studio lighting, octane render aesthetic',
  'digital-art': 'premium digital art, rich detail, refined concept art, elegant composition',
};

const OPENAI_IMAGE_SIZE = {
  '1:1': '1024x1024',
  '16:9': '1536x1024',
  '9:16': '1024x1536',
  '4:3': '1536x1024',
};

const OPENAI_DALLE_SIZE = {
  '1:1': '1024x1024',
  '16:9': '1792x1024',
  '9:16': '1024x1792',
  '4:3': '1792x1024',
};

const OPENAI_VIDEO_SIZE = {
  '16:9': '1280x720',
  '9:16': '720x1280',
  '1:1': '1280x720',
  '4:3': '1280x720',
};

const RUNWAY_RATIO = {
  '16:9': '1280:720',
  '9:16': '720:1280',
  '1:1': '960:960',
  '4:3': '1104:832',
};

const FAL_IMAGE_SIZE = {
  '16:9': 'landscape_16_9',
  '9:16': 'portrait_16_9',
  '1:1': 'square_hd',
  '4:3': 'landscape_4_3',
};

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const terminalReplicateStatuses = new Set(['succeeded', 'failed', 'canceled']);

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}');
  }
  return req.body;
}

function enhancePrompt({ prompt, style, styleLabel, negativePrompt }) {
  const stylePrompt = STYLE_PROMPTS[style] || '';
  const parts = [
    prompt,
    stylePrompt || (styleLabel && style !== 'none' ? `${styleLabel} style` : ''),
    'professional quality, coherent subject, refined composition, high detail',
  ].filter(Boolean);

  if (negativePrompt) {
    parts.push(`Avoid: ${negativePrompt}`);
  }

  return parts.join('. ');
}

function normalizeError(provider, responseText) {
  try {
    const parsed = JSON.parse(responseText);
    return parsed.error?.message || parsed.message || `${provider} request failed`;
  } catch {
    return responseText || `${provider} request failed`;
  }
}

async function assertOk(provider, response) {
  if (response.ok) return;
  throw new Error(normalizeError(provider, await response.text()));
}

function dataUrlFromBase64(base64, mime = 'image/png') {
  return `data:${mime};base64,${base64}`;
}

function parseDataUrl(dataUrl) {
  if (!dataUrl?.startsWith('data:')) {
    return { mime: 'image/png', data: dataUrl };
  }

  const [meta, data] = dataUrl.split(',');
  const mime = meta.match(/data:(.*?);base64/)?.[1] || 'image/png';
  return { mime, data };
}

function geminiHeaders(apiKey) {
  return {
    'x-goog-api-key': apiKey,
    'Content-Type': 'application/json',
  };
}

function arrayBufferToDataUrl(buffer, mime) {
  const base64 = Buffer.from(buffer).toString('base64');
  return dataUrlFromBase64(base64, mime);
}

function normalizeReplicateOutput(output, contentType) {
  const values = Array.isArray(output) ? output : [output];
  return values
    .flat()
    .filter(Boolean)
    .map((url) => ({
      url: typeof url === 'string' ? url : url?.url,
      type: contentType,
      mime: contentType === 'video' ? 'video/mp4' : 'image/png',
    }))
    .filter((asset) => asset.url);
}

async function generateOpenAI(body) {
  const prompt = enhancePrompt(body);

  if (body.contentType === 'video') {
    const payload = {
      model: body.model,
      prompt,
      size: OPENAI_VIDEO_SIZE[body.ratio] || OPENAI_VIDEO_SIZE['16:9'],
      seconds: String(body.duration || 4),
    };

    if (body.referenceImage) {
      payload.input_reference = { image_url: body.referenceImage };
    }

    const response = await fetch('https://api.openai.com/v1/videos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${body.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    await assertOk('OpenAI', response);
    const video = await response.json();

    if (video.status === 'completed') {
      return getOpenAIVideoContent(body.apiKey, video.id);
    }

    return {
      status: 'processing',
      job: { provider: 'openai', id: video.id, contentType: 'video' },
    };
  }

  const isDalle = body.model?.startsWith('dall-e');
  const payload = {
    model: body.model,
    prompt,
    n: isDalle ? 1 : Math.min(Number(body.imageCount) || 1, 4),
    size: isDalle ? OPENAI_DALLE_SIZE[body.ratio] : OPENAI_IMAGE_SIZE[body.ratio],
  };

  if (isDalle) {
    payload.response_format = 'b64_json';
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${body.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  await assertOk('OpenAI', response);
  const result = await response.json();
  const assets = (result.data || []).map((item) => ({
    url: item.b64_json ? dataUrlFromBase64(item.b64_json, 'image/png') : item.url,
    type: 'image',
    mime: 'image/png',
    revisedPrompt: item.revised_prompt,
  }));

  return { status: 'completed', assets };
}

async function getOpenAIVideoContent(apiKey, id) {
  const response = await fetch(`https://api.openai.com/v1/videos/${id}/content`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  await assertOk('OpenAI', response);
  const mime = response.headers.get('content-type') || 'video/mp4';
  const buffer = await response.arrayBuffer();

  return {
    status: 'completed',
    assets: [{
      url: arrayBufferToDataUrl(buffer, mime),
      type: 'video',
      mime,
    }],
  };
}

async function pollOpenAI(body) {
  const response = await fetch(`https://api.openai.com/v1/videos/${body.job.id}`, {
    headers: { Authorization: `Bearer ${body.apiKey}` },
  });

  await assertOk('OpenAI', response);
  const video = await response.json();

  if (video.status === 'completed') {
    return getOpenAIVideoContent(body.apiKey, body.job.id);
  }
  if (video.status === 'failed' || video.status === 'cancelled') {
    throw new Error(video.error?.message || 'OpenAI video generation failed');
  }

  return { status: 'processing', job: body.job };
}

async function generateStability(body) {
  const form = new FormData();
  form.append('prompt', enhancePrompt(body));
  form.append('aspect_ratio', body.ratio || '1:1');
  form.append('output_format', 'png');

  if (body.negativePrompt) {
    form.append('negative_prompt', body.negativePrompt);
  }
  if (body.style && body.style !== 'none') {
    form.append('style_preset', body.style);
  }

  const endpoint = body.model === 'ultra'
    ? 'https://api.stability.ai/v2beta/stable-image/generate/ultra'
    : 'https://api.stability.ai/v2beta/stable-image/generate/core';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${body.apiKey}`,
      Accept: 'application/json',
    },
    body: form,
  });

  await assertOk('Stability AI', response);
  const json = await response.json();
  const base64 = json.image || json.artifacts?.[0]?.base64;

  if (!base64) {
    throw new Error('Stability AI returned no image data');
  }

  return {
    status: 'completed',
    assets: [{
      url: dataUrlFromBase64(base64, 'image/png'),
      type: 'image',
      mime: 'image/png',
    }],
  };
}

async function generateRunway(body) {
  const isImageToVideo = body.model === 'gen4_turbo';
  if (isImageToVideo && !body.referenceImage) {
    throw new Error('Runway Gen-4 Turbo requires a reference image upload.');
  }

  const payload = {
    model: body.model,
    promptText: enhancePrompt(body),
    ratio: RUNWAY_RATIO[body.ratio] || RUNWAY_RATIO['16:9'],
    duration: Number(body.duration) || 4,
  };

  if (isImageToVideo) {
    payload.promptImage = body.referenceImage;
  }

  const response = await fetch(`https://api.dev.runwayml.com/v1/${isImageToVideo ? 'image_to_video' : 'text_to_video'}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${body.apiKey}`,
      'X-Runway-Version': '2024-11-06',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  await assertOk('Runway', response);
  const task = await response.json();

  return {
    status: 'processing',
    job: { provider: 'runway', id: task.id, contentType: 'video' },
  };
}

async function pollRunway(body) {
  const response = await fetch(`https://api.dev.runwayml.com/v1/tasks/${body.job.id}`, {
    headers: {
      Authorization: `Bearer ${body.apiKey}`,
      'X-Runway-Version': '2024-11-06',
    },
  });

  await assertOk('Runway', response);
  const task = await response.json();
  const status = String(task.status || '').toUpperCase();

  if (status === 'SUCCEEDED') {
    return {
      status: 'completed',
      assets: (task.output || []).map((url) => ({ url, type: 'video', mime: 'video/mp4' })),
    };
  }
  if (status === 'FAILED' || status === 'CANCELLED') {
    throw new Error(task.failure || task.error || 'Runway generation failed');
  }

  return { status: 'processing', job: body.job };
}

async function generateReplicate(body) {
  const input = body.contentType === 'video'
    ? {
        prompt: enhancePrompt(body),
        duration: Number(body.duration) || 4,
        aspect_ratio: body.ratio || '16:9',
      }
    : {
        prompt: enhancePrompt(body),
        aspect_ratio: body.ratio || '1:1',
        num_outputs: Math.min(Number(body.imageCount) || 1, 4),
        output_format: 'png',
      };

  if (body.referenceImage) {
    input.image = body.referenceImage;
    input.start_image = body.referenceImage;
  }
  if (body.negativePrompt) {
    input.negative_prompt = body.negativePrompt;
  }

  const response = await fetch(`https://api.replicate.com/v1/models/${body.model}/predictions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${body.apiKey}`,
      'Content-Type': 'application/json',
      Prefer: 'wait=60',
    },
    body: JSON.stringify({ input }),
  });

  await assertOk('Replicate', response);
  const prediction = await response.json();

  if (prediction.status === 'succeeded') {
    return {
      status: 'completed',
      assets: normalizeReplicateOutput(prediction.output, body.contentType),
    };
  }
  if (terminalReplicateStatuses.has(prediction.status)) {
    throw new Error(prediction.error || 'Replicate generation failed');
  }

  return {
    status: 'processing',
    job: {
      provider: 'replicate',
      id: prediction.id,
      getUrl: prediction.urls?.get,
      contentType: body.contentType,
    },
  };
}

async function generateGeminiImage(body) {
  const prompt = enhancePrompt(body);
  const count = Math.min(Number(body.imageCount) || 1, 4);
  const assets = [];

  for (let index = 0; index < count; index += 1) {
    const parts = [{ text: prompt }];

    if (body.referenceImage && index === 0) {
      const { mime, data } = parseDataUrl(body.referenceImage);
      parts.unshift({ inlineData: { mimeType: mime, data } });
    }

    const response = await fetch(`${GEMINI_BASE}/models/${body.model}:generateContent`, {
      method: 'POST',
      headers: geminiHeaders(body.apiKey),
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: {
            aspectRatio: body.ratio || '1:1',
          },
        },
      }),
    });

    await assertOk('Google Gemini', response);
    const result = await response.json();
    const imagePart = result.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data);

    if (!imagePart) {
      throw new Error(result.error?.message || 'Gemini returned no image data');
    }

    const mime = imagePart.inlineData.mimeType || 'image/png';
    assets.push({
      url: dataUrlFromBase64(imagePart.inlineData.data, mime),
      type: 'image',
      mime,
    });
  }

  return { status: 'completed', assets };
}

async function generateGeminiVideo(body) {
  const instance = { prompt: enhancePrompt(body) };

  if (body.referenceImage) {
    const { mime, data } = parseDataUrl(body.referenceImage);
    instance.image = { bytesBase64Encoded: data, mimeType: mime };
  }

  const response = await fetch(`${GEMINI_BASE}/models/${body.model}:predictLongRunning`, {
    method: 'POST',
    headers: geminiHeaders(body.apiKey),
    body: JSON.stringify({
      instances: [instance],
      parameters: {
        aspectRatio: body.ratio || '16:9',
        durationSeconds: Number(body.duration) || 8,
      },
    }),
  });

  await assertOk('Google Gemini', response);
  const operation = await response.json();

  if (!operation.name) {
    throw new Error('Gemini did not return a video operation');
  }

  return {
    status: 'processing',
    job: {
      provider: 'gemini',
      operationName: operation.name,
      model: body.model,
      contentType: 'video',
    },
  };
}

async function pollGemini(body) {
  const operationUrl = body.job.operationName.startsWith('http')
    ? body.job.operationName
    : `${GEMINI_BASE}/${body.job.operationName}`;

  const response = await fetch(operationUrl, {
    headers: { 'x-goog-api-key': body.apiKey },
  });

  await assertOk('Google Gemini', response);
  const operation = await response.json();

  if (!operation.done) {
    return { status: 'processing', job: body.job };
  }

  const videoUri = operation.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
  if (!videoUri) {
    const reason = operation.response?.generateVideoResponse?.raiMediaFilteredReasons?.[0];
    throw new Error(reason || operation.error?.message || 'Gemini video generation failed');
  }

  const videoResponse = await fetch(videoUri, {
    headers: { 'x-goog-api-key': body.apiKey },
  });

  await assertOk('Google Gemini', videoResponse);
  const mime = videoResponse.headers.get('content-type') || 'video/mp4';
  const buffer = await videoResponse.arrayBuffer();

  return {
    status: 'completed',
    assets: [{
      url: arrayBufferToDataUrl(buffer, mime),
      type: 'video',
      mime,
    }],
  };
}

async function generateFal(body) {
  const input = {
    prompt: enhancePrompt(body),
  };

  if (body.contentType === 'video') {
    input.duration = String(body.duration || 5);
    input.aspect_ratio = body.ratio || '16:9';
  } else {
    input.image_size = FAL_IMAGE_SIZE[body.ratio] || 'landscape_16_9';
    input.num_images = Math.min(Number(body.imageCount) || 1, 4);
    input.output_format = 'png';
  }

  if (body.negativePrompt) {
    input.negative_prompt = body.negativePrompt;
  }
  if (body.referenceImage) {
    input.image_url = body.referenceImage;
  }

  const response = await fetch(`https://fal.run/${body.model}`, {
    method: 'POST',
    headers: {
      Authorization: `Key ${body.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  await assertOk('fal.ai', response);
  const result = await response.json();

  if (body.contentType === 'video') {
    const videoUrl = result.video?.url || result.data?.video?.url;
    if (!videoUrl) {
      throw new Error('fal.ai returned no video URL');
    }

    return {
      status: 'completed',
      assets: [{ url: videoUrl, type: 'video', mime: 'video/mp4' }],
    };
  }

  const images = result.images || result.data?.images || [];
  if (!images.length) {
    throw new Error('fal.ai returned no images');
  }

  return {
    status: 'completed',
    assets: images.map((image) => ({
      url: image.url,
      type: 'image',
      mime: 'image/png',
    })),
  };
}

async function pollReplicate(body) {
  const response = await fetch(body.job.getUrl || `https://api.replicate.com/v1/predictions/${body.job.id}`, {
    headers: { Authorization: `Bearer ${body.apiKey}` },
  });

  await assertOk('Replicate', response);
  const prediction = await response.json();

  if (prediction.status === 'succeeded') {
    return {
      status: 'completed',
      assets: normalizeReplicateOutput(prediction.output, body.job.contentType),
    };
  }
  if (terminalReplicateStatuses.has(prediction.status)) {
    throw new Error(prediction.error || 'Replicate generation failed');
  }

  return { status: 'processing', job: { ...body.job, getUrl: prediction.urls?.get || body.job.getUrl } };
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = parseBody(req);

    if (!body.apiKey) {
      return sendJson(res, 400, { error: 'API key is required' });
    }

    if (body.action === 'poll') {
      if (body.job?.provider === 'openai') return sendJson(res, 200, await pollOpenAI(body));
      if (body.job?.provider === 'runway') return sendJson(res, 200, await pollRunway(body));
      if (body.job?.provider === 'replicate') return sendJson(res, 200, await pollReplicate(body));
      if (body.job?.provider === 'gemini') return sendJson(res, 200, await pollGemini(body));
      return sendJson(res, 400, { error: 'Unknown job provider' });
    }

    if (!body.prompt || !body.model || !body.provider) {
      return sendJson(res, 400, { error: 'Prompt, model, and provider are required' });
    }

    if (body.provider === 'openai') return sendJson(res, 200, await generateOpenAI(body));
    if (body.provider === 'stability') return sendJson(res, 200, await generateStability(body));
    if (body.provider === 'runway') return sendJson(res, 200, await generateRunway(body));
    if (body.provider === 'replicate') return sendJson(res, 200, await generateReplicate(body));
    if (body.provider === 'gemini') {
      return sendJson(res, 200, body.contentType === 'video'
        ? await generateGeminiVideo(body)
        : await generateGeminiImage(body));
    }
    if (body.provider === 'fal') return sendJson(res, 200, await generateFal(body));

    return sendJson(res, 400, { error: 'Unsupported provider' });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Generation failed' });
  }
}
