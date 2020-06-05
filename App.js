import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

import { getDetails } from './stockService';

export default function App() {
  const [price, setPrice] = useState('asldkjfs');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        accessibilityLabel="Stock Search"
        onBlur={() => {
          getDetails()
          .then((price) => setPrice(price))
        }}
      />
      <Text>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
