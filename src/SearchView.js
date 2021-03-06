import React, { useState, useEffect } from 'react'
import { getQuote } from './stockService'
import { StyleSheet, TextInput, View, Text, FlatList, SafeAreaView } from 'react-native'
import { TouchableHighlight } from 'react-native'
import { StockViewName } from './StockView'

export const SearchViewName = "LookupStock"

function accessibilityLabel(symbol, description, selected) {
  if (selected)
    return `${symbol} ${description} selected`
  else
    return `${symbol} ${description}`
}

function Row ({ symbol, description, selected }) {
  return (
    <View
      accessibilityLabel={accessibilityLabel(symbol, description, selected)}
      style={[styles.row, selected && styles.selected]}>
      <Text>{symbol}</Text>
      <Text>{description}</Text>
    </View>
  )
}

export default function SearchView ({navigation}) {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(undefined)

  useEffect(() => {
    navigation.addListener('focus', () => {
      setSelected(undefined)
    });
  })

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
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={[styles.separator, highlighted && { marginLeft: 0 }]}/>)}
        data={data}
        renderItem={({ item, index, separators }) => {
          const { symbol, description } = item
          return (
            <TouchableHighlight onPress={() => {
              setSelected(symbol)
              navigation.push(StockViewName, {symbol: symbol})
            }}>
              <Row symbol={symbol} description={description} selected={selected === symbol}/>
            </TouchableHighlight>
          )
        }}
        keyExtractor={({ symbol }) => symbol}
        extractData={data}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'blue'
  },
  row: {
    padding: 14,
    flex: 1,
    backgroundColor: '#fff',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9'
  },
  search: {
    padding: 12,
    backgroundColor: '#eee',
    height: 44
  },
  container: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: '#1D3857',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
})