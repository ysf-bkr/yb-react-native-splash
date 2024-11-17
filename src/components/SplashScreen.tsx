import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Image,
    Dimensions,
    ImageSourcePropType,
    Platform,
    StatusBar,
} from 'react-native';
import type { SplashScreenConfig, SplashScreenRef, BootConfig } from '../types';
import { defaultLogoBase64, createImageFromBase64, defaultLogoColors } from '../utils/defaultLogo';
import { createFadeAnimation, createSlideAnimation } from '../utils/animations';

const { width, height } = Dimensions.get('window');

const DEFAULT_CONFIG: SplashScreenConfig = {
    backgroundColor: defaultLogoColors.background,
    duration: 2000,
    animationType: 'fade',
    animationDuration: 500,
    imageResizeMode: 'contain',
};

interface SplashScreenProps {
    initialConfig?: SplashScreenConfig;
    bootConfig?: BootConfig;
}

const SplashScreen = forwardRef<SplashScreenRef, SplashScreenProps>(
    ({ initialConfig = {}, bootConfig = {} }, ref) => {
        const [config, setConfig] = useState<SplashScreenConfig>(() => {
            if (bootConfig.useDefaultLogo && !initialConfig.imageSource && !bootConfig.imageSource) {
                return {
                    ...DEFAULT_CONFIG,
                    ...initialConfig,
                    imageSource: createImageFromBase64(defaultLogoBase64)
                };
            }
            return {
                ...DEFAULT_CONFIG,
                ...initialConfig
            };
        });

        const [isVisible, setIsVisible] = useState(true);
        const fadeAnim = useRef(new Animated.Value(1)).current;
        const slideAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            if (bootConfig.autoHide) {
                const timer = setTimeout(() => {
                    hide();
                    bootConfig.onBootComplete?.();
                }, bootConfig.bootDuration || DEFAULT_CONFIG.duration);

                return () => clearTimeout(timer);
            }
        }, []);

        const hide = () => {
            const { animationType, animationDuration = DEFAULT_CONFIG.animationDuration, onHide } = config;

            const animation = (() => {
                const duration = typeof animationDuration === 'number' ? animationDuration : DEFAULT_CONFIG.animationDuration;

                switch (animationType) {
                    case 'fade':
                        return createFadeAnimation(fadeAnim, 0, duration);
                    case 'slide':
                        return createSlideAnimation(slideAnim, -height, duration);
                    default:
                        return createFadeAnimation(fadeAnim, 0, 0);
                }
            })();

            animation.start(() => {
                setIsVisible(false);
                onHide?.();
            });
        };

        const show = () => {
            setIsVisible(true);
            fadeAnim.setValue(1);
            slideAnim.setValue(0);

            if (config.duration && config.duration > 0) {
                setTimeout(hide, config.duration);
            }
        };

        const updateConfig = (newConfig: Partial<SplashScreenConfig>) => {
            setConfig((prevConfig) => ({
                ...prevConfig,
                ...newConfig,
            }));
        };

        useImperativeHandle(ref, () => ({
            show,
            hide,
            updateConfig,
        }));

        if (!isVisible) return null;

        const animStyle = (() => {
            switch (config.animationType) {
                case 'fade':
                    return { opacity: fadeAnim };
                case 'slide':
                    return { transform: [{ translateY: slideAnim }] };
                default:
                    return {};
            }
        })();

        return (
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: config.backgroundColor },
                    animStyle,
                ]}
            >
                <StatusBar
                    backgroundColor={config.backgroundColor}
                    barStyle={
                        config.backgroundColor === '#FFFFFF' || config.backgroundColor === '#ffffff'
                            ? 'dark-content'
                            : 'light-content'
                    }
                />
                {config.imageSource && (
                    <Image
                        source={config.imageSource as ImageSourcePropType}
                        style={styles.image}
                        resizeMode={config.imageResizeMode}
                    />
                )}
            </Animated.View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: Platform.select({ android: 999 }),
    },
    image: {
        width: '80%',
        height: '80%',
    },
});

export default SplashScreen;