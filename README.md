# yb-react-native-splash

React Native uygulamalarınız için JavaScript tabanlı, tamamen özelleştirilebilir splash screen ve boot yönetimi çözümü.

[![npm version](https://img.shields.io/npm/v/yb-react-native-splash.svg)](https://www.npmjs.com/package/yb-react-native-splash)
[![npm downloads](https://img.shields.io/npm/dm/yb-react-native-splash.svg)](https://www.npmjs.com/package/yb-react-native-splash)
[![license](https://img.shields.io/npm/l/yb-react-native-splash.svg)](https://github.com/ysf-bkr/yb-react-native-splash/blob/main/LICENSE)

## 🌟 Özellikler

- ✨ Hazır YB logosu ile anında kullanıma hazır
- 🎨 İsteğe bağlı özel logo ve tasarım desteği
- 🚀 Otomatik boot yönetimi ve geçiş animasyonları
- ⚡️ Dark/Light tema desteği
- 📱 iOS ve Android için platform bağımsız çalışma
- 🎯 TypeScript ile tam tip desteği

## 📦 Kurulum

```bash
# npm ile
npm install yb-react-native-splash

# yarn ile
yarn add yb-react-native-splash
```

## 🔧 Platform Kurulumları

### iOS Kurulumu

1. Pod'ları yükleyin:
```bash
cd ios && pod install
```

2. AppDelegate.mm dosyasını düzenleyin:
```objc
#import <YBSplashScreen/RCTYBSplashScreen.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ... diğer kodlar
  
  [RCTYBSplashScreen show];  // Bu satırı ekleyin
  
  return YES;
}

@end
```

### Android Kurulumu

1. android/settings.gradle dosyasına ekleyin:
```gradle
include ':yb-react-native-splash'
project(':yb-react-native-splash').projectDir = new File(rootProject.projectDir, '../node_modules/yb-react-native-splash/android')
```

2. android/app/build.gradle dosyasına ekleyin:
```gradle
dependencies {
    implementation project(':yb-react-native-splash')
}
```

3. MainActivity.java dosyasını düzenleyin:
```java
import com.yb.splashscreen.YBSplashScreenModule;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        YBSplashScreenModule.show(this);  // Bu satırı ekleyin
        super.onCreate(savedInstanceState);
    }
}
```

## 🚀 Kullanım

### 1. Varsayılan YB Logo ile Kullanım (Önerilen)

```jsx
import React from 'react';
import { SplashScreen } from 'yb-react-native-splash';

const App = () => {
  return (
    <>
      <YourApp />
      <SplashScreen
        bootConfig={{
          useDefaultLogo: true,  // YB logosunu kullan
          autoHide: true,        // Otomatik gizlenme
          bootDuration: 2000,    // 2 saniye göster
          backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'  // Tema desteği
        }}
      />
    </>
  );
};
```

### 2. Özel Logo ile Kullanım

```jsx
import React, { useRef } from 'react';
import { SplashScreen } from 'yb-react-native-splash';

const App = () => {
  const splashScreenRef = useRef(null);

  const showCustomSplash = () => {
    splashScreenRef.current?.updateConfig({
      imageSource: require('./assets/logo.png'),
      backgroundColor: '#3498DB',
      animationType: 'fade',
      duration: 2000
    });
    splashScreenRef.current?.show();
  };

  return (
    <>
      <YourApp onAction={showCustomSplash} />
      <SplashScreen ref={splashScreenRef} />
    </>
  );
};
```

### 3. API Beklerken Kullanım

```jsx
const App = () => {
  const splashScreenRef = useRef(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    loadData().then(() => {
      setIsDataLoaded(true);
      splashScreenRef.current?.hide();
    });
  }, []);

  return (
    <>
      <YourApp />
      <SplashScreen
        ref={splashScreenRef}
        bootConfig={{
          useDefaultLogo: true,
          autoHide: false  // Manuel kontrol
        }}
      />
    </>
  );
};
```

## 📚 API

### SplashScreen Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|-----------|
| bootConfig | BootConfig | undefined | Boot yapılandırması |
| initialConfig | SplashScreenConfig | undefined | Başlangıç yapılandırması |

### BootConfig

```typescript
interface BootConfig {
  useDefaultLogo?: boolean;     // YB logosunu kullan
  autoHide?: boolean;           // Otomatik gizlenme
  bootDuration?: number;        // Boot süresi (ms)
  backgroundColor?: string;     // Arka plan rengi
  animationType?: 'none' | 'fade' | 'slide'; // Animasyon tipi
  animationDuration?: number;   // Animasyon süresi (ms)
  onBootComplete?: () => void;  // Tamamlandığında çağrılır
}
```

### Ref Metodları

| Metod | Açıklama |
|-------|-----------|
| show() | Splash ekranını gösterir |
| hide() | Splash ekranını gizler |
| updateConfig(config) | Yapılandırmayı günceller |

## 🎨 Özelleştirme

### 1. Animasyonlar

```jsx
<SplashScreen
  bootConfig={{
    animationType: 'slide',
    animationDuration: 800,
    backgroundColor: '#3498DB'
  }}
/>
```

### 2. Tema Desteği

```jsx
const isDarkMode = useColorScheme() === 'dark';

<SplashScreen
  bootConfig={{
    useDefaultLogo: true,
    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    // Status bar otomatik olarak temaya uyum sağlar
  }}
/>
```

### 3. Özel Geçiş Efektleri

```jsx
<SplashScreen
  bootConfig={{
    animationType: 'fade',
    animationDuration: 1000,
    // Smooth geçiş efekti
  }}
/>
```

## 📱 Örnek Uygulama

Detaylı örnek için `example` klasörüne bakabilirsiniz:

```bash
git clone https://github.com/ysf-bkr/yb-react-native-splash.git
cd yb-react-native-splash/example
yarn install
cd ios && pod install && cd ..
npm start
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim ve Destek

- GitHub Issues: [Issues](https://github.com/ysf-bkr/yb-react-native-splash/issues)
- Email: [mail@example.com](mailto:mail@example.com)

## 🙏 Teşekkürler

Bu kütüphaneyi geliştirirken ilham aldığımız ve katkıda bulunan herkese teşekkürler.

---

Made with ❤️ by [Yusuf B.](https://github.com/ysf-bkr)