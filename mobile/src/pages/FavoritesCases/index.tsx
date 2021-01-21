import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import logoImg from '../../assets/logo.png';
import Cases from '../../components/Cases';
import { useFavorites } from '../../context/favorites';

import styles from './styles';

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

const FavoritesCases: React.FC = () => {
  const { favorites, favoritesList } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.totalCasos}>
          {`Total de ${favoritesList.length} casos favoritados`}
        </Text>
      </View>
      <Text style={styles.title}>Seus casos favoritados</Text>

      <FlatList
        data={favoritesList}
        keyExtractor={(incident: Incident) => incident.id}
        renderItem={({ item: incident }) => (
          <Cases
            incident={incident}
            key={incident.id}
            favorited={favorites.includes(incident.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FavoritesCases;
