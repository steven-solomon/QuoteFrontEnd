import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, FlatList } from 'react-native';

import { getQuote } from './stockService';

export default function App() {
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        accessibilityLabel="Stock Search"
        onBlur={({nativeEvent: { text }}) => {
          getQuote(text).then((data) => {
            // map data to key value pairs to render
            setData(Object.entries(data));
          })
        }}
      />
      <FlatList
        data={data}
        renderItem={({item}) => {
          const [key, value] = item;
          // nested Text components are treated as inline
          return (
            <View styles={styles.row}>
              <Text>
                <Text>{key}:</Text>
                <Text accessibilityLabel={key}>{value}</Text>
              </Text>
            </View>
          )
        }}
        keyExtractor={([key, value]) => key}
        extractData={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
  },
  search: {
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    paddingHorizontal: '1rem',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
