/**
 * Splash screen yapılandırma arayüzü
 */
export interface SplashScreenConfig {
    /**
     * Splash screen arka plan rengi
     * @default '#ffffff'
     */
    backgroundColor?: string;

    /**
     * Gösterim süresi (milisaniye)
     * @default 2000
     */
    duration?: number;

    /**
     * Splash screen çıkış animasyonu tipi
     * @default 'fade'
     */
    animationType?: 'none' | 'fade' | 'slide';

    /**
     * Animasyon süresi (milisaniye)
     * @default 500
     */
    animationDuration?: number;

    /**
     * Splash screen'de gösterilecek resim kaynağı
     */
    imageSource?: any;

    /**
     * Resim boyutlandırma modu
     * @default 'contain'
     */
    imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'center';

    /**
     * Splash screen gizlendiğinde çağrılacak fonksiyon
     */
    onHide?: () => void;
}

/**
 * Boot yapılandırma arayüzü
 */
export interface BootConfig extends SplashScreenConfig {
    /**
     * Varsayılan YB logosunu kullan
     * @default false
     */
    useDefaultLogo?: boolean;

    /**
     * Boot süresi sonunda otomatik gizle
     * @default true
     */
    autoHide?: boolean;

    /**
     * Boot süresi (milisaniye)
     * @default 2000
     */
    bootDuration?: number;

    /**
     * Boot tamamlandığında çağrılacak fonksiyon
     */
    onBootComplete?: () => void;
}

/**
 * SplashScreen bileşeni için ref arayüzü
 */
export interface SplashScreenRef {
    /**
     * Splash screen'i göster
     */
    show: () => void;

    /**
     * Splash screen'i gizle
     */
    hide: () => void;

    /**
     * Splash screen yapılandırmasını güncelle
     */
    updateConfig: (config: Partial<SplashScreenConfig>) => void;
}