import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';

import AppStack from './src/routes/index';
import { FavoritesProvider } from './src/context/favorites';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded && AppLoading) {
    return <AppLoading />;
  }

  return (
    <FavoritesProvider>
      <AppStack />
      <StatusBar barStyle="light-content" backgroundColor="#1AC92C" />
    </FavoritesProvider>
  );
};

export default App;
