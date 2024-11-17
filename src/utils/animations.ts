import { Animated, Easing } from 'react-native';

const DEFAULT_DURATION = 500;

/**
 * Fade (solma) animasyonu oluşturur
 * @param value - Animated.Value değeri
 * @param toValue - Hedef opaklık değeri (0-1 arası)
 * @param duration - Animasyon süresi (ms) - opsiyonel, varsayılan 500ms
 * @returns Animated.CompositeAnimation
 */
export const createFadeAnimation = (
    value: Animated.Value,
    toValue: number,
    duration?: number
): Animated.CompositeAnimation => {
    return Animated.timing(value, {
        toValue,
        duration: duration || DEFAULT_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
    });
};

/**
 * Slide (kayma) animasyonu oluşturur
 * @param value - Animated.Value değeri
 * @param toValue - Hedef pozisyon değeri
 * @param duration - Animasyon süresi (ms) - opsiyonel, varsayılan 500ms
 * @returns Animated.CompositeAnimation
 */
export const createSlideAnimation = (
    value: Animated.Value,
    toValue: number,
    duration?: number
): Animated.CompositeAnimation => {
    return Animated.timing(value, {
        toValue,
        duration: duration || DEFAULT_DURATION,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
    });
};

/**
 * Sıralı animasyon dizisi çalıştırır
 * @param animations - Animated.CompositeAnimation dizisi
 * @returns Promise<void>
 */
export const runSequence = (animations: Animated.CompositeAnimation[]): Promise<void> => {
    return new Promise((resolve) => {
        Animated.sequence(animations).start(() => resolve());
    });
};

/**
 * Paralel animasyon dizisi çalıştırır
 * @param animations - Animated.CompositeAnimation dizisi
 * @returns Promise<void>
 */
export const runParallel = (animations: Animated.CompositeAnimation[]): Promise<void> => {
    return new Promise((resolve) => {
        Animated.parallel(animations).start(() => resolve());
    });
};

/**
 * Özel easing fonksiyonları
 */
export const easings = {
    easeOut: Easing.out(Easing.ease),
    easeIn: Easing.in(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    elastic: Easing.elastic(1),
    bounce: Easing.bounce
};