import React from 'react';
import SearchView from './src/SearchView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Add Stock" component={SearchView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


