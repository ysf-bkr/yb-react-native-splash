import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SplashScreen } from 'yb-react-native-splash';

const App = () => {
  const splashScreenRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const [isAppReady, setIsAppReady] = useState(false);

  // Uygulama başlatma simülasyonu
  useEffect(() => {
    async function prepare() {
      try {
        // Simüle edilmiş başlangıç işlemleri
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
        // Boot ekranını gizle
        splashScreenRef.current?.hide();
      }
    }

    prepare();
  }, []);

  // Demo fonksiyonları
  const showDefaultSplash = () => {
    splashScreenRef.current?.updateConfig({
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    });
    splashScreenRef.current?.show();
  };

  const showAnimatedSplash = () => {
    splashScreenRef.current?.updateConfig({
      backgroundColor: '#3498DB',
      animationType: 'slide',
      animationDuration: 800,
      duration: 2000,
    });
    splashScreenRef.current?.show();
  };

  const showLoadingSplash = async () => {
    splashScreenRef.current?.updateConfig({
      backgroundColor: '#2ECC71',
      animationType: 'fade',
      duration: 0,
    });
    splashScreenRef.current?.show();

    setTimeout(() => {
      splashScreenRef.current?.hide();
    }, 3000);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          YB Splash Screen
        </Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setIsDarkMode(!isDarkMode)}>
          <Text style={styles.themeButtonText}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Demo Seçenekleri
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.defaultButton]}
            onPress={showDefaultSplash}>
            <Text style={styles.buttonText}>YB Logo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.animatedButton]}
            onPress={showAnimatedSplash}>
            <Text style={styles.buttonText}>Animasyonlu Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.loadingButton]}
            onPress={showLoadingSplash}>
            <Text style={styles.buttonText}>Yükleme Simülasyonu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Nasıl Kullanılır?
          </Text>

          <View style={styles.infoBox}>
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
              1. npm install yb-react-native-splash{'\n\n'}
              2. AppDelegate ve MainActivity'yi düzenle{'\n\n'}
              3. SplashScreen bileşenini import et{'\n\n'}
              4. bootConfig ile başlangıç ayarlarını yap
            </Text>
          </View>
        </View>
      </ScrollView>

      <SplashScreen
        ref={splashScreenRef}
        bootConfig={{
          useDefaultLogo: true,
          autoHide: false, // Manuel kontrol için false
          backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
          onBootComplete: () => {
            console.log('Boot tamamlandı!');
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  darkContainer: {
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  darkText: {
    color: '#FFFFFF',
  },
  themeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
  },
  themeButtonText: {
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2C3E50',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  defaultButton: {
    backgroundColor: '#3498DB',
  },
  animatedButton: {
    backgroundColor: '#9B59B6',
  },
  loadingButton: {
    backgroundColor: '#2ECC71',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2C3E50',
  },
});

export default App;