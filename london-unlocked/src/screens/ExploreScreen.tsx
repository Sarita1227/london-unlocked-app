import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/colors';
import { freePlaces } from '../data/places';
import { restaurants } from '../data/restaurants';
import { malls } from '../data/malls';
import { temples } from '../data/temples';
import { christmasPlaces } from '../data/christmas';

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

interface Props {
  navigation: ExploreScreenNavigationProp;
}

interface CategoryCardProps {
  testID: string;
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  isLocked: boolean;
  isNew?: boolean;
  isHighlighted?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  testID,
  title,
  description,
  icon,
  onPress,
  isLocked,
  isNew,
  isHighlighted,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.card,
        isLocked && styles.lockedCard,
        isHighlighted && styles.highlightedCard
      ]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardTextContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.cardTitle, isHighlighted && styles.highlightedTitle]}>
              {title}
            </Text>
            {isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            )}
          </View>
          <Text style={styles.cardDescription}>{description}</Text>
          {isLocked && (
            <Text style={styles.lockedText}>🔒 Login to unlock full access</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ExploreScreen: React.FC<Props> = ({ navigation }) => {
  const { isAuthenticated, isGuest, userName } = useAuth();

  const handleCategoryPress = (category: string, data: any[], title: string) => {
    if (category === 'free-places' || isAuthenticated) {
      // Free places accessible to everyone, others require login
      if (data.length > 0) {
        navigation.navigate('CategoryList', { category, data, title });
      }
    } else {
      // Show login prompt for locked categories
      Alert.alert(
        'Login Required',
        'Please log in or sign up to access this content',
        [
          {
            text: 'Sign Up',
            onPress: () => navigation.navigate('SignUp'),
          },
          {
            text: 'Log In',
            onPress: () => navigation.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>London Unlocked</Text>
            {isAuthenticated && userName && (
              <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
            )}
            {isGuest && (
              <Text style={styles.guestText}>Guest Mode - Limited Access</Text>
            )}
          </View>
          {isAuthenticated && (
            <TouchableOpacity
              testID="account-button"
              style={styles.accountButton}
              onPress={() => navigation.navigate('ProfileSettings')}
            >
              <Text style={styles.accountIcon}>👤</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>✨ Festive Season Special</Text>

        <CategoryCard
          testID="category-christmas"
          title="Christmas Places to Visit"
          description="Experience London's magical Christmas atmosphere with festive lights, markets, and winter wonderlands"
          icon="🎄"
          onPress={() => handleCategoryPress('christmas', christmasPlaces, 'Christmas Places to Visit')}
          isLocked={false}
          isNew={true}
          isHighlighted={true}
        />

        <Text style={styles.sectionTitle}>Discover London's Best</Text>

        <CategoryCard
          testID="category-free-places"
          title="5 Free Places to Visit"
          description="Explore London's best attractions without spending a penny"
          icon="🏛️"
          onPress={() => handleCategoryPress('free-places', freePlaces, '5 Free Places to Visit')}
          isLocked={false}
        />

        <CategoryCard
          testID="category-restaurants"
          title="Indian Restaurants in London"
          description="Authentic Indian cuisine from curry houses to fine dining"
          icon="🍛"
          onPress={() => handleCategoryPress('restaurants', restaurants, 'Indian Restaurants in London')}
          isLocked={!isAuthenticated}
        />

        <CategoryCard
          testID="category-shopping"
          title="Best Shopping Malls"
          description="Premier shopping destinations across London"
          icon="🛍️"
          onPress={() => handleCategoryPress('shopping', malls, 'Best Shopping Malls')}
          isLocked={!isAuthenticated}
        />

        <CategoryCard
          testID="category-temples"
          title="Temples Near London"
          description="Places of worship and spiritual centers"
          icon="🕉️"
          onPress={() => handleCategoryPress('temples', temples, 'Temples Near London')}
          isLocked={!isAuthenticated}
        />

        {(isGuest || !isAuthenticated) && (
          <View style={styles.promoCard}>
            <Text style={styles.promoTitle}>Unlock Full Access</Text>
            <Text style={styles.promoText}>
              Sign up to explore all categories and get personalized recommendations
            </Text>
            <TouchableOpacity
              testID="promo-signup-button"
              style={styles.promoButton}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.promoButtonText}>Sign Up Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {isAuthenticated && (
        <TouchableOpacity
          testID="profile-settings-button"
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfileSettings')}
        >
          <Text style={styles.profileButtonText}>⚙️ Profile & Settings</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.textOnPrimary,
    opacity: 0.9,
  },
  guestText: {
    fontSize: 14,
    color: Colors.textOnPrimary,
    opacity: 0.9,
  },
  accountButton: {
    backgroundColor: Colors.accent,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 2,
    borderColor: Colors.backgroundAlt,
  },
  accountIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  lockedCard: {
    opacity: 0.7,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  highlightedTitle: {
    color: Colors.primaryDark,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  lockedText: {
    fontSize: 12,
    color: Colors.warning,
    marginTop: 4,
    fontWeight: '500',
  },
  highlightedCard: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  newBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 8,
  },
  newBadgeText: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  promoCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryDark,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    marginBottom: 8,
  },
  promoText: {
    fontSize: 14,
    color: Colors.textOnPrimary,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  promoButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.accentDark,
  },
  promoButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  profileButton: {
    backgroundColor: Colors.textPrimary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  profileButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExploreScreen;

