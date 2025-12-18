import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';

type PlaceDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PlaceDetails'
>;
type PlaceDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlaceDetails'>;

interface Props {
  navigation: PlaceDetailsScreenNavigationProp;
  route: PlaceDetailsScreenRouteProp;
}

const PlaceDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { place, category } = route.params;

  const getCategoryTitle = () => {
    switch (category) {
      case 'free-places':
        return 'Free Place to Visit';
      case 'restaurants':
        return 'Indian Restaurant';
      case 'shopping':
        return 'Shopping Mall';
      case 'temples':
        return 'Temple';
      default:
        return 'Place Details';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryBadge}>{getCategoryTitle()}</Text>
        <Text style={styles.placeName}>{place.name}</Text>
        {place.area && <Text style={styles.area}>📍 {place.area}</Text>}
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{place.description}</Text>
      </View>

      {/* Location Section */}
      {(place.address || place.tubeStation) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & Directions</Text>
          {place.address && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{place.address}</Text>
            </View>
          )}
          {place.tubeStation && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nearest Tube:</Text>
              <Text style={styles.infoValue}>🚇 {place.tubeStation}</Text>
            </View>
          )}
        </View>
      )}

      {/* Additional Info based on category */}
      {place.priceLevel && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <Text style={styles.priceLevel}>{place.priceLevel}</Text>
        </View>
      )}

      {place.cuisineType && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuisine Type</Text>
          <Text style={styles.infoValue}>{place.cuisineType}</Text>
        </View>
      )}

      {place.storeTypes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Types</Text>
          <Text style={styles.infoValue}>{place.storeTypes}</Text>
        </View>
      )}

      {place.denomination && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Denomination</Text>
          <Text style={styles.infoValue}>{place.denomination}</Text>
        </View>
      )}

      {/* Reviews Section */}
      {place.reviews && place.reviews.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {place.reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
                <Text style={styles.reviewRating}>⭐ {review.rating}/5</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Image Placeholders */}
      {place.images && place.images.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <View style={styles.imageContainer}>
            {place.images.map((img, index) => (
              <View key={index} style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>📷 Image {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    paddingTop: 24,
  },
  categoryBadge: {
    fontSize: 12,
    color: Colors.textOnPrimary,
    opacity: 0.9,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    marginBottom: 8,
  },
  area: {
    fontSize: 16,
    color: Colors.textOnPrimary,
    opacity: 0.9,
  },
  section: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  priceLevel: {
    fontSize: 24,
    color: Colors.success,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  reviewRating: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: '500',
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imagePlaceholder: {
    width: '48%',
    aspectRatio: 1.5,
    backgroundColor: Colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: Colors.textLight,
  },
});

export default PlaceDetailsScreen;

