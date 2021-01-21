import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../pages/Dashboard';
import FavoritesCases from '../pages/FavoritesCases';

const CasesTab: React.FC = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
        },

        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },

        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },

        labelStyle: {
          fontFamily: 'Roboto_700Bold',
          fontSize: 14,
          marginLeft: 10,
        },

        inactiveBackgroundColor: '#FAFAFC',
        activeBackgroundColor: '#EBEBF5',
        inactiveTintColor: '#C1BCCC',
        activeTintColor: '#32264D',
      }}
    >
      <Screen
        name="Cases"
        component={Dashboard}
        options={{
          tabBarLabel: 'Casos',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="ios-document"
              size={size}
              color={focused ? '#1AC92C' : color}
            />
          ),
        }}
      />

      <Screen
        name="FavoritesCases"
        component={FavoritesCases}
        options={{
          tabBarLabel: 'Casos favoritos',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="ios-heart"
              size={size}
              color={focused ? '#1AC92C' : color}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default CasesTab;
