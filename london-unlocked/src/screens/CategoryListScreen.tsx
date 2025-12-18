import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Place } from '../types';
import { Colors } from '../constants/colors';

type CategoryListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CategoryList'
>;
type CategoryListScreenRouteProp = RouteProp<RootStackParamList, 'CategoryList'>;

interface Props {
  navigation: CategoryListScreenNavigationProp;
  route: CategoryListScreenRouteProp;
}

const CategoryListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { category, data, title } = route.params;

  const renderPlaceCard = ({ item, index }: { item: Place; index: number }) => {
    return (
      <TouchableOpacity
        testID={`place-item-${index}`}
        style={styles.card}
        onPress={() => navigation.navigate('PlaceDetails', { place: item, category })}
        accessibilityLabel={`${item.name} - Tap to view details`}
        accessibilityRole="button"
      >
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📷</Text>
          </View>
        </View>

        {/* Place Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.placeName} numberOfLines={2}>
            {item.name}
          </Text>
          {item.area && (
            <Text style={styles.placeArea} numberOfLines={1}>
              📍 {item.area}
            </Text>
          )}
          {item.priceLevel && (
            <Text style={styles.priceLevel}>{item.priceLevel}</Text>
          )}
          {item.cuisineType && (
            <Text style={styles.cuisineType} numberOfLines={1}>
              🍽️ {item.cuisineType}
            </Text>
          )}
          {item.denomination && (
            <Text style={styles.denomination} numberOfLines={1}>
              🕉️ {item.denomination}
            </Text>
          )}
        </View>

        {/* Arrow */}
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{data.length} places to explore</Text>
      </View>

      <FlatList
        testID="places-list"
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaceCard}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No places found</Text>
          </View>
        }
      />
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textOnPrimary,
    opacity: 0.9,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 40,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  placeArea: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  priceLevel: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
    marginTop: 4,
  },
  cuisineType: {
    fontSize: 12,
    color: Colors.warning,
    marginTop: 2,
  },
  denomination: {
    fontSize: 12,
    color: Colors.primaryDark,
    marginTop: 2,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingRight: 16,
  },
  arrow: {
    fontSize: 32,
    color: Colors.textLight,
    fontWeight: '300',
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default CategoryListScreen;

