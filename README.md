# 🧮 Modern Hesap Makinesi

Modern ve kullanıcı dostu bir web tabanlı hesap makinesi uygulaması. Responsive tasarım, karanlık/aydınlık tema desteği ve klavye kısayolları ile geliştirilmiştir.

## ✨ Özellikler

- 🎨 **Modern Tasarım**: TailwindCSS ile şık ve responsive arayüz
- 🌙 **Tema Desteği**: Karanlık/Aydınlık tema geçişi
- ⌨️ **Klavye Desteği**: Tam klavye ile kullanım imkanı
- 📱 **Responsive**: Mobil ve masaüstü uyumlu
- 🔢 **Temel İşlemler**: Toplama, çıkarma, çarpma, bölme
- 🚫 **Hata Yönetimi**: Sıfıra bölme ve geçersiz işlem kontrolü
- 🔄 **Geri Alma**: Backspace ile karakter silme
- 💾 **Tema Hafızası**: Seçilen tema localStorage'da saklanır

## 🚀 Canlı Link

[Projeyi incele](https://melihcandemir.github.io/Calculator/)

## 🛠️ Teknolojiler

- **HTML5**: Semantik yapı
- **CSS3**: TailwindCSS framework'ü
- **JavaScript**: Vanilla JavaScript (ES6+)
- **Responsive Design**: Mobile-first yaklaşım

## 📁 Proje Yapısı

```
├── index.html          # Ana HTML dosyası
├── main.js             # Hesap makinesi mantığı
├── theme.js            # Tema değiştirme fonksiyonları
├── javascript.png      # Favicon
└── README.md           # Bu dosya
```

## 🎯 Kullanım

### Fare ile Kullanım

- Sayıları ve operatörleri tıklayarak işlem yapın
- **Temizle** butonu ile tüm işlemleri sıfırlayın
- **<svg
                class="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
              >
  <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
  </svg>** butonu ile son girilen karakteri silin
- **=** butonu ile sonucu hesaplayın

### Klavye Kısayolları

- `0-9`: Sayı girişi
- `+, -, *, /`: Matematiksel işlemler
- `Enter` veya `=`: Sonucu hesapla
- `Escape` veya `C`: Tümünü temizle
- `Backspace`: Son karakteri sil
- `.`: Ondalık nokta

### Tema Değiştirme

- Sağ üst köşedeki 🌙/☀️ butonuna tıklayarak tema değiştirebilirsiniz
- Tema tercihiniz otomatik olarak kaydedilir

## 🐛 Bilinen Sorunlar

- Çok büyük sayılarla işlem yapılırken hassasiyet kaybı olabilir
- Çok uzun ondalık sonuçlar otomatik olarak kısaltılır
