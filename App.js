import React from 'react';
import SearchView, { SearchViewName } from './src/SearchView';
import OptionExpirationView, { OptionExpirationViewName } from './src/OptionExpirationView'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OptionChainView, { OptionChainViewName } from './src/OptionChainView'
import TraderView, { TraderViewName } from './src/TraderView'
import StockView, { StockViewName } from './src/StockView'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SearchViewName} component={SearchView} options={{title: 'Lookup Stock'}}/>
        <Stack.Screen name={StockViewName} component={StockView} options={{title: 'Stock Details'}}/>
        <Stack.Screen name={OptionExpirationViewName} component={OptionExpirationView} options={{title: 'Choose Expiration'}} />
        <Stack.Screen name={OptionChainViewName} component={OptionChainView} options={{title: 'Option Chain'}} />
        <Stack.Screen name={TraderViewName} component={TraderView} options={{title: 'Trade Options'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


