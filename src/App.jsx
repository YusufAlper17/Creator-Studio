import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  User, 
  X, 
  Heart, 
  Share2, 
  Download,
  Settings2,
  Paperclip,
  Check,
  LayoutTemplate,
  Palette,
  ArrowRight,
  Sun,
  Moon,
  Globe,
  Image as ImageIcon,
  Video,
  Filter,
  Grid3x3,
  Library,
  Trash2,
  Copy,
  ExternalLink,
  CreditCard,
  Zap,
  BarChart3,
  History,
  BookOpen,
  HelpCircle,
  Edit,
  Pencil,
  Mail,
  MessageCircle,
  Clock,
  KeyRound,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const APP_NAME = 'Creator Studio';

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  tr: {
    nav_gallery: 'Galeri',
    nav_pricing: 'Fiyatlandırma',
    nav_login: 'Giriş Yap',
    hero_title: 'Yaratıcılığın Yeni Standardı.',
    hero_subtitle: 'Profesyoneller için tasarlanmış yapay zeka araçları.',
    placeholder: 'Ne oluşturmak istiyorsunuz?',
    community_footer: 'Topluluk Çalışmaları',
    community_showcase: 'Topluluk Vitrini',
    discover: 'Keşfet',
    processing: 'Pikseller işleniyor...',
    welcome: 'Hoşgeldiniz',
    login_sub: 'Devam etmek için hesabınıza giriş yapın.',
    login_google: 'Google ile Giriş Yap',
    login_email: 'E-posta Kullan',
    terms: 'Giriş yaparak kullanım koşullarımızı kabul etmiş sayılırsınız.',
    model: 'Model',
    style: 'Stil',
    ratio: 'Oran',
    credits: 'Kredi',
    upload_tooltip: 'Referans Görsel Yükle',
    style_none: 'Stil Yok',
    style_cinematic: 'Sinematik',
    style_anime: 'Anime / Manga',
    style_photo: 'Fotoğrafik',
    style_3d: '3D Model',
    style_digital: 'Dijital Sanat',
    ratio_wide: '16:9 Geniş',
    ratio_square: '1:1 Kare',
    ratio_portrait: '9:16 Dikey',
    ratio_classic: '4:3 Klasik',
    output_preview: 'Çıktı Önizleme',
    edit: 'Düzenle',
    content_type: 'İçerik Tipi',
    image: 'Resim',
    video: 'Video',
    image_count: 'Resim Sayısı',
    count_1: '1 Resim',
    count_2: '2 Resim',
    count_4: '4 Resim',
    count_8: '8 Resim',
    my_library: 'Kütüphanem',
    filter_all: 'Tümü',
    filter_image: 'Resimler',
    filter_video: 'Videolar',
    filter_by_style: 'Stile Göre',
    filter_by_size: 'Boyuta Göre',
    community_description: 'Topluluk tarafından oluşturulan eserler',
    edit_image: 'Resmi Düzenle',
    delete_image: 'Resmi Sil',
    image_details: 'Görsel Detayları',
    prompt_used: 'Kullanılan Prompt',
    model_used: 'Kullanılan Model',
    style_used: 'Kullanılan Stil',
    ratio_used: 'Kullanılan Oran',
    type_used: 'İçerik Tipi',
    copy_prompt: 'Prompt\'u Kopyala',
    copy_link: 'Linki Kopyala',
    share_image: 'Görseli Paylaş',
    credits_required: 'Gerekli Kredi',
    credits_insufficient: 'Yetersiz Kredi',
    credits_message: 'Bu işlem için yeterli krediniz yok.',
    upgrade_plan: 'Planı Yükselt',
    view_plans: 'Planları Görüntüle',
    credits_remaining: 'Kalan Kredi',
    dashboard: 'Dashboard',
    history: 'Geçmiş',
    settings: 'Ayarlar',
    help: 'Yardım',
    pricing: 'Fiyatlandırma',
    nav_home: 'Ana Sayfa',
    sign_up: 'Kayıt Ol',
    sign_in_short: 'Giriş',
    author: 'Yazar',
    download: 'İndir',
    close: 'Kapat',
    create_account: 'Hesap Oluştur',
    create_account_sub: 'Yeni hesap oluşturmak için devam edin.',
    sign_up_google: 'Google ile Kayıt Ol',
    sign_up_email: 'E-posta ile Kayıt Ol',
    no_account: 'Hesabınız yok mu? Kayıt olun',
    has_account: 'Zaten hesabınız var mı? Giriş yapın',
    current_plan: 'Mevcut Plan',
    upgrade_to_basic: 'Basic\'e Yükselt',
    upgrade_to_pro: 'Pro\'ya Yükselt',
    upgrade_to_unlimited: 'Unlimited\'e Yükselt',
    most_popular: 'EN POPÜLER',
    credits_daily: 'kredi günlük',
    credits_monthly: 'kredi aylık',
    credits_unlimited: 'Sınırsız kredi',
    upgrade_message: 'Devam etmek için bir plan seçin ve sınırsız yaratıcılığın keyfini çıkarın.',
    upgrade_plan_message: 'Devam etmek için planınızı yükseltin',
    faq_title: 'Sıkça Sorulan Sorular',
    contact_title: 'İletişim',
    live_support: 'Canlı Destek',
    support_24_7: '7/24 destek hattı',
    email: 'E-posta',
    total_generations: 'Toplam Üretim',
    settings_coming_soon: 'Ayarlar sayfası yakında...',
    filters: 'Filtreler',
    logout: 'Çıkış Yap',
    plan_select: 'Planınızı Seçin',
    plan_select_sub: 'Sınırsız yaratıcılık için esnek fiyatlandırma planlarımız. Sadece kullandığınız kadar ödeyin.',
    plan_features_free: ['10 kredi günlük', 'Temel görsel üretimi', 'Standart kalite', 'Topluluk desteği', 'Filigranlı çıktılar'],
    plan_features_basic: ['500 kredi aylık', 'Tüm görsel modelleri', 'HD kalite çıktılar', 'Öncelikli destek', 'Filigransız', 'Ticari lisans'],
    plan_features_pro: ['2000 kredi aylık', 'Tüm görsel & video modelleri', '4K kalite çıktılar', 'Öncelikli destek', 'Filigransız', 'Ticari lisans', 'API erişimi', 'Özel modeller (yakında)'],
    plan_features_unlimited: ['Sınırsız kredi', 'Tüm modeller & özellikler', 'Ultra HD 8K çıktılar', 'Özel destek', 'Filigransız', 'Genişletilmiş ticari lisans', 'API erişimi', 'Özel modeller', 'Yeni özelliklere erken erişim'],
    faq_what_is_mezo: 'Creator Studio nedir ve nasıl çalışır?',
    faq_what_is_mezo_a: 'Creator Studio, kendi API anahtarlarınızla profesyonel görsel ve video üretmenizi sağlayan çok sağlayıcılı bir yapay zeka stüdyosudur.',
    faq_credits: 'Kredi sistemi nasıl çalışır?',
    faq_credits_a: 'Her içerik üretimi belirli miktarda kredi kullanır. Resimler 10 kredi, videolar 50 kredi başlangıç değeridir. Model ve resim sayısına göre kredi miktarı değişir.',
    faq_models: 'Hangi modelleri kullanabilirim?',
    faq_models_a: 'OpenAI, Google Gemini, Stability AI, Runway, fal.ai ve Replicate üzerinden popüler görsel/video modellerini kullanabilirsiniz. Her model kendi API anahtarınızla çalışır.',
    faq_commercial: 'Üretilen içerikleri ticari amaçla kullanabilir miyim?',
    faq_commercial_a: 'Pro ve Unlimited planlarında ticari lisans dahildir. Free ve Basic planlarda ticari kullanım için ek lisans gerekebilir.',
    faq_more_credits: 'Nasıl daha fazla kredi alabilirim?',
    faq_more_credits_a: 'Fiyatlandırma sayfasından uygun planı seçerek daha fazla kredi alabilirsiniz. Aylık planlar otomatik yenilenir.',
    contact_description: 'Sorularınız için bizimle iletişime geçebilirsiniz:',
    support_email: 'support@creator.studio',
    help_subtitle: 'Sıkça sorulan sorular ve yardım kaynakları',
    avg_response_time: 'Ortalama Yanıt Süresi',
    response_email: '24 saat içinde',
    response_live: 'Anında',
    live_support_instant: 'Canlı destek: Anında',
    api_keys: 'API Anahtarları',
    api_keys_subtitle: 'Anahtarlar sadece bu tarayıcıda saklanır ve üretim sırasında güvenli sunucu fonksiyonuna gönderilir.',
    save_keys: 'Anahtarları Kaydet',
    missing_api_key: 'Seçili model için API anahtarı gerekli.',
    generation_failed: 'Üretim başarısız oldu',
    negative_prompt: 'Negatif prompt',
    negative_prompt_placeholder: 'İstemediğiniz detaylar, bozuk anatomi, düşük kalite...',
    video_duration: 'Video Süresi',
    seconds_4: '4 sn',
    seconds_8: '8 sn',
    seconds_12: '12 sn',
    provider_ready: 'Sağlayıcı hazır',
    provider_missing: 'API anahtarı eksik',
    privacy_note: 'Anahtarlar backend veritabanına yazılmaz; localStorage üzerinde cihazınızda tutulur.'
  },
  en: {
    nav_gallery: 'Gallery',
    nav_pricing: 'Pricing',
    nav_login: 'Sign In',
    hero_title: 'The New Standard of Creativity.',
    hero_subtitle: 'AI tools designed for professionals.',
    placeholder: 'What do you want to create?',
    community_footer: 'Community Works',
    community_showcase: 'Community Showcase',
    discover: 'Discover',
    processing: 'Processing pixels...',
    welcome: 'Welcome',
    login_sub: 'Sign in to your account to continue.',
    login_google: 'Continue with Google',
    login_email: 'Use Email',
    terms: 'By signing in, you agree to our terms of service.',
    model: 'Model',
    style: 'Style',
    ratio: 'Ratio',
    credits: 'Credits',
    upload_tooltip: 'Upload Reference Image',
    style_none: 'No Style',
    style_cinematic: 'Cinematic',
    style_anime: 'Anime / Manga',
    style_photo: 'Photographic',
    style_3d: '3D Model',
    style_digital: 'Digital Art',
    ratio_wide: '16:9 Wide',
    ratio_square: '1:1 Square',
    ratio_portrait: '9:16 Portrait',
    ratio_classic: '4:3 Classic',
    output_preview: 'Output Preview',
    edit: 'Edit',
    content_type: 'Content Type',
    image: 'Image',
    video: 'Video',
    image_count: 'Image Count',
    count_1: '1 Image',
    count_2: '2 Images',
    count_4: '4 Images',
    count_8: '8 Images',
    my_library: 'My Library',
    filter_all: 'All',
    filter_image: 'Images',
    filter_video: 'Videos',
    filter_by_style: 'By Style',
    filter_by_size: 'By Size',
    community_description: 'Works created by the community',
    edit_image: 'Edit Image',
    delete_image: 'Delete Image',
    image_details: 'Image Details',
    prompt_used: 'Prompt Used',
    model_used: 'Model Used',
    style_used: 'Style Used',
    ratio_used: 'Ratio Used',
    type_used: 'Content Type',
    copy_prompt: 'Copy Prompt',
    copy_link: 'Copy Link',
    share_image: 'Share Image',
    credits_required: 'Credits Required',
    credits_insufficient: 'Insufficient Credits',
    credits_message: 'You don\'t have enough credits for this operation.',
    upgrade_plan: 'Upgrade Plan',
    view_plans: 'View Plans',
    credits_remaining: 'Credits Remaining',
    dashboard: 'Dashboard',
    history: 'History',
    settings: 'Settings',
    help: 'Help',
    pricing: 'Pricing',
    nav_home: 'Home',
    sign_up: 'Sign Up',
    sign_in_short: 'Sign In',
    author: 'Author',
    download: 'Download',
    close: 'Close',
    create_account: 'Create Account',
    create_account_sub: 'Continue to create a new account.',
    sign_up_google: 'Sign Up with Google',
    sign_up_email: 'Sign Up with Email',
    no_account: 'Don\'t have an account? Sign up',
    has_account: 'Already have an account? Sign in',
    current_plan: 'Current Plan',
    upgrade_to_basic: 'Upgrade to Basic',
    upgrade_to_pro: 'Upgrade to Pro',
    upgrade_to_unlimited: 'Upgrade to Unlimited',
    most_popular: 'MOST POPULAR',
    credits_daily: 'credits daily',
    credits_monthly: 'credits monthly',
    credits_unlimited: 'Unlimited credits',
    upgrade_message: 'Select a plan to continue and enjoy unlimited creativity.',
    upgrade_plan_message: 'Upgrade your plan to continue',
    faq_title: 'Frequently Asked Questions',
    contact_title: 'Contact',
    live_support: 'Live Support',
    support_24_7: '24/7 support line',
    email: 'Email',
    total_generations: 'Total Generations',
    settings_coming_soon: 'Settings page coming soon...',
    filters: 'Filters',
    logout: 'Logout',
    plan_select: 'Choose Your Plan',
    plan_select_sub: 'Flexible pricing plans for unlimited creativity. Pay only for what you use.',
    plan_features_free: ['10 credits daily', 'Basic image generation', 'Standard quality', 'Community support', 'Watermarked outputs'],
    plan_features_basic: ['500 credits monthly', 'All image models', 'HD quality outputs', 'Priority support', 'Watermark-free', 'Commercial license'],
    plan_features_pro: ['2000 credits monthly', 'All image & video models', '4K quality outputs', 'Priority support', 'Watermark-free', 'Commercial license', 'API access', 'Custom models (coming soon)'],
    plan_features_unlimited: ['Unlimited credits', 'All models & features', 'Ultra HD 8K outputs', 'Dedicated support', 'Watermark-free', 'Extended commercial license', 'API access', 'Custom models', 'Early access to new features'],
    faq_what_is_mezo: 'What is Creator Studio and how does it work?',
    faq_what_is_mezo_a: 'Creator Studio is a multi-provider AI studio that lets you generate professional images and videos with your own API keys.',
    faq_credits: 'How does the credit system work?',
    faq_credits_a: 'Each content generation uses a certain amount of credits. Images start at 10 credits, videos at 50 credits. Credit amount varies based on model and number of images.',
    faq_models: 'Which models can I use?',
    faq_models_a: 'You can use popular image and video models through OpenAI, Google Gemini, Stability AI, Runway, fal.ai, and Replicate. Each model runs with your own API key.',
    faq_commercial: 'Can I use generated content for commercial purposes?',
    faq_commercial_a: 'Commercial license is included in Pro and Unlimited plans. Additional license may be required for commercial use in Free and Basic plans.',
    faq_more_credits: 'How can I get more credits?',
    faq_more_credits_a: 'You can get more credits by selecting the appropriate plan from the pricing page. Monthly plans automatically renew.',
    contact_description: 'You can contact us for your questions:',
    support_email: 'support@creator.studio',
    help_subtitle: 'Frequently asked questions and help resources',
    avg_response_time: 'Average Response Time',
    response_email: 'Within 24 hours',
    response_live: 'Instant',
    live_support_instant: 'Live support: Instant',
    api_keys: 'API Keys',
    api_keys_subtitle: 'Keys are stored only in this browser and sent to the secure server function during generation.',
    save_keys: 'Save Keys',
    missing_api_key: 'An API key is required for the selected model.',
    generation_failed: 'Generation failed',
    negative_prompt: 'Negative prompt',
    negative_prompt_placeholder: 'Unwanted details, bad anatomy, low quality...',
    video_duration: 'Video Duration',
    seconds_4: '4 sec',
    seconds_8: '8 sec',
    seconds_12: '12 sec',
    provider_ready: 'Provider ready',
    provider_missing: 'API key missing',
    privacy_note: 'Keys are not written to a backend database; they stay on your device in localStorage.'
  }
};

