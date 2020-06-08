import React, { useState } from 'react'
import { getQuote } from './stockService'
import { StyleSheet, TextInput, View, Text, FlatList, SafeAreaView } from 'react-native'

function Row ({ symbol, description }) {
  return (
    <View style={styles.row}>
      <Text>{symbol}</Text>
      <Text>{description}</Text>
    </View>
  )
}

export default function SearchView () {
  const [data, setData] = useState([])

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        accessibilityLabel="Stock Search"
        placeholder="Search for a stock"
        onBlur={({ nativeEvent: { text } }) => {
          getQuote(text).then((data) => {
            setData(data)
          })
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item: { symbol, description } }) => {
          return (<Row symbol={symbol} description={description}/>)
        }}
        keyExtractor={({ symbol }) => symbol}
        extractData={data}
      />
    </SafeAreaView>
  )
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
})