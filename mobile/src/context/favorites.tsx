import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface FavoritesContextData {
  favorites: string[];
  favoritesList: Incident[];
  loadFavorites(): void;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  value: number;
  images: Array<{
    id: string;
    key: string;
    url: string;
  }>;
  ong: {
    name: string;
    email: string;
  };
}

const Favorites = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesList, setFavoritesList] = useState<Incident[]>([]);

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('casesFavorites').then(response => {
      if (response) {
        const favoritedIncidents = JSON.parse(response);

        const favoritedIncidentsIds = favoritedIncidents.map(
          (incident: Incident) => {
            return incident.id;
          },
        );

        setFavorites(favoritedIncidentsIds);
        setFavoritesList(JSON.parse(response));
      }
    });
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <Favorites.Provider value={{ favorites, favoritesList, loadFavorites }}>
      {children}
    </Favorites.Provider>
  );
};

export function useFavorites(): FavoritesContextData {
  const favorites = useContext(Favorites);

  return favorites;
}
