import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, FlatList, SafeAreaView } from 'react-native';

import { getQuote } from './stockService';

function Row({field, value}) {
  return (
    <View style={styles.row}>
      <Text>{field}</Text>
      <Text accessibilityLabel={field}>{value}</Text>
    </View>
  );
}

export default function App() {
  const [data, setData] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        accessibilityLabel="Stock Search"
        placeholder="Search for a stock"
        onBlur={({nativeEvent: { text }}) => {
          getQuote(text).then((data) => {
            // map data to field value pairs to render
            setData(Object.entries(data));
          })
        }}
      />
      <FlatList
        data={data}
        renderItem={({item}) => {
          const [field, value] = item;
          // nested Text components are treated as inline
          return (<Row field={field} value={value} />);
        }}
        keyExtractor={([field, value]) => field}
        extractData={data}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 14,
    flex: 1,
    backgroundColor: '#fff',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  search: {
    padding: 12,
    backgroundColor: '#eee',
    height: 44
  },
  container: {
    paddingTop: 12,
    flex: 1,
    paddingHorizontal: 1,
    backgroundColor: '#1D3857',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
