export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
  Explore: undefined;
  CategoryList: { category: string; data: Place[]; title: string };
  PlaceDetails: { place: Place; category: string };
  ProfileSettings: undefined;
};

export interface Place {
  id: string;
  name: string;
  description: string;
  area?: string;
  address?: string;
  tubeStation?: string;
  images?: string[];
  reviews?: Review[];
  priceLevel?: string;
  cuisineType?: string;
  storeTypes?: string;
  denomination?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  requiresAuth: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  userName?: string;
  userEmail?: string;
}

