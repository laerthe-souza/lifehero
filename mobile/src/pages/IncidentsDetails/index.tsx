import React, { useCallback, useEffect } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import {
  BorderlessButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import api from '../../services/api';

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

const IncidentsDetails: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();

  const incident = params as Incident;
  const message = `Olá ${
    incident.ong.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de "${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}".`;

  const handleBackToDashboard = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSendMail = useCallback(() => {
    MailComposer.composeAsync({
      subject: `Heroi do caso "${incident.title}"`,
      recipients: [incident.ong.email],
      body: message,
    });
  }, [incident.ong.email, incident.title, message]);

  const handleSendWhatsappMessage = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=55${15991450373}&text=${message}`);
  }, [message]);

  useEffect(() => {
    api.patch(`incidents/views/${incident.id}`);
  }, [incident.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <BorderlessButton onPress={handleBackToDashboard}>
          <Feather name="arrow-left" size={24} color="#1AC92C" />
        </BorderlessButton>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.caseContainer}>
          <Text style={styles.properties}>ONG:</Text>
          <Text style={styles.propertiesName}>{incident.ong.name}</Text>

          <Text style={styles.properties}>CASO:</Text>
          <Text style={styles.propertiesName}>{incident.title}</Text>

          <Text style={styles.properties}>DESCRIÇÃO:</Text>
          <Text style={styles.propertiesName}>{incident.description}</Text>

          <Text style={styles.properties}>VALOR:</Text>
          <Text style={styles.propertiesName}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(incident.value)}
          </Text>

          <Text style={styles.properties}>FOTOS DO CASO:</Text>
          <ScrollView horizontal pagingEnabled style={styles.imagesContainer}>
            {incident.images.map(image => (
              <Image
                key={image.key}
                source={{ uri: image.url }}
                style={styles.image}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.title}>Salve o dia!</Text>
          <Text style={styles.title}>Seja o herói desse caso.</Text>

          <Text style={styles.contactText}>Entre em contato:</Text>

          <View style={styles.groupButtons}>
            <TouchableOpacity
              onPress={handleSendWhatsappMessage}
              style={styles.contactButton}
            >
              <Text style={styles.textButton}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSendMail}
              style={styles.contactButton}
            >
              <Text style={styles.textButton}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default IncidentsDetails;
