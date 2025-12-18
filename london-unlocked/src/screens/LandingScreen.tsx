import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/colors';

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const { continueAsGuest } = useAuth();

  const handleContinueAsGuest = () => {
    continueAsGuest();
    navigation.replace('Explore');
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoIcon}>🏛️</Text>
            </View>
          </View>

          <Text style={styles.appTitle}>London Unlocked</Text>
          <Text style={styles.tagline}>Discover London's Hidden Gems</Text>
          <Text style={styles.subtitle}>
            Your guide to free attractions, dining, shopping, and culture
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              testID="get-started-button"
              style={[styles.button, styles.primaryButton]}
              onPress={handleGetStarted}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="continue-as-guest-button"
              style={[styles.button, styles.secondaryButton]}
              onPress={handleContinueAsGuest}
            >
              <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Guest users have limited access to content
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(93, 173, 226, 0.75)', // Sky blue overlay
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 4,
    borderColor: Colors.backgroundAlt,
  },
  logoIcon: {
    fontSize: 56,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.backgroundAlt,
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 20,
    color: Colors.backgroundAlt,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.backgroundAlt,
    marginBottom: 48,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 22,
    opacity: 0.95,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.accentDark,
  },
  primaryButtonText: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: Colors.backgroundAlt,
  },
  secondaryButtonText: {
    color: Colors.backgroundAlt,
    fontSize: 17,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 13,
    color: Colors.backgroundAlt,
    opacity: 0.85,
    marginTop: 28,
    textAlign: 'center',
  },
});

export default LandingScreen;