// --- MOCK DATA ---
// Generate 50+ community images with variety
const generateCommunityImages = () => {
  const baseImages = [
    { url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop", prompt: "Cyberpunk neon city street, raining, reflections", type: "image", style: "cinematic", ratio: "16:9", author: "NeoArtist" },
    { url: "https://images.unsplash.com/photo-1633113090205-cc1ac795b5f9?q=80&w=1000&auto=format&fit=crop", prompt: "Abstract 3D fluid shapes, colorful gradient", type: "video", style: "digital-art", ratio: "16:9", author: "MotionMaster" },
    { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop", prompt: "Ethereal goddess in moonlight, fantasy art", type: "image", style: "anime", ratio: "9:16", author: "FantasyDev" },
    { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", prompt: "Minimalist oil painting of a lonely tree", type: "image", style: "photographic", ratio: "1:1", author: "CanvasKing" },
    { url: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=1000&auto=format&fit=crop", prompt: "Futuristic robot portrait, high detail", type: "image", style: "3d-model", ratio: "4:3", author: "AI_Gen" },
    { url: "https://images.unsplash.com/photo-1614730341194-75c60740a270?q=80&w=1000&auto=format&fit=crop", prompt: "Cosmic explosion, nebula, vibrant colors", type: "video", style: "digital-art", ratio: "16:9", author: "SpaceWalk" },
  ];

  const prompts = [
    "Majestic lion portrait in golden hour", "Cyberpunk game character design", "Cute anime cat in cherry blossom garden",
    "Realistic wolf in snowy forest", "Fantasy RPG warrior character", "Adorable panda eating bamboo",
    "Epic dragon battle scene", "Video game character concept art", "Majestic eagle in flight",
    "Anime style fox spirit", "Gaming mouse and keyboard setup", "Cute bunny in flower field",
    "Fierce tiger in jungle", "Retro game console collection", "Adorable penguin family",
    "Fantasy game boss character", "Realistic horse running", "Gaming setup with RGB lights",
    "Cute corgi playing", "Epic space battle game scene", "Majestic elephant in savanna",
    "Anime style magical girl", "Gaming headset close-up", "Cute sloth hanging on tree",
    "Fantasy game landscape", "Realistic deer in forest", "Retro arcade game cabinet",
    "Cute red panda", "Epic boss fight scene", "Majestic peacock displaying",
    "Anime style cat cafe", "Gaming chair design", "Cute hedgehog with flowers",
    "Fantasy game character portrait", "Realistic bear fishing", "Retro game pixel art",
    "Cute koala on eucalyptus", "Epic game cinematic scene", "Majestic cheetah running",
    "Anime style dog park", "Gaming keyboard macro keys", "Cute otter swimming",
    "Fantasy game weapon design", "Realistic owl in moonlight", "Retro game character sprite",
    "Cute hamster with sunflower seeds", "Epic game environment", "Majestic falcon hunting",
    "Anime style pet shop", "Gaming monitor setup", "Cute seal on ice",
    "Fantasy game spell effect", "Realistic fox in autumn", "Retro game level design"
  ];

  const authors = ["NeoArtist", "MotionMaster", "FantasyDev", "CanvasKing", "AI_Gen", "SpaceWalk", "PixelPro", "DesignWiz", "ArtVortex", "CreativeMind", "VisualGen", "DigitalDream", "ArtFlow", "CreativeLab", "DesignStudio"];
  const types = ["image", "video"];
  const styles = ["cinematic", "anime", "photographic", "3d-model", "digital-art", "none"];
  const ratios = ["16:9", "1:1", "9:16", "4:3"];
  const unsplashIds = [
    "1620641788421", "1633113090205", "1531746020798", "1618005182384", "1634152962476", "1614730341194",
    "1506905925346", "1519681393784", "1522071820886", "1517077305855", "1519681393784", "1506905925346",
    "1517077305855", "1522071820886", "1506905925346", "1519681393784", "1522071820886", "1517077305855",
    "1506905925346", "1519681393784", "1522071820886", "1517077305855", "1506905925346", "1519681393784",
    "1522071820886", "1517077305855", "1506905925346", "1519681393784", "1522071820886", "1517077305855",
    "1506905925346", "1519681393784", "1522071820886", "1517077305855", "1506905925346", "1519681393784",
    "1522071820886", "1517077305855", "1506905925346", "1519681393784", "1522071820886", "1517077305855",
    "1506905925346", "1519681393784", "1522071820886", "1517077305855", "1506905925346", "1519681393784"
  ];

  const images = [...baseImages];
  
  // Use Picsum Photos seeds for reliable images
  const picsumSeeds = [
    "nature", "architecture", "people", "tech", "abstract", "art", "design", "fashion",
    "food", "travel", "sports", "business", "animals", "landscape", "urban", "vintage",
    "modern", "minimal", "colorful", "monochrome", "portrait", "city", "nature2", "abstract2",
    "art2", "design2", "fashion2", "tech2", "urban2", "portrait2", "landscape2", "city2",
    "nature3", "abstract3", "art3", "design3", "fashion3", "tech3", "urban3", "portrait3",
    "landscape3", "city3", "nature4", "abstract4", "art4", "design4", "fashion4", "tech4",
    "urban4", "portrait4", "landscape4", "city4", "nature5", "abstract5", "art5", "design5"
  ];
  
  for (let i = 7; i <= 60; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const ratio = ratios[Math.floor(Math.random() * ratios.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    const seed = picsumSeeds[(i - 7) % picsumSeeds.length];
    
    // Calculate dimensions based on ratio
    const width = 800;
    const height = ratio === '1:1' ? 800 : ratio === '9:16' ? 450 : ratio === '4:3' ? 600 : 450;
    
    images.push({
      id: i,
      url: `https://picsum.photos/seed/${seed}${i}/${width}/${height}`,
      prompt: prompt,
      type: type,
      style: style,
      ratio: ratio,
      author: author
    });
  }
  
  return images;
};

const COMMUNITY_IMAGES = generateCommunityImages();

// Separate data for Community Works section (different from Discover)
const generateCommunityWorks = () => {
  const worksPrompts = [
    "Vintage film photography aesthetic", "Minimalist geometric design", "Abstract color explosion",
    "Portrait with vintage filter", "Urban architecture lines", "Nature macro photography",
    "Digital painting fantasy", "Retro poster design", "Abstract minimal art",
    "Street photography moment", "3D abstract sculpture", "Watercolor landscape",
    "Cyberpunk cityscape", "Vintage travel poster", "Abstract pattern design",
    "Portrait photography", "Minimalist logo design", "Abstract geometric shapes",
    "Nature photography", "Digital art illustration", "Vintage advertisement style",
    "Abstract color study", "Urban street art", "Minimalist product design",
    "Portrait with bokeh", "Abstract fluid dynamics", "Vintage magazine layout",
    "Nature documentary style", "Digital collage art", "Minimalist architecture"
  ];
  
  const worksAuthors = ["VintagePro", "MinimalDesign", "AbstractArt", "PhotoMaster", "DigitalWiz", "UrbanEye", "NatureShot", "RetroDesign", "ColorFlow", "StreetArt"];
  const types = ["image", "video"];
  const styles = ["cinematic", "anime", "photographic", "3d-model", "digital-art", "none"];
  const ratios = ["16:9", "1:1", "9:16", "4:3"];
  
  // Use Picsum Photos for reliable image URLs with different seeds
  const picsumSeeds = [
    "nature", "architecture", "people", "tech", "abstract", "art", "design", "fashion",
    "food", "travel", "sports", "business", "animals", "landscape", "urban", "vintage",
    "modern", "minimal", "colorful", "monochrome", "portrait", "landscape", "city", "nature2",
    "abstract2", "art2", "design2", "fashion2", "tech2", "urban2"
  ];
  
  return worksPrompts.map((prompt, idx) => {
    const seed = picsumSeeds[idx % picsumSeeds.length];
    const width = 800;
    const height = ratios[Math.floor(Math.random() * ratios.length)] === '1:1' ? 800 : 
                   ratios[Math.floor(Math.random() * ratios.length)] === '9:16' ? 450 : 
                   ratios[Math.floor(Math.random() * ratios.length)] === '4:3' ? 600 : 450;
    
    return {
      id: `works-${idx + 1}`,
      url: `https://picsum.photos/seed/${seed}/${width}/${height}`,
      prompt: prompt,
      type: types[Math.floor(Math.random() * types.length)],
      style: styles[Math.floor(Math.random() * styles.length)],
      ratio: ratios[Math.floor(Math.random() * ratios.length)],
      author: worksAuthors[Math.floor(Math.random() * worksAuthors.length)]
    };
  });
};

const COMMUNITY_WORKS_IMAGES = generateCommunityWorks();

const API_PROVIDERS = [
  { id: 'openai', label: 'OpenAI', placeholder: 'sk-...' },
  { id: 'gemini', label: 'Google Gemini', placeholder: 'AIza...' },
  { id: 'stability', label: 'Stability AI', placeholder: 'sk-...' },
  { id: 'runway', label: 'Runway', placeholder: 'key_...' },
  { id: 'fal', label: 'fal.ai', placeholder: 'fal_...' },
  { id: 'replicate', label: 'Replicate', placeholder: 'r8_...' },
];

// Image Models
const IMAGE_MODELS = [
  { id: 'openai-gpt-image', label: 'GPT Image 1.5', provider: 'OpenAI', providerKey: 'openai', apiModel: 'gpt-image-1.5' },
  { id: 'openai-dalle-3', label: 'DALL-E 3', provider: 'OpenAI', providerKey: 'openai', apiModel: 'dall-e-3' },
  { id: 'gemini-flash-image', label: 'Gemini 2.5 Flash Image', provider: 'Google Gemini', providerKey: 'gemini', apiModel: 'gemini-2.5-flash-image' },
  { id: 'gemini-nano-banana', label: 'Gemini 3.1 Flash Image', provider: 'Google Gemini', providerKey: 'gemini', apiModel: 'gemini-3.1-flash-image' },
  { id: 'gemini-nano-banana-pro', label: 'Gemini 3 Pro Image', provider: 'Google Gemini', providerKey: 'gemini', apiModel: 'gemini-3-pro-image-preview' },
  { id: 'stability-ultra', label: 'Stable Image Ultra', provider: 'Stability AI', providerKey: 'stability', apiModel: 'ultra' },
  { id: 'stability-core', label: 'Stable Image Core', provider: 'Stability AI', providerKey: 'stability', apiModel: 'core' },
  { id: 'fal-flux-2', label: 'FLUX 2', provider: 'fal.ai', providerKey: 'fal', apiModel: 'fal-ai/flux-2' },
  { id: 'fal-flux-2-pro', label: 'FLUX 2 Pro', provider: 'fal.ai', providerKey: 'fal', apiModel: 'fal-ai/flux-2-pro' },
  { id: 'fal-flux-dev', label: 'FLUX Dev', provider: 'fal.ai', providerKey: 'fal', apiModel: 'fal-ai/flux/dev' },
  { id: 'replicate-flux-schnell', label: 'FLUX Schnell', provider: 'Replicate', providerKey: 'replicate', apiModel: 'black-forest-labs/flux-schnell' },
  { id: 'replicate-flux-pro', label: 'FLUX 1.1 Pro', provider: 'Replicate', providerKey: 'replicate', apiModel: 'black-forest-labs/flux-1.1-pro' },
  { id: 'replicate-sdxl', label: 'Stable Diffusion XL', provider: 'Replicate', providerKey: 'replicate', apiModel: 'stability-ai/sdxl' },
];

// Video Models
const VIDEO_MODELS = [
  { id: 'openai-sora-2', label: 'Sora 2', provider: 'OpenAI', providerKey: 'openai', apiModel: 'sora-2' },
  { id: 'openai-sora-2-pro', label: 'Sora 2 Pro', provider: 'OpenAI', providerKey: 'openai', apiModel: 'sora-2-pro' },
  { id: 'gemini-veo-31', label: 'Veo 3.1', provider: 'Google Gemini', providerKey: 'gemini', apiModel: 'veo-3.1-generate-preview' },
  { id: 'gemini-veo-31-fast', label: 'Veo 3.1 Fast', provider: 'Google Gemini', providerKey: 'gemini', apiModel: 'veo-3.1-fast-generate-preview' },
  { id: 'gemini-veo-30', label: 'Veo 3.0', provider: 'Google Gemini', providerKey: 'gemini', apiModel: 'veo-3.0-generate-001' },
  { id: 'runway-gen45', label: 'Runway Gen-4.5', provider: 'Runway', providerKey: 'runway', apiModel: 'gen4.5' },
  { id: 'runway-gen4-turbo', label: 'Runway Gen-4 Turbo', provider: 'Runway', providerKey: 'runway', apiModel: 'gen4_turbo' },
  { id: 'fal-kling', label: 'Kling 1.6', provider: 'fal.ai', providerKey: 'fal', apiModel: 'fal-ai/kling-video/v1.6/standard/text-to-video' },
  { id: 'fal-minimax', label: 'Minimax Video', provider: 'fal.ai', providerKey: 'fal', apiModel: 'fal-ai/minimax/video-01-live' },
  { id: 'replicate-kling', label: 'Kling Video', provider: 'Replicate', providerKey: 'replicate', apiModel: 'kwaivgi/kling-v1.6-standard' },
  { id: 'replicate-minimax', label: 'Minimax Video', provider: 'Replicate', providerKey: 'replicate', apiModel: 'minimax/video-01' },
  { id: 'replicate-seedance', label: 'Seedance 1 Lite', provider: 'Replicate', providerKey: 'replicate', apiModel: 'bytedance/seedance-1-lite' },
];

const ALL_MODELS = [...IMAGE_MODELS, ...VIDEO_MODELS];
const getModelConfig = (modelId) => ALL_MODELS.find((model) => model.id === modelId);

// --- REUSABLE COMPONENTS ---

// Help Page Component
const HelpPage = ({ theme, t }) => {
  const [openFaq, setOpenFaq] = useState(null);
  
  const faqs = [
    {
      q: t.faq_what_is_mezo,
      a: t.faq_what_is_mezo_a
    },
    {
      q: t.faq_credits,
      a: t.faq_credits_a
    },
    {
      q: t.faq_models,
      a: t.faq_models_a
    },
    {
      q: t.faq_commercial,
      a: t.faq_commercial_a
    },
    {
      q: t.faq_more_credits,
      a: t.faq_more_credits_a
    }
  ];

  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50';

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - FAQ */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-3 ${textMain}`}>{t.help}</h1>
            <p className={`text-lg ${textSecondary}`}>
              {t.help_subtitle}
            </p>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-semibold mb-6 ${textMain}`}>{t.faq_title}</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`rounded-xl border overflow-hidden transition-all ${cardBg} ${openFaq === idx ? 'shadow-lg' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className={`w-full p-5 flex items-center justify-between text-left ${hoverBg} transition-colors`}
                  >
                    <h3 className={`text-lg font-semibold pr-4 ${textMain}`}>{faq.q}</h3>
                    <div className="flex-shrink-0">
                      {openFaq === idx ? (
                        <ChevronUp size={20} className={textSecondary} />
                      ) : (
                        <ChevronDown size={20} className={textSecondary} />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-5 pb-5 pt-0 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
                          <p className={`text-sm leading-relaxed pt-4 ${textSecondary}`}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Contact Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className={`p-6 rounded-xl border ${cardBg}`}>
              <h2 className={`text-xl font-semibold mb-6 ${textMain}`}>{t.contact_title}</h2>
              <p className={`text-sm mb-6 ${textSecondary}`}>
                {t.contact_description}
              </p>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                      <Mail size={18} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium mb-1 ${textMain}`}>{t.email}</p>
                      <a 
                        href={`mailto:${t.support_email}`} 
                        className={`text-sm ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors`}
                      >
                        {t.support_email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                      <MessageCircle size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium mb-1 ${textMain}`}>{t.live_support}</p>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className={textSecondary} />
                        <p className={`text-sm ${textSecondary}`}>{t.support_24_7}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200'}`}>
                  <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    {t.avg_response_time}
                  </p>
                  <p className={`text-sm ${textMain}`}>
                    {t.email}: {t.response_email}<br />
                    {t.live_support_instant}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Placeholder Component
const AnimatedPlaceholder = ({ theme, lang, hasGenerated }) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const examplePrompts = lang === 'tr' ? [
    'Futuristik bir şehir manzarası',
    'Sihirli bir orman atmosferi',
    'Minimalist bir ürün fotoğrafı',
    'Sinematik bir aksiyon sahnesi',
    'Portre fotoğrafçılığı stili',
    'Soyut dijital sanat eseri',
    'Fantastik bir karakter tasarımı',
    'Doğa manzarası fotoğrafı'
  ] : [
    'A futuristic cityscape',
    'A magical forest atmosphere',
    'A minimalist product photo',
    'A cinematic action scene',
    'Portrait photography style',
    'Abstract digital artwork',
    'A fantasy character design',
    'Nature landscape photography'
  ];

  useEffect(() => {
    if (hasGenerated) return; // Don't animate if user has generated
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % examplePrompts.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasGenerated, examplePrompts.length]);

  const currentPrompt = examplePrompts[currentPromptIndex];

  if (hasGenerated) {
    return (
      <span className={`inline-block ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
        {examplePrompts[0]}
      </span>
    );
  }

  return (
    <motion.span 
      key={currentPromptIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`inline-block ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}
    >
      {currentPrompt}
      <span className={`inline-block ml-1 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
        <span className="inline-block animate-pulse" style={{ animationDelay: '0s' }}>.</span>
        <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
        <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
      </span>
    </motion.span>
  );
};

// Minimal Dropdown Component
const Dropdown = ({ label, icon: Icon, value, options, onSelect, theme, wide = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.id === value)?.label || value;

  const buttonClass = theme === 'dark' 
    ? (isOpen ? 'bg-white text-black border-white' : 'bg-black/40 text-gray-300 border-white/10 hover:border-white/30 hover:text-white')
    : (isOpen ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-black');

  const menuClass = theme === 'dark'
    ? 'bg-[#1a1a1a] border-white/10 text-gray-300'
    : 'bg-white border-gray-200 text-gray-700 shadow-xl';

  const itemHoverClass = theme === 'dark'
    ? 'hover:bg-white/5 hover:text-white'
    : 'hover:bg-gray-50 hover:text-black';

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 max-w-full ${buttonClass}`}
        title={selectedLabel}
      >
        {Icon && <Icon size={14} className="flex-shrink-0" />}
        <span className={`truncate ${wide ? 'max-w-[11rem] sm:max-w-[14rem]' : 'max-w-[8rem]'}`}>{selectedLabel}</span>
        <ChevronDown size={12} className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={`absolute top-full left-0 mt-2 rounded-xl shadow-xl z-[120] border overflow-hidden ${wide ? 'w-72 sm:w-80' : 'w-48'} ${menuClass}`}
          >
            <div className="max-h-60 overflow-y-auto overscroll-contain py-1">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between gap-2 group ${itemHoverClass}`}
                >
                  <span className="flex-1 min-w-0 leading-snug">{option.label}</span>
                  {value === option.id && <Check size={12} className={`flex-shrink-0 ${theme === 'dark' ? "text-white" : "text-black"}`} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Image Detail Modal
const ImageDetailModal = ({ image, onClose, onEdit, theme, t, onCopyPrompt, onCopyLink, onDownload }) => {
  if (!image) return null;
  
  const modalBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const buttonBg = theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800';
  const buttonSecondary = theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'dark' ? 'bg-black/80' : 'bg-black/20'}`}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`border w-full max-w-4xl rounded-xl sm:rounded-2xl shadow-2xl relative ${modalBg}`}
      >
        <button onClick={onClose} className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}>
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Image/Video */}
          <div className="relative rounded-lg overflow-hidden border">
            {image.type === 'video' ? (
              <video 
                src={image.url} 
                controls
                className="w-full h-full object-cover"
              />
            ) : (
            <img 
              src={image.url} 
              alt={image.prompt} 
              className="w-full h-full object-cover"
            />
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${textMain}`}>{t.image_details}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.prompt_used}</p>
                <div className="flex items-start gap-2">
                  <p className={`text-sm flex-1 ${textMain}`}>{image.prompt}</p>
                  <button 
                    onClick={() => onCopyPrompt(image.prompt)}
                    className={`p-1.5 rounded-lg transition-colors ${buttonSecondary}`}
                    title={t.copy_prompt}
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.model_used}</p>
                  <p className={`text-sm ${textMain}`}>{image.model || APP_NAME}</p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.style_used}</p>
                  <p className={`text-sm ${textMain}`}>{image.style || t.style_none}</p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.ratio_used}</p>
                  <p className={`text-sm ${textMain}`}>{image.ratio || '16:9'}</p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.type_used}</p>
                  <p className={`text-sm ${textMain}`}>{image.type === 'video' ? t.video : t.image}</p>
                </div>
              </div>

              {image.author && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.author}</p>
                  <p className={`text-sm ${textMain}`}>{image.author}</p>
                </div>
              )}

              {image.creditsUsed && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${textSecondary}`}>{t.credits_required}</p>
                  <p className={`text-sm ${textMain}`}>{image.creditsUsed} {t.credits}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button 
                onClick={() => {
                  onEdit(image);
                  onClose();
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${buttonBg}`}
              >
                {t.edit_image}
              </button>
              <button 
                onClick={() => onCopyLink(image.url)}
                className={`p-2.5 rounded-lg transition-colors ${buttonSecondary}`}
                title={t.copy_link}
              >
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => onDownload(image.assets?.[0] || image.url, `${APP_NAME.toLowerCase().replace(/\s+/g, '-')}-${image.id}`)}
                className={`p-2.5 rounded-lg transition-colors ${buttonSecondary}`}
                title={t.download}
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pricing Page Component
const PricingPage = ({ theme, t, generationCount }) => {
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const buttonBg = theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800';
  const cardBg = theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const popularBg = theme === 'dark' ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300';
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      credits: '10/gün',
      features: t.plan_features_free,
      button: t.current_plan,
      popular: false
    },
    {
      name: 'Basic',
      price: '$9.99',
      period: '/ay',
      credits: '500',
      features: t.plan_features_basic,
      button: t.upgrade_to_basic,
      popular: false
    },
    {
      name: 'Pro',
      price: '$29.99',
      period: '/ay',
      credits: '2000',
      features: t.plan_features_pro,
      button: t.upgrade_to_pro,
      popular: true
    },
    {
      name: 'Unlimited',
      price: '$99.99',
      period: '/ay',
      credits: '∞',
      features: t.plan_features_unlimited,
      button: t.upgrade_to_unlimited,
      popular: false
    }
  ];
  
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textMain}`}>{t.plan_select}</h1>
        <p className={`text-lg max-w-2xl mx-auto ${textSecondary}`}>{t.plan_select_sub}</p>
        {generationCount >= 3 && (
          <div className={`mt-6 p-4 rounded-xl border max-w-2xl mx-auto ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
              {t.upgrade_message}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-6 rounded-xl border transition-all ${plan.popular ? popularBg : cardBg} ${plan.popular ? 'scale-105' : ''}`}
          >
            {plan.popular && (
              <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`}>
                {t.most_popular}
              </div>
            )}
            <h3 className={`text-xl font-bold mb-2 ${textMain}`}>{plan.name}</h3>
            <div className="mb-4">
              <span className={`text-3xl font-bold ${textMain}`}>{plan.price}</span>
              {plan.period && <span className={`text-sm ${textSecondary}`}>{plan.period}</span>}
            </div>
            <p className={`text-sm font-medium mb-4 ${textSecondary}`}>{plan.credits} {t.credits}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2">
                  <Check size={16} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className={`text-xs ${textSecondary}`}>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                plan.popular 
                  ? buttonBg
                  : theme === 'dark' 
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Pricing Modal (for backward compatibility)
const PricingModal = ({ onClose, theme, t, generationCount }) => {
  const modalBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const buttonBg = theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800';
  const cardBg = theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const popularBg = theme === 'dark' ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300';
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      credits: '10/gün',
      features: t.plan_features_free,
      button: t.current_plan,
      popular: false
    },
    {
      name: 'Basic',
      price: '$9.99',
      period: '/ay',
      credits: '500',
      features: t.plan_features_basic,
      button: t.upgrade_to_basic,
      popular: false
    },
    {
      name: 'Pro',
      price: '$29.99',
      period: '/ay',
      credits: '2000',
      features: t.plan_features_pro,
      button: t.upgrade_to_pro,
      popular: true
    },
    {
      name: 'Unlimited',
      price: '$99.99',
      period: '/ay',
      credits: '∞',
      features: t.plan_features_unlimited,
      button: t.upgrade_to_unlimited,
      popular: false
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto ${theme === 'dark' ? 'bg-black/80' : 'bg-black/20'}`}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`border w-full max-w-6xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl relative my-4 sm:my-8 ${modalBg}`}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${textMain}`}>{t.plan_select}</h2>
          <p className={`text-sm ${textSecondary}`}>{t.plan_select_sub}</p>
          {generationCount >= 3 && (
            <div className={`mt-4 p-4 rounded-xl border max-w-2xl mx-auto ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                {t.upgrade_message}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-xl border transition-all ${plan.popular ? popularBg : cardBg} ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`}>
                  {t.most_popular}
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${textMain}`}>{plan.name}</h3>
              <div className="mb-4">
                <span className={`text-3xl font-bold ${textMain}`}>{plan.price}</span>
                {plan.period && <span className={`text-sm ${textSecondary}`}>{plan.period}</span>}
              </div>
              <p className={`text-sm font-medium mb-4 ${textSecondary}`}>{plan.credits} {t.credits}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={`text-xs ${textSecondary}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                  plan.popular 
                    ? buttonBg
                    : theme === 'dark' 
                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Credits Modal
const CreditsModal = ({ onClose, onViewPlans, theme, t, requiredCredits, currentCredits }) => {
  const modalBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const buttonBg = theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'dark' ? 'bg-black/80' : 'bg-black/20'}`}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className={`border w-full max-w-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl relative ${modalBg}`}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}`}>
            <Zap size={32} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
          </div>
          <h2 className={`text-2xl font-semibold mb-2 ${textMain}`}>{t.credits_insufficient}</h2>
          <p className={`text-sm ${textSecondary} mb-3`}>{t.credits_message}</p>
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'}`}>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
              {t.upgrade_plan_message}
            </p>
          </div>
        </div>

        <div className={`rounded-lg p-4 mb-6 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${textSecondary}`}>{t.credits_remaining}</span>
            <span className={`text-lg font-bold ${textMain}`}>{currentCredits}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${textSecondary}`}>{t.credits_required}</span>
            <span className={`text-lg font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{requiredCredits}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => {
              onViewPlans();
              onClose();
            }}
            className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-colors ${buttonBg}`}
          >
            {t.view_plans}
          </button>
          <button 
            onClick={onClose}
            className={`w-full py-2.5 px-4 bg-transparent border text-sm font-medium rounded-lg transition-colors ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {t.close}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 1. Auth Modal (Clean & Professional)
const AuthModal = ({ onClose, onLogin, theme, t, mode, setMode }) => {
  const modalBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'dark' ? 'bg-black/80' : 'bg-black/20'}`}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className={`border w-full max-w-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl relative ${modalBg}`}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-gradient-to-br from-white to-zinc-200' : 'bg-gradient-to-br from-black to-zinc-800'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={theme === 'dark' ? 'text-black' : 'text-white'}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
            </svg>
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${textMain}`}>
            {mode === 'signin' ? t.welcome : t.create_account}
          </h2>
          <p className={`text-sm ${textSecondary}`}>
            {mode === 'signin' ? t.login_sub : t.create_account_sub}
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onLogin}
            className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-3 ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
            {mode === 'signin' ? t.login_google : t.sign_up_google}
          </button>
          <button 
            onClick={onLogin}
            className={`w-full py-2.5 px-4 bg-transparent border text-sm font-medium rounded-lg transition-colors ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {mode === 'signin' ? t.login_email : t.sign_up_email}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className={`text-sm ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
          >
            {mode === 'signin' ? t.no_account : t.has_account}
          </button>
        </div>
        
        <p className={`text-center text-[10px] mt-6 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
          {t.terms}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Profile Dropdown Component (not modal)
const ProfileDropdown = ({ theme, t, credits, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const dropdownBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      ref={dropdownRef}
      className={`absolute top-full right-0 mt-2 w-64 rounded-xl shadow-2xl border z-50 ${dropdownBg}`}
    >
      <div className="p-4">
        <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
            <Zap size={20} className={credits < 20 ? 'text-red-500' : 'text-emerald-500'} />
              <div>
              <p className={`text-xs font-medium ${textSecondary}`}>{t.credits_remaining}</p>
              <p className={`text-xl font-bold ${textMain}`}>{credits}</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <button className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-colors text-left ${hoverBg} ${textMain}`}>
            Ayarlar
          </button>
          <button className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-colors text-left ${hoverBg} ${textMain}`}>
            {t.logout}
          </button>
        </div>
        </div>
    </motion.div>
  );
};

const ApiSettingsModal = ({ apiKeys, setApiKeys, onClose, theme, t }) => {
  const modalBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const inputBg = theme === 'dark' ? 'bg-black/50 border-white/10 text-white placeholder-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400';
  const buttonBg = theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'dark' ? 'bg-black/80' : 'bg-black/20'}`}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`border w-full max-w-2xl p-5 sm:p-6 rounded-2xl shadow-2xl relative ${modalBg}`}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          <X size={20} />
        </button>

        <div className="mb-6 pr-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <KeyRound size={18} />
            </div>
            <div>
              <h2 className={`text-2xl font-semibold ${textMain}`}>{t.api_keys}</h2>
              <p className={`text-sm ${textSecondary}`}>{t.api_keys_subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {API_PROVIDERS.map((provider) => (
            <label key={provider.id} className="block">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${textMain}`}>{provider.label}</span>
                <span className={`text-[11px] flex items-center gap-1 ${apiKeys[provider.id] ? 'text-emerald-500' : textSecondary}`}>
                  {apiKeys[provider.id] ? <ShieldCheck size={13} /> : <AlertCircle size={13} />}
                  {apiKeys[provider.id] ? t.provider_ready : t.provider_missing}
                </span>
              </div>
              <input
                type="password"
                value={apiKeys[provider.id] || ''}
                onChange={(e) => setApiKeys((prev) => ({ ...prev, [provider.id]: e.target.value.trim() }))}
                placeholder={provider.placeholder}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${inputBg}`}
                autoComplete="off"
              />
            </label>
          ))}
        </div>

        <div className={`mt-5 rounded-xl border p-3 text-xs leading-relaxed ${theme === 'dark' ? 'border-white/10 bg-white/5 text-zinc-400' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
          {t.privacy_note}
        </div>

        <button onClick={onClose} className={`mt-5 w-full py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${buttonBg}`}>
          {t.save_keys}
        </button>
      </motion.div>
    </motion.div>
  );
};

// 2. Main Application Component
export default function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewState, setViewState] = useState('landing'); // 'landing' | 'results'
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [lang, setLang] = useState('tr'); // 'tr' | 'en'
  
  // Settings State
  const [selectedModel, setSelectedModel] = useState('openai-gpt-image');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [selectedStyle, setSelectedStyle] = useState('none');
  const [contentType, setContentType] = useState('image');
  const [imageCount, setImageCount] = useState('1');
  const [videoDuration, setVideoDuration] = useState('4');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('creator-studio-api-keys')) || {};
    } catch {
      return {};
    }
  });
  const [showApiSettings, setShowApiSettings] = useState(false);
  
  // Filter State for Discover
  const [filterType, setFilterType] = useState('all');
  const [filterStyle, setFilterStyle] = useState('all');
  const [filterRatio, setFilterRatio] = useState('all');
  
  // Filter State for Community Works
  const [communityFilterType, setCommunityFilterType] = useState('all');
  const [communityFilterStyle, setCommunityFilterStyle] = useState('all');
  const [communityFilterRatio, setCommunityFilterRatio] = useState('all');
  
  // Library State
  const [myLibrary, setMyLibrary] = useState([]);
  
  // Credits State
  const [userCredits, setUserCredits] = useState(100);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  
  // Image Detail Modal State
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageDetail, setShowImageDetail] = useState(false);
  
  // Auth Modal State
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  
  // Current Page State (for dashboard pages)
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'dashboard' | 'history' | 'settings' | 'help' | 'pricing'
  
  // Profile Dropdown State
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [generationError, setGenerationError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('creator-studio-api-keys', JSON.stringify(apiKeys));
  }, [apiKeys]);
  
  // Credit calculation function
  const calculateCredits = (contentType, model, imageCount = 1) => {
    let baseCredits = contentType === 'video' ? 50 : 10;
    
    // Model-based credit multipliers
    let modelMultiplier = 1;
    if (contentType === 'image') {
      if (model === 'openai-dalle-3') modelMultiplier = 1.4;
      else if (model === 'openai-gpt-image') modelMultiplier = 1.5;
      else if (model === 'stability-ultra') modelMultiplier = 1.3;
      else if (model === 'stability-core') modelMultiplier = 0.8;
      else if (model === 'replicate-flux-schnell') modelMultiplier = 0.7;
      else if (model === 'replicate-flux-pro') modelMultiplier = 1.1;
      else if (model.startsWith('gemini-')) modelMultiplier = 1.1;
      else if (model.startsWith('fal-')) modelMultiplier = 0.9;
    } else if (contentType === 'video') {
      if (model === 'openai-sora-2-pro') modelMultiplier = 2.4;
      else if (model === 'openai-sora-2') modelMultiplier = 2;
      else if (model === 'runway-gen45') modelMultiplier = 2.2;
      else if (model === 'runway-gen4-turbo') modelMultiplier = 1.7;
      else if (model.startsWith('gemini-veo')) modelMultiplier = 2.1;
      else if (model.startsWith('fal-')) modelMultiplier = 1.9;
      else if (model.startsWith('replicate-')) modelMultiplier = 1.8;
    }
    
    const countMultiplier = parseInt(imageCount) || 1;
    return Math.ceil(baseCredits * modelMultiplier * countMultiplier);
  };

  const t = TRANSLATIONS[lang];

  // Derived Options with Translations
  const STYLES = [
    { id: 'none', label: t.style_none },
    { id: 'cinematic', label: t.style_cinematic },
    { id: 'anime', label: t.style_anime },
    { id: 'photographic', label: t.style_photo },
    { id: '3d-model', label: t.style_3d },
    { id: 'digital-art', label: t.style_digital },
  ];

  const RATIOS = [
    { id: '16:9', label: t.ratio_wide },
    { id: '1:1', label: t.ratio_square },
    { id: '9:16', label: t.ratio_portrait },
    { id: '4:3', label: t.ratio_classic },
  ];

  const CONTENT_TYPES = [
    { id: 'image', label: t.image, icon: ImageIcon },
    { id: 'video', label: t.video, icon: Video },
  ];

  const IMAGE_COUNTS = [
    { id: '1', label: t.count_1 },
    { id: '2', label: t.count_2 },
    { id: '4', label: t.count_4 },
    { id: '8', label: t.count_8 },
  ];

  const VIDEO_DURATIONS = [
    { id: '4', label: t.seconds_4 },
    { id: '8', label: t.seconds_8 },
    { id: '12', label: t.seconds_12 },
  ];

  const pollGeneration = async (job, apiKey) => {
    let currentJob = job;

    for (let attempt = 0; attempt < 48; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, attempt < 6 ? 5000 : 10000));

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'poll',
          job: currentJob,
          apiKey,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t.generation_failed);
      }
      if (data.status === 'completed') {
        return data;
      }
      currentJob = data.job || currentJob;
    }

    throw new Error('Video generation is still processing. Please try again in a moment.');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const modelConfig = getModelConfig(selectedModel);
    const providerKey = modelConfig?.providerKey;
    const apiKey = providerKey ? apiKeys[providerKey] : '';

    if (!modelConfig || !apiKey) {
      setGenerationError(t.missing_api_key);
      setShowApiSettings(true);
      return;
    }

    const requiredCredits = calculateCredits(contentType, selectedModel, imageCount);
    const promptText = prompt.trim();
    setViewState('results');
    setIsGenerating(true);
    setGeneratedContent(null);
    setGenerationError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          apiKey,
          contentType,
          provider: modelConfig.providerKey,
          model: modelConfig.apiModel,
          modelLabel: modelConfig.label,
          prompt: promptText,
          style: selectedStyle,
          styleLabel: STYLES.find(s => s.id === selectedStyle)?.label || t.style_none,
          ratio: aspectRatio,
          imageCount: contentType === 'image' ? Number(imageCount) : 1,
          duration: Number(videoDuration),
          negativePrompt,
          referenceImage: uploadedImageData,
        }),
      });

      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t.generation_failed);
      }
      if (data.status === 'processing' && data.job) {
        data = await pollGeneration(data.job, apiKey);
      }
      if (!data.assets?.length || !data.assets[0]?.url) {
        throw new Error('Provider returned no downloadable asset.');
      }

      setIsGenerating(false);
      const newContent = {
        id: Date.now(),
        url: data.assets?.[0]?.url,
        assets: data.assets || [],
        prompt: promptText,
        style: STYLES.find(s => s.id === selectedStyle)?.label || t.style_none,
        styleId: selectedStyle,
        ratio: aspectRatio,
        type: contentType,
        model: modelConfig.label,
        provider: modelConfig.provider,
        imageCount: imageCount,
        creditsUsed: requiredCredits,
        createdAt: new Date().toISOString()
      };
      setGeneratedContent(newContent);
      setMyLibrary(prev => [newContent, ...prev]);
      setUserCredits(prev => Math.max(prev - requiredCredits, 0));
      setGenerationCount(prev => prev + 1);
      setPrompt("");
      setUploadedImage(null);
      setUploadedImageData(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setIsGenerating(false);
      setGenerationError(error.message || t.generation_failed);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setUserCredits(100); // Give initial credits on login
    if (prompt.trim()) {
      handleGenerate();
    }
  };
  
  const handleEditImage = (image) => {
    setUploadedImage(image.url);
    setUploadedImageData(image.url);
    setPrompt(image.prompt);
    
    // Set content type (image or video)
    if (image.type) {
      setContentType(image.type);
    }
    
    // Set model
    if (image.model) {
      setSelectedModel(image.model);
    }
    
    // Set style
    if (image.styleId) {
      setSelectedStyle(image.styleId);
    } else if (image.style) {
      // Try to find style by label
      const styleMatch = STYLES.find(s => s.label === image.style);
      if (styleMatch) {
        setSelectedStyle(styleMatch.id);
      }
    }
    
    // Set aspect ratio
    if (image.ratio) {
      setAspectRatio(image.ratio);
    }
    
    // Set image count if available
    if (image.imageCount) {
      setImageCount(image.imageCount.toString());
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDeleteUploadedImage = () => {
    setUploadedImage(null);
    setUploadedImageData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleImageClick = (item) => {
    setSelectedImage(item);
    setShowImageDetail(true);
  };
  
  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    // You could add a toast notification here
  };
  
  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const downloadAsset = (asset, fallbackName = 'creator-studio-output') => {
    const url = asset?.url || asset;
    if (!url) return;
    const extension = asset?.mime?.includes('video') ? 'mp4' : asset?.mime?.split('/')[1]?.split(';')[0] || (url.startsWith('data:video') ? 'mp4' : 'png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fallbackName}.${extension}`;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => setUploadedImageData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'tr' ? 'en' : 'tr');

  // Filter community images for Discover
  const filteredCommunityImages = COMMUNITY_IMAGES.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterStyle !== 'all' && item.style !== filterStyle) return false;
    if (filterRatio !== 'all' && item.ratio !== filterRatio) return false;
    return true;
  });

  // Filter community works images
  const filteredCommunityWorks = COMMUNITY_WORKS_IMAGES.filter(item => {
    if (communityFilterType !== 'all' && item.type !== communityFilterType) return false;
    if (communityFilterStyle !== 'all' && item.style !== communityFilterStyle) return false;
    if (communityFilterRatio !== 'all' && item.ratio !== communityFilterRatio) return false;
    return true;
  });

  // Dynamic Classes based on Theme
  const bgMain = theme === 'dark' ? 'bg-black' : 'bg-[#fafafa]';
  const textMain = theme === 'dark' ? 'text-white' : 'text-zinc-900';
  const navBg = viewState === 'results' 
    ? (theme === 'dark' ? 'bg-black/80 backdrop-blur-md border-white/5' : 'bg-white/80 backdrop-blur-md border-black/5') 
    : 'bg-transparent border-transparent';
  
  const searchBoxBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200 shadow-xl shadow-gray-200/50';
  const settingsBg = theme === 'dark' ? 'bg-[#0a0a0a]/50 border-white/5' : 'bg-gray-50/80 border-gray-200';
  const textAreaColor = theme === 'dark' ? 'text-white placeholder-zinc-600' : 'text-gray-900 placeholder-gray-400';
  
  const cardBg = theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200';
  const skeletonBg = theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-gray-100';
  const activeModelConfig = getModelConfig(selectedModel);
  const activeProviderHasKey = Boolean(activeModelConfig?.providerKey && apiKeys[activeModelConfig.providerKey]);

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${bgMain} ${textMain} selection:bg-purple-500/20`}>
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center relative">
          {/* Left Side - Logo */}
          <div className="absolute left-4 sm:left-6 flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => { setCurrentPage('home'); setViewState('landing'); }}>
            <div className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${theme === 'dark' ? 'bg-gradient-to-br from-white to-zinc-200' : 'bg-gradient-to-br from-black to-zinc-800'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={theme === 'dark' ? 'text-black' : 'text-white'}>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">{APP_NAME}</span>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center gap-1 md:gap-2">
                <button 
              onClick={() => { setCurrentPage('home'); setViewState('landing'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative group ${currentPage === 'home' 
                ? (theme === 'dark' ? 'text-white' : 'text-black') 
                : (theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-black')}`}
            >
              {t.nav_home}
              {currentPage === 'home' && (
                <motion.div 
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                />
              )}
                </button>
            <button 
              onClick={() => { setCurrentPage('pricing'); setViewState('landing'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative group ${currentPage === 'pricing' 
                ? (theme === 'dark' ? 'text-white' : 'text-black') 
                : (theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-black')}`}
            >
              {t.nav_pricing}
              {currentPage === 'pricing' && (
                <motion.div 
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                />
              )}
            </button>
            <button 
              onClick={() => { setCurrentPage('help'); setViewState('landing'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative group ${currentPage === 'help' 
                ? (theme === 'dark' ? 'text-white' : 'text-black') 
                : (theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-black')}`}
            >
              {t.help}
              {currentPage === 'help' && (
                <motion.div 
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                />
              )}
            </button>
          </div>
            
          {/* Right Side - Actions */}
          <div className="absolute right-4 sm:right-6 flex items-center gap-2 sm:gap-3">
            {/* Theme & Lang Toggles */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={toggleLang} 
                className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
                title="Switch Language"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <Globe size={14} />
                  <span className="hidden sm:inline">{lang.toUpperCase()}</span>
                </div>
              </button>
              <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => setShowApiSettings(true)}
                className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
                title={t.api_keys}
              >
                <KeyRound size={16} />
              </button>
            </div>

            {isLoggedIn ? (
              <div className="relative flex items-center gap-3">
                <div 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer hover:scale-105 ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600' : 'bg-gray-100 border-gray-200 hover:border-gray-300'}`}
                >
                  <User size={16} className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} />
                </div>
                <AnimatePresence>
                  {showProfileDropdown && (
                    <ProfileDropdown
                      theme={theme}
                      t={t}
                      credits={userCredits}
                      onClose={() => setShowProfileDropdown(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
                  className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  <span className="hidden sm:inline">{t.nav_login}</span>
                  <span className="sm:hidden">{t.sign_in_short}</span>
                </button>
                <button 
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-all hidden sm:block ${theme === 'dark' ? 'bg-transparent border border-white/20 text-white hover:bg-white/10' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  {t.sign_up}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative pt-16 min-h-screen flex flex-col">
        
        {/* Dashboard Pages */}
        {currentPage !== 'home' && (
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {currentPage === 'dashboard' && (
              <div>
                <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.dashboard}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Zap size={24} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.credits_remaining}</h3>
                    </div>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{userCredits}</p>
                  </div>
                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Library size={24} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.my_library}</h3>
                    </div>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{myLibrary.length}</p>
                  </div>
                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 size={24} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.total_generations}</h3>
                    </div>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{myLibrary.length}</p>
                  </div>
                </div>
              </div>
            )}
            {currentPage === 'history' && (
              <div>
                <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.history}</h1>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {myLibrary.map((item) => (
                    <div 
                      key={item.id} 
                      className="break-inside-avoid relative group cursor-pointer mb-4"
                      onClick={() => handleImageClick(item)}
                    >
                      <div className={`relative overflow-hidden rounded-lg border ${theme === 'dark' ? 'bg-zinc-900 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
                        <div className="relative w-full" style={{ aspectRatio: item.ratio === '1:1' ? '1' : item.ratio === '9:16' ? '9/16' : item.ratio === '4:3' ? '4/3' : '16/9' }}>
                          {item.type === 'video' ? (
                            <video
                              src={item.url}
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <img 
                              src={item.url} 
                              alt={item.prompt} 
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={(e) => {
                                e.target.src = `https://picsum.photos/seed/${item.id}/800/600`;
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className={`text-[10px] font-medium line-clamp-1 ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>{item.prompt}</p>
                        <p className={`text-[9px] mt-0.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentPage === 'settings' && (
              <div>
                <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.settings}</h1>
                <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.api_keys}</h2>
                      <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}>{t.api_keys_subtitle}</p>
                    </div>
                    <button
                      onClick={() => setShowApiSettings(true)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                      {t.api_keys}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentPage === 'pricing' && (
              <div className="px-2 sm:px-0">
                <PricingPage theme={theme} t={t} generationCount={generationCount} />
              </div>
            )}
            {currentPage === 'help' && (
              <HelpPage theme={theme} t={t} />
            )}
          </div>
        )}
        
        {/* Dynamic Hero / Search Section */}
        {currentPage === 'home' && (
          <>
          <motion.div 
          layout
          className={`w-full flex flex-col items-center transition-all duration-700 ease-[0.23,1,0.32,1] px-4 sm:px-6 ${viewState === 'landing' ? 'justify-center min-h-[70vh]' : 'justify-start pt-8'}`}
        >
          {/* Logo & Headline in Landing State */}
          <AnimatePresence>
            {viewState === 'landing' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden', marginBottom: 0 }}
                className="text-center mb-8 sm:mb-10 px-4"
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-3 sm:mb-4 tracking-tight">
                  {t.hero_title}
                </h1>
                <p className={`text-sm sm:text-lg font-light max-w-xl mx-auto ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  {t.hero_subtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Box Container */}
          <motion.div 
            layout
            className={`w-full ${viewState === 'landing' ? 'max-w-3xl' : 'max-w-5xl'}`}
          >
            <div className="relative group">
              <div className={`relative rounded-xl sm:rounded-2xl flex flex-col border transition-colors ${searchBoxBg}`}>
                
                {/* Text Area & Upload */}
                <div className="flex items-start p-3 sm:p-4 gap-2 sm:gap-3">
                   {/* Upload Button */}
                   <div>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileUpload}
                     />
                     <div className="relative group/upload">
                       <button 
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-2 rounded-lg transition-colors ${uploadedImage 
                            ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
                            : (theme === 'dark' ? 'hover:bg-white/5 text-zinc-500 hover:text-white' : 'hover:bg-black/5 text-gray-400 hover:text-black')}`}
                        title={uploadedImage ? t.delete_image : t.upload_tooltip}
                       >
                          {uploadedImage ? (
                            <div className="w-5 h-5 rounded overflow-hidden relative border border-white/20">
                              <img src={uploadedImage} className="w-full h-full object-cover" alt="ref" />
                            </div>
                          ) : (
                            <Paperclip size={20} />
                          )}
                       </button>
                       {uploadedImage && (
                         <button
                           onClick={(e) => {
                             e.stopPropagation();
                             handleDeleteUploadedImage();
                           }}
                           className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 hover:bg-red-600 transition-all shadow-lg z-10"
                           title={t.delete_image}
                         >
                           <X size={12} className="text-white" />
                         </button>
                       )}
                     </div>
                   </div>

                   <div className="relative flex-1">
                   <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                      placeholder=""
                    className={`w-full bg-transparent resize-none outline-none py-1.5 min-h-[44px] sm:min-h-[48px] max-h-[160px] text-base sm:text-lg font-light ${textAreaColor}`}
                    rows={1}
                   />
                     {!prompt && (
                       <div className="absolute inset-0 pointer-events-none flex items-center py-1.5">
                         <AnimatedPlaceholder theme={theme} lang={lang} hasGenerated={generationCount > 0} />
                       </div>
                     )}
                   </div>
                   
                   <button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${prompt.trim() 
                        ? (theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800') 
                        : (theme === 'dark' ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed' : 'bg-gray-100 text-gray-300 cursor-not-allowed')}`}
                   >
                     {isGenerating ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"/> : <ArrowRight size={20} />}
                   </button>
                </div>

                {/* Settings Toolbar (Dropdowns) */}
                <div className={`relative z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 sm:px-4 pb-3 sm:pb-4 pt-1 border-t rounded-b-xl sm:rounded-b-2xl backdrop-blur-sm ${settingsBg}`}>
                   <Dropdown 
                     label={t.content_type} 
                     icon={contentType === 'image' ? ImageIcon : Video} 
                     value={contentType} 
                     options={CONTENT_TYPES.map(ct => ({ id: ct.id, label: ct.label }))} 
                     onSelect={(val) => {
                       setContentType(val);
                       if (val === 'video') {
                         setImageCount('1');
                         // Switch to video model if current model is image-only
                         if (IMAGE_MODELS.find(m => m.id === selectedModel)) {
                           setSelectedModel('gemini-veo-31');
                         }
                       } else {
                         // Switch to image model if current model is video-only
                         if (VIDEO_MODELS.find(m => m.id === selectedModel)) {
                           setSelectedModel('gemini-nano-banana');
                         }
                       }
                     }} 
                     theme={theme}
                   />
                   
                   {contentType === 'image' && (
                     <Dropdown 
                       label={t.image_count} 
                       icon={Grid3x3} 
                       value={imageCount} 
                       options={IMAGE_COUNTS} 
                       onSelect={setImageCount}
                       theme={theme} 
                     />
                   )}

                   {contentType === 'video' && (
                     <Dropdown
                       label={t.video_duration}
                       icon={Clock}
                       value={videoDuration}
                       options={VIDEO_DURATIONS}
                       onSelect={setVideoDuration}
                       theme={theme}
                     />
                   )}

                   <Dropdown 
                     label={t.model} 
                     icon={Settings2} 
                     value={selectedModel} 
                     wide
                     options={contentType === 'image' 
                       ? IMAGE_MODELS.map(m => ({ id: m.id, label: `${m.label} · ${m.provider}` }))
                       : VIDEO_MODELS.map(m => ({ id: m.id, label: `${m.label} · ${m.provider}` }))
                     } 
                     onSelect={(val) => {
                       setSelectedModel(val);
                     }} 
                     theme={theme}
                   />
                   
                   <Dropdown 
                     label={t.style} 
                     icon={Palette} 
                     value={selectedStyle} 
                     options={STYLES} 
                     onSelect={setSelectedStyle}
                     theme={theme} 
                   />

                   <Dropdown 
                     label={t.ratio} 
                     icon={LayoutTemplate} 
                     value={aspectRatio} 
                     options={RATIOS} 
                     onSelect={setAspectRatio}
                     theme={theme} 
                   />

                   <div className="flex-1"></div>
                   {activeModelConfig && (
                     <button
                       onClick={() => setShowApiSettings(true)}
                       className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                         activeProviderHasKey
                           ? theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                           : theme === 'dark' ? 'bg-red-500/10 text-red-300 border-red-500/20' : 'bg-red-50 text-red-700 border-red-200'
                       }`}
                     >
                       {activeProviderHasKey ? <ShieldCheck size={14} /> : <KeyRound size={14} />}
                       {activeModelConfig.provider}
                     </button>
                   )}
                   <div className={`text-[10px] font-mono hidden sm:block ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                      {prompt.length} / 2000
                   </div>
                </div>
                <div className={`px-3 sm:px-4 pb-3 sm:pb-4 ${settingsBg}`}>
                  <input
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder={t.negative_prompt_placeholder}
                    className={`w-full rounded-lg border px-3 py-2 text-xs outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-black/30 border-white/10 text-zinc-200 placeholder-zinc-700'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- RESULTS AREA (Active State) --- */}
        <AnimatePresence>
          {viewState === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 w-full max-w-7xl mx-auto px-6 mt-12 pb-20"
            >
              {/* CURRENT GENERATION - Smaller Preview */}
              {(isGenerating || generatedContent) && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xs font-medium uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      {t.output_preview}
                    </h3>
                    {generatedContent && (
                       <div className="flex gap-2">
                          <button
                            onClick={() => handleCopyLink(generatedContent.url)}
                            className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-zinc-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black'}`}
                          >
                            <Share2 size={14} />
                          </button>
                          <button
                            onClick={() => downloadAsset(generatedContent.assets?.[0] || generatedContent.url, `${APP_NAME.toLowerCase().replace(/\s+/g, '-')}-${generatedContent.id}`)}
                            className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-zinc-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black'}`}
                          >
                            <Download size={14} />
                          </button>
                       </div>
                    )}
                  </div>

                  {generationError && (
                    <div className={`w-full max-w-2xl mx-auto mb-4 rounded-xl border p-4 text-sm flex items-start gap-3 ${
                      theme === 'dark'
                        ? 'bg-red-500/10 border-red-500/20 text-red-200'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                      <span>{generationError}</span>
                    </div>
                  )}

                  {isGenerating ? (
                     /* Skeleton Loading - Smaller */
                     <div className={`w-full max-w-2xl mx-auto aspect-video rounded-lg border overflow-hidden relative flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#0f0f0f] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent animate-shimmer ${theme === 'dark' ? 'via-white/5' : 'via-black/5'}`} style={{ transform: 'skewX(-20deg) translateX(-150%)' }} />
                        <div className={`w-6 h-6 border-2 rounded-full animate-spin mb-3 ${theme === 'dark' ? 'border-white/10 border-t-white' : 'border-black/10 border-t-black'}`}></div>
                        <p className={`text-xs font-light animate-pulse ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{t.processing}</p>
                     </div>
                  ) : generatedContent ? (
                    /* Result Card - Smaller */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden border group ${cardBg}`}
                    >
                      <div 
                        className={`relative w-full aspect-video cursor-pointer`}
                        onClick={() => handleImageClick(generatedContent)}
                      >
                        {generatedContent.type === 'video' ? (
                          <video
                            src={generatedContent.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={generatedContent.url}
                            alt={generatedContent.prompt}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditImage(generatedContent);
                          }}
                          className={`absolute top-3 right-3 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${theme === 'dark' ? 'bg-black/60 hover:bg-black/80 text-white' : 'bg-white/80 hover:bg-white text-gray-900'}`}
                          title={t.edit}
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                      <div className={`p-3 border-t flex justify-between items-center ${theme === 'dark' ? 'bg-[#0a0a0a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`flex items-center gap-3 text-[10px] font-mono ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                             <span>{generatedContent.style || t.style_none}</span>
                             <span>•</span>
                             <span>{generatedContent.ratio}</span>
                          </div>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              )}

              {/* MY LIBRARY SECTION */}
              {isLoggedIn && myLibrary.length > 0 && (
                <div className={`mb-12 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                  <div className="flex items-center gap-2 mb-6">
                    <Library size={18} className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'} />
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.my_library}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-white/10 text-zinc-400' : 'bg-black/5 text-gray-500'}`}>{myLibrary.length}</span>
                  </div>
                  
                  <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {myLibrary.map((item) => (
                      <div 
                        key={item.id} 
                        className="break-inside-avoid relative group cursor-pointer mb-4"
                        onClick={() => handleImageClick(item)}
                      >
                        <div className={`relative overflow-hidden rounded-lg border ${theme === 'dark' ? 'bg-zinc-900 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
                          <div className="relative w-full" style={{ aspectRatio: item.ratio === '1:1' ? '1' : item.ratio === '9:16' ? '9/16' : item.ratio === '4:3' ? '4/3' : '16/9' }}>
                            {item.type === 'video' ? (
                              <video
                                src={item.url}
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <img 
                                src={item.url} 
                                alt={item.prompt} 
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.src = `https://picsum.photos/seed/${item.id}/800/600`;
                                }}
                              />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditImage(item);
                              }}
                              className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${theme === 'dark' ? 'bg-black/60 hover:bg-black/80 text-white' : 'bg-white/80 hover:bg-white text-gray-900'}`}
                              title={t.edit}
                            >
                              <Pencil size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-start justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                           <div className="flex-1 min-w-0">
                              <p className={`text-[10px] font-medium line-clamp-1 ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>{item.prompt}</p>
                              <p className={`text-[9px] mt-0.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{item.ratio}</p>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COMMUNITY FEED - Gallery Style with Filters */}
              <div className={`border-t pt-12 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.discover}</h3>
                  <div className="flex items-center gap-2">
                    <Filter size={16} className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'} />
                    <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>{t.filters}</span>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {/* Type Filter */}
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filterType === 'all'
                        ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                        : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t.filter_all}
                  </button>
                  <button
                    onClick={() => setFilterType('image')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      filterType === 'image'
                        ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                        : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ImageIcon size={12} />
                    {t.filter_image}
                  </button>
                  <button
                    onClick={() => setFilterType('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      filterType === 'video'
                        ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                        : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Video size={12} />
                    {t.filter_video}
                  </button>

                  <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

                  {/* Style Filter */}
                  <Dropdown
                    label={t.filter_by_style}
                    icon={Palette}
                    value={filterStyle}
                    options={[
                      { id: 'all', label: t.filter_all },
                      ...STYLES.map(s => ({ id: s.id, label: s.label }))
                    ]}
                    onSelect={setFilterStyle}
                    theme={theme}
                  />

                  {/* Ratio Filter */}
                  <Dropdown
                    label={t.filter_by_size}
                    icon={LayoutTemplate}
                    value={filterRatio}
                    options={[
                      { id: 'all', label: t.filter_all },
                      ...RATIOS.map(r => ({ id: r.id, label: r.label }))
                    ]}
                    onSelect={setFilterRatio}
                    theme={theme}
                  />
                </div>
                
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {filteredCommunityImages.map((item) => (
                    <div 
                      key={item.id} 
                      className="break-inside-avoid relative group cursor-pointer mb-6"
                      onClick={() => handleImageClick(item)}
                    >
                      <div className={`relative overflow-hidden rounded-lg border ${theme === 'dark' ? 'bg-zinc-900 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
                        <div className="relative w-full" style={{ aspectRatio: item.ratio === '1:1' ? '1' : item.ratio === '9:16' ? '9/16' : item.ratio === '4:3' ? '4/3' : '16/9' }}>
                          <img 
                            src={item.url} 
                            alt={item.prompt} 
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              // Fallback to a placeholder if image fails to load
                              e.target.src = `https://picsum.photos/seed/${item.id}/800/600`;
                            }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        </div>
                      </div>
                      
                      {/* Minimal Overlay Info */}
                      <div className="mt-3 flex items-start justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                         <div className="flex-1 min-w-0 pr-2">
                            <p className={`text-xs font-medium line-clamp-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>{item.prompt}</p>
                            <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{item.author}</p>
                         </div>
                         <button className={`transition-colors flex-shrink-0 ${theme === 'dark' ? 'text-zinc-500 hover:text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                            <Heart size={14} />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

         {/* --- COMMUNITY WORKS SECTION (Landing Page) --- */}
        <AnimatePresence>
          {viewState === 'landing' && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ delay: 0.2 }}
               className={`mt-auto w-full border-t ${theme === 'dark' ? 'bg-[#050505] border-white/5' : 'bg-white border-black/5'}`}
             >
                <div className="max-w-7xl mx-auto px-6 py-16">
                   <div className="flex items-center justify-between mb-8">
                     <div>
                       <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.community_footer}</h2>
                       <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>{t.community_description}</p>
                     </div>
                     <div className="flex items-center gap-2">
                       <Filter size={16} className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'} />
                       <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>{t.filters}</span>
                     </div>
                   </div>

                   {/* Filter Buttons for Community Works */}
                   <div className="flex flex-wrap items-center gap-2 mb-8">
                     {/* Type Filter */}
                     <button
                       onClick={() => setCommunityFilterType('all')}
                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                         communityFilterType === 'all'
                           ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                           : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       }`}
                     >
                       {t.filter_all}
                     </button>
                     <button
                       onClick={() => setCommunityFilterType('image')}
                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                         communityFilterType === 'image'
                           ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                           : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       }`}
                     >
                       <ImageIcon size={12} />
                       {t.filter_image}
                     </button>
                     <button
                       onClick={() => setCommunityFilterType('video')}
                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                         communityFilterType === 'video'
                           ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                           : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       }`}
                     >
                       <Video size={12} />
                       {t.filter_video}
                     </button>

                     <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

                     {/* Style Filter */}
                     <Dropdown
                       label={t.filter_by_style}
                       icon={Palette}
                       value={communityFilterStyle}
                       options={[
                         { id: 'all', label: t.filter_all },
                         ...STYLES.map(s => ({ id: s.id, label: s.label }))
                       ]}
                       onSelect={setCommunityFilterStyle}
                       theme={theme}
                     />

                     {/* Ratio Filter */}
                     <Dropdown
                       label={t.filter_by_size}
                       icon={LayoutTemplate}
                       value={communityFilterRatio}
                       options={[
                         { id: 'all', label: t.filter_all },
                         ...RATIOS.map(r => ({ id: r.id, label: r.label }))
                       ]}
                       onSelect={setCommunityFilterRatio}
                       theme={theme}
                     />
                   </div>

                   {/* Community Works Grid */}
                   <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                      {filteredCommunityWorks.map((item) => (
                        <div key={item.id} className="break-inside-avoid relative group cursor-pointer mb-6">
                          <div className={`relative overflow-hidden rounded-lg border ${theme === 'dark' ? 'bg-zinc-900 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
                            <div className="relative w-full" style={{ aspectRatio: item.ratio === '1:1' ? '1' : item.ratio === '9:16' ? '9/16' : item.ratio === '4:3' ? '4/3' : '16/9' }}>
                              <img 
                                src={item.url} 
                                alt={item.prompt} 
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                  // Fallback to a placeholder if image fails to load
                                  e.target.src = `https://picsum.photos/seed/${item.id}/800/600`;
                                }}
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                          </div>
                          
                          {/* Minimal Overlay Info */}
                          <div className="mt-3 flex items-start justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                             <div className="flex-1 min-w-0 pr-2">
                                <p className={`text-xs font-medium line-clamp-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>{item.prompt}</p>
                                <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{item.author}</p>
                             </div>
                             <button className={`transition-colors flex-shrink-0 ${theme === 'dark' ? 'text-zinc-500 hover:text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                                <Heart size={14} />
                             </button>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
          </>
        )}
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onLogin={handleLoginSuccess}
            theme={theme}
            t={t}
            mode={authMode}
            setMode={setAuthMode}
          />
        )}
        {showApiSettings && (
          <ApiSettingsModal
            apiKeys={apiKeys}
            setApiKeys={setApiKeys}
            onClose={() => setShowApiSettings(false)}
            theme={theme}
            t={t}
          />
        )}
        {showPricingModal && (
          <PricingModal
            onClose={() => setShowPricingModal(false)}
            theme={theme}
            t={t}
            generationCount={generationCount}
          />
        )}
        {showCreditsModal && (
          <CreditsModal
            onClose={() => setShowCreditsModal(false)}
            onViewPlans={() => setShowPricingModal(true)}
            theme={theme}
            t={t}
            requiredCredits={calculateCredits(contentType, selectedModel, imageCount)}
            currentCredits={userCredits}
          />
        )}
        {showImageDetail && selectedImage && (
          <ImageDetailModal
            image={selectedImage}
            onClose={() => {
              setShowImageDetail(false);
              setSelectedImage(null);
            }}
            onEdit={handleEditImage}
            theme={theme}
            t={t}
            onCopyPrompt={handleCopyPrompt}
            onCopyLink={handleCopyLink}
            onDownload={downloadAsset}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

