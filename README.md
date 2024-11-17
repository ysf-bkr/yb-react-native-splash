# yb-react-native-splash-screen

React Native uygulamalarınız için JavaScript tabanlı, tamamen özelleştirilebilir splash screen ve boot yönetimi çözümü.

[![npm version](https://img.shields.io/npm/v/yb-react-native-splash-screen.svg)](https://www.npmjs.com/package/yb-react-native-splash-screen)
[![npm downloads](https://img.shields.io/npm/dm/yb-react-native-splash-screen.svg)](https://www.npmjs.com/package/yb-react-native-splash-screen)
[![license](https://img.shields.io/npm/l/yb-react-native-splash-screen.svg)](https://github.com/ysf-bkr/yb-react-native-splash/blob/main/LICENSE)

## 🌟 Özellikler

- ✨ Hazır YB logosu ile anında kullanıma hazır
- 🎨 Özelleştirilebilir görünüm ve animasyonlar
- 🚀 Otomatik boot yönetimi ve kolay entegrasyon
- ⚡️ Dark/Light tema desteği
- 📱 iOS ve Android için platform bağımsız çalışma
- 🎯 TypeScript ile tam tip desteği

## 📦 Kurulum

```bash
# npm ile
npm install yb-react-native-splash-screen

# yarn ile
yarn add yb-react-native-splash-screen
```

## 🔧 Platform Kurulumları

### iOS Kurulumu

1. Pod'ları yükleyin:
```bash
cd ios && pod install
```

2. AppDelegate.mm (veya AppDelegate.m) dosyasını düzenleyin:
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
include ':yb-react-native-splash-screen'
project(':yb-react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/yb-react-native-splash-screen/android')
```

2. android/app/build.gradle dosyasına ekleyin:
```gradle
dependencies {
    implementation project(':yb-react-native-splash-screen')
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
import { SplashScreen } from 'yb-react-native-splash-screen';

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
import { SplashScreen } from 'yb-react-native-splash-screen';

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

## 🎯 Örnek Uygulama

Detaylı örnek için `example` klasörüne bakabilirsiniz:

```bash
git clone https://github.com/ysf-bkr/yb-react-native-splash.git
cd yb-react-native-splash/example
npm install
cd ios && pod install && cd ..
npm start
```

## 🐛 Sorun Giderme

### iOS
- Pod yükleme hatası: `pod deintegrate && pod install`
- Splash görünmüyor: AppDelegate.mm kontrolü
- Logo görünmüyor: Asset kataloğu kontrolü

### Android
- Gradle sync hatası: Android Studio'yu yeniden başlatın
- MainActivity import hatası: Package name kontrolü
- Splash gecikmesi: bootDuration ayarı

## 📄 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim ve Destek

- GitHub Issues: [Issues](https://github.com/ysf-bkr/yb-react-native-splash/issues)
- Email: [mail@example.com](mailto:mail@example.com)

---

Made with ❤️ by [Yusuf B.](https://github.com/ysf-bkr)