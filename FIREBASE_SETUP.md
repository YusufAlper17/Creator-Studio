# Firebase Kurulum Rehberi

Bu uygulama, kullanıcı kimlik doğrulama ve veri saklama için Firebase kullanmaktadır.

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" (Proje Ekle) butonuna tıklayın
3. Proje adını girin ve "Continue" (Devam Et) butonuna tıklayın
4. Google Analytics'i isteğe bağlı olarak etkinleştirin
5. "Create project" (Proje Oluştur) butonuna tıklayın

## 2. Authentication (Kimlik Doğrulama) Kurulumu

1. Firebase Console'da sol menüden "Authentication" (Kimlik Doğrulama) seçeneğine tıklayın
2. "Get started" (Başlayın) butonuna tıklayın
3. "Sign-in method" (Giriş yöntemi) sekmesine gidin
4. Aşağıdaki giriş yöntemlerini etkinleştirin:
   - **Email/Password**: "Email/Password" seçeneğini açın ve "Enable" (Etkinleştir) butonuna tıklayın
   - **Google**: "Google" seçeneğini açın, proje desteği e-posta adresini girin ve "Save" (Kaydet) butonuna tıklayın

## 3. Firestore Database Kurulumu

1. Firebase Console'da sol menüden "Firestore Database" seçeneğine tıklayın
2. "Create database" (Veritabanı oluştur) butonuna tıklayın
3. "Start in test mode" (Test modunda başlat) seçeneğini seçin (geliştirme için)
4. Bölge seçin (örn: europe-west1) ve "Enable" (Etkinleştir) butonuna tıklayın

### Firestore Güvenlik Kuralları

Test modundan sonra, aşağıdaki güvenlik kurallarını uygulayın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User's library subcollection
      match /library/{libraryId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 4. Firebase Yapılandırma Bilgilerini Alma

**ÖNEMLİ:** Firebase Console'da web uygulaması eklemeden önce bu adımları tamamlayın:

1. Firebase Console'da proje ayarlarına gidin (⚙️ ikonu veya sol menüden "Project Overview" → ⚙️)
2. "Project settings" (Proje ayarları) sayfasında "General" sekmesinde olduğunuzdan emin olun
3. Aşağıya kaydırın ve "Your apps" (Uygulamalarınız) bölümüne gidin
4. Eğer "There are no apps in your project" yazıyorsa:
   - Platform seçeneklerinden **"</>" (Web)** ikonuna tıklayın
   - Uygulama adını girin (örn: "Creator Studio Web App")
   - "Register app" (Uygulamayı kaydet) butonuna tıklayın
5. Açılan ekranda Firebase yapılandırma bilgilerini göreceksiniz:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "mezo-digi.firebaseapp.com",
     projectId: "mezo-digi",
     storageBucket: "mezo-digi.appspot.com",
     messagingSenderId: "417904174514",
     appId: "1:417904174514:web:..."
   };
   ```
6. Bu değerleri kopyalayın (bir sonraki adımda `.env` dosyasına ekleyeceğiz)

## 5. Gemini API Key Alma

Görüntü oluşturma özelliği için Gemini API key'e ihtiyacınız var:

1. [Google AI Studio](https://aistudio.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. Sol üstteki "Get API key" (API anahtarı al) butonuna tıklayın
4. "Create API key" (API anahtarı oluştur) butonuna tıklayın
5. Yeni bir proje oluşturun veya mevcut bir projeyi seçin
6. Oluşturulan API key'i kopyalayın (örnek: `AIzaSy...`)

**ÖNEMLİ:** API key'inizi güvende tutun ve asla public repository'lere yüklemeyin!

## 6. Environment Variables (.env) Dosyasını Güncelleme

Proje kök dizinindeki `.env` dosyasını açın ve aşağıdaki bilgileri ekleyin:

**Örnek:**
```env
# Gemini API Key (Google AI Studio'dan aldığınız key)
VITE_GEMINI_API_KEY=AIzaSy... (Google AI Studio'dan kopyaladığınız key)

# Firebase Configuration (Firebase Console'dan kopyaladığınız değerler)
VITE_FIREBASE_API_KEY=AIzaSyC... (apiKey değeri)
VITE_FIREBASE_AUTH_DOMAIN=mezo-digi.firebaseapp.com (authDomain değeri)
VITE_FIREBASE_PROJECT_ID=mezo-digi (projectId değeri)
VITE_FIREBASE_STORAGE_BUCKET=mezo-digi.appspot.com (storageBucket değeri)
VITE_FIREBASE_MESSAGING_SENDER_ID=417904174514 (messagingSenderId değeri)
VITE_FIREBASE_APP_ID=1:417904174514:web:... (appId değeri)
VITE_FIREBASE_MEASUREMENT_ID=G-... (measurementId değeri - opsiyonel)
```

**Dikkat:** 
- Tüm değerleri tırnak işareti **OLMADAN** yazın
- `your-` ile başlayan placeholder değerleri gerçek değerlerle değiştirin
- `.env` dosyasını düzenledikten sonra uygulamayı **yeniden başlatın** (npm run dev)

## 7. Uygulamayı Çalıştırma

1. Tüm bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Özellikler

- ✅ Google OAuth ile giriş
- ✅ E-posta/Şifre ile kayıt ve giriş
- ✅ Kullanıcı verilerinin Firestore'da saklanması
- ✅ Kullanıcı kütüphanesinin (library) saklanması
- ✅ Kredi ve oluşturma sayısı takibi
- ✅ Oturum yönetimi (kullanıcı geri geldiğinde verileri yükleme)

## Notlar

- Firebase'in ücretsiz planı (Spark Plan) çoğu kullanım için yeterlidir
- Firestore'da veri saklama limitleri için [Firebase Fiyatlandırma](https://firebase.google.com/pricing) sayfasını kontrol edin
- Production ortamında güvenlik kurallarını mutlaka yapılandırın

