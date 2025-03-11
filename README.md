This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Rick and Morty Karakter Rehberi

Bu proje, Rick and Morty API'sini kullanarak karakterleri listeleyen, filtreleme ve detaylı görüntüleme özellikleri sunan modern bir web uygulamasıdır.

## Teknolojiler ve Araçlar

### Temel Teknolojiler
- **Next.js 15**: Server-side rendering ve app router özellikleriyle modern React framework'ü
- **TypeScript**: Tip güvenliği ve kod kalitesi için statik tip sistemi
- **React 19**: Kullanıcı arayüzü geliştirme kütüphanesi
- **Tailwind CSS**: Utility-first CSS framework'ü

### Durum Yönetimi ve Veri İşleme
- **Zustand**: Basit ve esnek global durum yönetimi
- **React Query**: API istekleri ve önbellek yönetimi
- **nuqs**: URL sorgu parametrelerini durum olarak yönetme (SSR desteğiyle)
- **Axios**: HTTP istekleri için kullanılan istemci

### UI Bileşenleri ve Tasarım
- **shadcn/ui**: Yüksek kaliteli, özelleştirilebilir UI bileşenleri
- **Radix UI**: Erişilebilir, headless UI bileşenleri
- **Framer Motion**: Animasyonlar için kullanılan kütüphane
- **Lucide React**: Modern ikon kütüphanesi

### Kod Kalitesi ve Geliştirme Araçları
- **ESLint**: Kod kalitesi ve standartları için statik kod analizi
- **Prettier**: Kod formatlaması için kullanılan araç
- **Husky**: Git hook'ları ile kod kalitesi kontrolü
- **lint-staged**: Sadece değişiklik yapılan dosyaları kontrol etme

## Mimari ve Tasarım Prensipleri

### Mimari Yaklaşım
- **App Router**: Next.js'in yeni app router yapısı kullanılarak sayfa ve layout'lar düzenlendi
- **Server-Side Rendering (SSR)**: Sayfa içeriği sunucu tarafında render edilerek SEO ve performans iyileştirildi
- **Modüler Yapı**: Bileşenler, hook'lar ve servisler mantıksal olarak ayrıldı

### Kod Organizasyonu
- **Fonksiyonel Programlama**: Class'lar yerine fonksiyonel ve deklaratif programlama yaklaşımı
- **Custom Hook'lar**: Tekrar kullanılabilir mantık için özel hook'lar (use-character-filters, use-characters-query)
- **Tip Güvenliği**: TypeScript ile tüm bileşenler ve fonksiyonlar için güçlü tip tanımlamaları

### UI/UX Prensipleri
- **Responsive Tasarım**: Tüm ekran boyutlarına uygun arayüz
- **Erişilebilirlik**: Radix UI ile a11y standartlarına uygun bileşenler
- **Tema Desteği**: Koyu/açık tema desteği
- **Modern Görsel Tasarım**: Gradient'ler, yumuşak gölgeler ve modern UI elementleri

## Özellikler

### Karakter Listesi
- Sayfalama ile karakter listesi görüntüleme
- URL sorgu parametreleri ile durum yönetimi
- SSR ile ilk yükleme performansı optimizasyonu

### Filtreleme Sistemi
- Status (alive, dead, unknown) filtreleme
- Gender (female, male, genderless, unknown) filtreleme
- URL sorgu parametreleri ile filtre durumu korunması
- Aktif filtreleri gösteren badge'ler

### Karakter Detayları
- Karakter hakkında detaylı bilgi görüntüleme
- İlgili bölüm ve konum bilgileri
- Responsive detay sayfası tasarımı

## Geliştirme Prensipleri

### Kod Kalitesi
- **Standart.js Kuralları**: Tutarlı kod stili için standart kurallar
- **Tip Güvenliği**: TypeScript ile tip hataları minimuma indirildi
- **Otomatik Kontroller**: Husky ve lint-staged ile commit öncesi kod kalitesi kontrolleri

### Performans Optimizasyonu
- **React Server Components**: Mümkün olduğunca 'use client' kullanımı minimuma indirildi
- **Önbellek Stratejileri**: React Query ile API istekleri için önbellek
- **Code Splitting**: Dinamik import ile kod bölümleme

### Bakım ve Sürdürülebilirlik
- **Açıklayıcı İsimlendirme**: Değişkenler ve fonksiyonlar için anlamlı isimler
- **Modüler Kod**: Tekrar kullanılabilir bileşenler ve hook'lar
- **Dokümantasyon**: Kod içi yorumlar ve README ile proje dokümantasyonu

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleme
npm install

# Geliştirme sunucusunu başlatma
npm run dev

# Derleme
npm run build

# Üretim sunucusunu başlatma
npm run start

# Kod kalitesi kontrolü
npm run lint

# Kod formatlaması
npm run format
```

## API Kullanımı

Proje, [Rick and Morty API](https://rickandmortyapi.com)'sini kullanmaktadır. API'nin sağladığı endpoint'ler:

- `/api/character`: Karakter listesi
- `/api/character/{id}`: Belirli bir karakterin detayları
- `/api/location`: Konum listesi
- `/api/episode`: Bölüm listesi

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.
