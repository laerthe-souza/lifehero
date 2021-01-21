import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  BorderlessButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { useFavorites } from '../../context/favorites';

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

interface CasesProps {
  incident: Incident;
  favorited?: boolean;
}

const Cases: React.FC<CasesProps> = ({ incident, favorited }) => {
  const { navigate } = useNavigation();
  const { loadFavorites } = useFavorites();

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('casesFavorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (favorited) {
      const favoritesIndex = favoritesArray.findIndex(
        (incidentItem: Incident) => {
          return incidentItem.id === incident.id;
        },
      );

      favoritesArray.splice(favoritesIndex, 1);
    } else {
      favoritesArray.push(incident);
    }

    await AsyncStorage.setItem(
      'casesFavorites',
      JSON.stringify(favoritesArray),
    );

    loadFavorites();
  }, [incident, favorited, loadFavorites]);

  const handleNavigateToIncidentsDetails = useCallback(() => {
    navigate('IncidentsDetails', incident);
  }, [navigate, incident]);

  return (
    <View style={styles.caseContainer}>
      <Text style={styles.properties}>ONG:</Text>
      <Text style={styles.propertiesName}>{incident.ong.name}</Text>

      <Text style={styles.properties}>CASO:</Text>
      <Text style={styles.propertiesName}>{incident.title}</Text>

      <Text style={styles.properties}>VALOR:</Text>
      <Text style={styles.propertiesName}>
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(incident.value)}
      </Text>

      <View style={styles.separator} />

      <TouchableOpacity
        onPress={handleNavigateToIncidentsDetails}
        style={styles.detailsButton}
      >
        <Text style={styles.detailsText}>Ver mais detalhes</Text>
        <Feather name="arrow-right" size={24} color="#1AC92C" />
      </TouchableOpacity>

      <BorderlessButton
        style={styles.buttonFavoriteIcon}
        onPress={handleToggleFavorite}
      >
        <Ionicons
          name={favorited ? 'ios-heart-dislike' : 'ios-heart'}
          color={favorited ? '#1AC92C' : '#737380'}
          size={24}
        />
      </BorderlessButton>
    </View>
  );
};

export default Cases;
