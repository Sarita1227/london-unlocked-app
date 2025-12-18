import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/colors';

type ProfileSettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSettings'
>;

interface Props {
  navigation: ProfileSettingsScreenNavigationProp;
}

const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { isAuthenticated, userName, userEmail, logout, deleteAccount } = useAuth();
  const [guestPrompts, setGuestPrompts] = useState(true);
  const [showTips, setShowTips] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.replace('Landing');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAccount();
            Alert.alert(
              'Account Deleted',
              'Your account has been successfully deleted.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.replace('Landing'),
                }
              ]
            );
          },
        },
      ]
    );
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.guestContainer}>
          <Text style={styles.guestIcon}>👤</Text>
          <Text style={styles.guestTitle}>Not Logged In</Text>
          <Text style={styles.guestText}>
            Please log in or sign up to access your profile and settings
          </Text>
          <TouchableOpacity
            testID="guest-login-button"
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="guest-signup-button"
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{userName || 'User'}</Text>
        <Text style={styles.userEmail}>{userEmail || 'user@example.com'}</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable guest prompts</Text>
            <Text style={styles.settingDescription}>
              Show hints and tips for guest users
            </Text>
          </View>
          <Switch
            testID="guest-prompts-switch"
            value={guestPrompts}
            onValueChange={setGuestPrompts}
            trackColor={{ false: Colors.textLight, true: Colors.primaryLight }}
            thumbColor={guestPrompts ? Colors.primary : Colors.border}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Show tips for new visitors</Text>
            <Text style={styles.settingDescription}>
              Display helpful information about London attractions
            </Text>
          </View>
          <Switch
            testID="show-tips-switch"
            value={showTips}
            onValueChange={setShowTips}
            trackColor={{ false: Colors.textLight, true: Colors.primaryLight }}
            thumbColor={showTips ? Colors.primary : Colors.border}
          />
        </View>
      </View>

      {/* Account Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{userName || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userEmail || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Account Status</Text>
          <Text style={[styles.infoValue, styles.activeStatus]}>Active</Text>
        </View>
      </View>

      {/* Account Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>

        <TouchableOpacity
          testID="logout-button"
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="delete-account-button"
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>🗑️ Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>Explore London v1.0.0</Text>
        <Text style={styles.infoText}>Demo App for Testing</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  guestIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  guestText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.primary,
    width: '80%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    backgroundColor: Colors.primary,
    padding: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.backgroundAlt,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textOnPrimary,
    opacity: 0.9,
  },
  section: {
    backgroundColor: Colors.cardBackground,
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  activeStatus: {
    color: Colors.success,
  },
  logoutButton: {
    backgroundColor: Colors.warning,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: Colors.error,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C0392B',
  },
  deleteButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
});

export default ProfileSettingsScreen;

