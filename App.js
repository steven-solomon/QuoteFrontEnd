import React from 'react';
import SearchView from './src/SearchView';
import OptionChainView from './src/OptionChainView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LookupStock" component={SearchView} options={{title: 'Lookup Stock'}}/>
        <Stack.Screen name="ChooseOptions" component={OptionChainView} options={{title: 'Choose Options'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


