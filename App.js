import React from 'react';
import SearchView from './src/SearchView';
import OptionExpirationView, { OptionExpirationViewName } from './src/OptionExpirationView'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LookupStock" component={SearchView} options={{title: 'Lookup Stock'}}/>
        <Stack.Screen name={OptionExpirationViewName} component={OptionExpirationView} options={{title: 'Choose Expiration'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


