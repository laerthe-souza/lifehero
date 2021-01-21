import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import Cases from '../../components/Cases';
import { useFavorites } from '../../context/favorites';
import socketIo from '../../services/socket';

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

const Dashboard: React.FC = () => {
  const { favorites } = useFavorites();
  const [isRefresh, setIsRefresh] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  socketIo.on('caseDeleted', (data: string) => {
    setIncidents(oldIncidents =>
      oldIncidents.filter(incident => incident.id !== data),
    );
  });

  async function loadIncidents() {
    setIsRefresh(true);

    const response = await api.get(`incidents/limit/${incidents.length}`);

    const incidentsData = response.data;

    setIncidents([...incidents, ...incidentsData]);
    setIsRefresh(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.totalCasos}>
          {`Total de ${incidents.length} casos`}
        </Text>

        <BorderlessButton>
          <Feather name="refresh-cw" size={24} color="#1AC92C" />
        </BorderlessButton>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      {incidents.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#1AC92C" />
          <Text style={{ marginTop: 10, fontSize: 14, color: '#737380' }}>
            Carregando/procurando casos...
          </Text>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={loadIncidents}
              progressBackgroundColor="#1AC92C"
            />
          }
          data={incidents}
          keyExtractor={incident => incident.id}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.1}
          renderItem={({ item: incident }) => (
            <Cases
              incident={incident}
              key={incident.id}
              favorited={
                favorites.length !== 0 ? favorites.includes(incident.id) : false
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Dashboard;
