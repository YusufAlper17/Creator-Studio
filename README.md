# Creator Studio

**Creator Studio**, kendi API anahtarlarınızla profesyonel görsel ve video üretebileceğiniz çok sağlayıcılı bir yapay zeka stüdyosudur. Tek bir arayüzden OpenAI, Google Gemini, Stability AI, Runway, fal.ai ve Replicate modellerine prompt yazarak erişirsiniz.

🌐 **Canlı demo:** [mezo-dusky.vercel.app](https://mezo-dusky.vercel.app)  
📦 **Repo:** [github.com/YusufAlper17/Creator-Studio](https://github.com/YusufAlper17/Creator-Studio)

---

## Özellikler

- **Çok sağlayıcı desteği** — 6 farklı AI platformu, 25+ görsel/video modeli
- **Bring Your Own Key (BYOK)** — API anahtarlarınız yalnızca tarayıcınızda saklanır
- **Görsel üretimi** — GPT Image, DALL-E, Gemini Image, FLUX, SDXL, Stability Ultra/Core
- **Video üretimi** — Sora, Veo, Runway Gen-4, Kling, Minimax, Seedance
- **Gelişmiş kontroller** — stil, en-boy oranı, negatif prompt, görsel sayısı, video süresi
- **Referans görsel** — image-to-video ve düzenleme akışları için yükleme desteği
- **Kütüphane** — üretilen içerikleri oturum içinde görüntüleme ve yeniden düzenleme
- **İndirme & paylaşım** — üretilen görselleri/videoları doğrudan indirme
- **Çok dilli arayüz** — Türkçe ve İngilizce
- **Karanlık / aydınlık tema**

---

## Desteklenen Sağlayıcılar

| Sağlayıcı | API Key Alma | Kullanım |
|-----------|--------------|----------|
| **OpenAI** | [platform.openai.com](https://platform.openai.com/api-keys) | `sk-...` |
| **Google Gemini** | [aistudio.google.com](https://aistudio.google.com/apikey) | `AIza...` |
| **Stability AI** | [platform.stability.ai](https://platform.stability.ai/account/keys) | `sk-...` |
| **Runway** | [dev.runwayml.com](https://dev.runwayml.com/) | `key_...` |
| **fal.ai** | [fal.ai/dashboard](https://fal.ai/dashboard) | `fal_...` |
| **Replicate** | [replicate.com/account](https://replicate.com/account/api-tokens) | `r8_...` |

> Anahtarlarınız sunucuya kalıcı olarak yazılmaz. Üretim sırasında yalnızca Vercel serverless fonksiyonuna iletilir ve işlem biter bitmez bellekten düşer.

---

## Desteklenen Modeller

### Görsel Modelleri

| Model | Sağlayıcı |
|-------|-----------|
| GPT Image 1.5 | OpenAI |
| DALL-E 3 | OpenAI |
| Gemini 2.5 Flash Image | Google Gemini |
| Gemini 3.1 Flash Image | Google Gemini |
| Gemini 3 Pro Image | Google Gemini |
| Stable Image Ultra | Stability AI |
| Stable Image Core | Stability AI |
| FLUX 2 | fal.ai |
| FLUX 2 Pro | fal.ai |
| FLUX Dev | fal.ai |
| FLUX Schnell | Replicate |
| FLUX 1.1 Pro | Replicate |
| Stable Diffusion XL | Replicate |

### Video Modelleri

| Model | Sağlayıcı |
|-------|-----------|
| Sora 2 | OpenAI |
| Sora 2 Pro | OpenAI |
| Veo 3.1 | Google Gemini |
| Veo 3.1 Fast | Google Gemini |
| Veo 3.0 | Google Gemini |
| Runway Gen-4.5 | Runway |
| Runway Gen-4 Turbo | Runway |
| Kling 1.6 | fal.ai |
| Minimax Video | fal.ai |
| Kling Video | Replicate |
| Minimax Video | Replicate |
| Seedance 1 Lite | Replicate |

---

## Mimari

```
┌─────────────────────────────────────────────────────────┐
│                    Creator Studio (React)                │
│  ┌──────────┐  ┌────────────┐  ┌─────────────────────┐ │
│  │ Prompt   │  │ API Keys   │  │ Model / Style /     │ │
│  │ Input    │  │ (localStorage) │ Ratio Controls    │ │
│  └────┬─────┘  └─────┬──────┘  └──────────┬──────────┘ │
│       │              │                     │            │
│       └──────────────┴─────────────────────┘            │
│                          │ POST /api/generate           │
└──────────────────────────┼──────────────────────────────┘
                           ▼
              ┌────────────────────────┐
              │  Vercel Serverless     │
              │  api/generate.js       │
              │  (Provider Adapters)   │
              └───────────┬────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
    OpenAI API      Gemini API         fal.ai API
    Stability API   Runway API      Replicate API
```

### Üretim Akışı

1. Kullanıcı prompt ve ayarları seçer
2. İlgili sağlayıcının API key'i istekle birlikte `/api/generate` endpoint'ine gönderilir
3. Serverless fonksiyon prompt'u stil/negatif prompt ile zenginleştirir
4. Sağlayıcıya özel adaptör çağrısı yapılır
5. Video modelleri için asenkron polling (OpenAI Sora, Gemini Veo, Runway, Replicate)
6. Sonuç base64 data URL veya doğrudan URL olarak frontend'e döner
7. Kullanıcı önizler, indirir veya kütüphaneye kaydeder

---

## Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- En az bir AI sağlayıcısından API anahtarı

### Yerel Geliştirme

```bash
# Repoyu klonla
git clone https://github.com/YusufAlper17/Creator-Studio.git
cd Creator-Studio

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır. Yerel geliştirmede `/api/generate` endpoint'i Vite middleware üzerinden çalışır.

### Production Build

```bash
npm run build
npm run preview
```

---

## Kullanım

1. Sağ üstteki **anahtar ikonuna** tıklayın
2. Kullanmak istediğiniz sağlayıcıların API key'lerini girin ve kaydedin
3. Ana sayfada **içerik tipini** seçin (Resim / Video)
4. **Model**, **stil**, **oran** ve diğer ayarları yapılandırın
5. Prompt yazın ve **üret** butonuna basın
6. Sonucu önizleyin, indirin veya kütüphaneye kaydedin

### İpuçları

- **Negatif prompt** alanına istemediğiniz detayları yazın (ör. `bozuk anatomi, düşük kalite`)
- **Runway Gen-4 Turbo** için referans görsel yüklemeniz gerekir
- **Veo** ve **Sora** videoları birkaç dakika sürebilir; uygulama otomatik olarak durumu kontrol eder
- Model listesi uzunsa dropdown içinde kaydırma yapabilirsiniz

---

## Vercel'e Deploy

### CLI ile

```bash
npm install -g vercel
vercel --prod
```

### GitHub Entegrasyonu

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. **Add New Project** → GitHub repo'nuzu seçin (`Creator-Studio`)
3. Framework: **Vite** (otomatik algılanır)
4. Deploy

`vercel.json` dosyası SPA routing ve güvenlik header'larını içerir. Serverless fonksiyon `api/generate.js` otomatik olarak deploy edilir.

---

## Proje Yapısı

```
Creator-Studio/
├── api/
│   └── generate.js          # Serverless API — tüm sağlayıcı adaptörleri
├── src/
│   ├── App.jsx              # Ana uygulama (UI, state, üretim akışı)
│   ├── main.jsx             # React entry point
│   ├── index.css            # Tailwind CSS
│   └── firebase.js          # Firebase yapılandırması (opsiyonel)
├── index.html
├── vite.config.js           # Vite + yerel API middleware
├── vercel.json              # Vercel deploy ayarları
├── tailwind.config.js
├── package.json
└── README.md
```

---

## API Endpoint

### `POST /api/generate`

**Üretim başlatma:**

```json
{
  "action": "generate",
  "apiKey": "sk-...",
  "provider": "openai",
  "model": "gpt-image-1.5",
  "contentType": "image",
  "prompt": "A cinematic portrait of a lion at golden hour",
  "style": "cinematic",
  "ratio": "16:9",
  "imageCount": 1,
  "negativePrompt": "blurry, low quality"
}
```

**Video polling:**

```json
{
  "action": "poll",
  "apiKey": "sk-...",
  "job": {
    "provider": "gemini",
    "operationName": "models/veo-3.1-generate-preview/operations/abc123",
    "contentType": "video"
  }
}
```

**Başarılı yanıt:**

```json
{
  "status": "completed",
  "assets": [
    {
      "url": "data:image/png;base64,...",
      "type": "image",
      "mime": "image/png"
    }
  ]
}
```

---

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| Animasyon | Framer Motion |
| İkonlar | Lucide React |
| Backend | Vercel Serverless Functions |
| Deploy | Vercel |
| Stil | PostCSS, Autoprefixer |

---

## Güvenlik

- API anahtarları **yalnızca tarayıcı localStorage**'ında tutulur
- Sunucu tarafında anahtar kalıcı depolanmaz
- `.env` dosyaları `.gitignore` ile hariç tutulur
- Vercel response header'ları: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`
- Üretim maliyetleri doğrudan kendi sağlayıcı hesabınıza yansır

---

## Geliştirme Notları

- Yeni model eklemek için `src/App.jsx` içindeki `IMAGE_MODELS` / `VIDEO_MODELS` dizilerine giriş ekleyin
- Yeni sağlayıcı için `api/generate.js` içine adaptör fonksiyonu yazın ve handler'a route ekleyin
- Firebase entegrasyonu hazır ancak opsiyoneldir — `FIREBASE_SETUP.md` dosyasına bakın

---

## Lisans

Bu proje özel (private) kullanım içindir.

---

## Katkı

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için önce bir issue açarak neyi değiştirmek istediğinizi tartışın.
