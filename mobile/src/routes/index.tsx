import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IncidentsDetails from '../pages/IncidentsDetails';
import CasesTab from './CasesTab';

const AppStack: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#E5E5E5' },
        }}
      >
        <Screen name="Dashboard" component={CasesTab} />
        <Screen name="IncidentsDetails" component={IncidentsDetails} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
