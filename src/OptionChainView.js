import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native'
import { getOptionChain } from './stockService'
import { formatCurrency } from './formatCurrency'

export const OptionChainViewName = 'OptionChainView'

function Option ({ type, ask, bid }) {
  const formattedAsk = formatCurrency(ask)
  const formattedBid = formatCurrency(bid)

  return (
    <View style={styles.option}>
      <Text>
        <Text>Ask:</Text>
        <Text accessibilityLabel={`${type} ask ${formattedAsk}`}>{formattedAsk}</Text>
      </Text>
      <Text>
        <Text>Bid:</Text>
        <Text accessibilityLabel={`${type} bid ${formattedBid}`}>{formattedBid}</Text>
      </Text>
    </View>
  )
}

function Row ({ item: { strike, call, put } }) {
  const formattedStrike = formatCurrency(strike)

  return (
    <View style={styles.row}>
      <Option type={'call'} ask={call.ask} bid={call.bid}/>
      <View style={styles.strike}>
        <Text accessibilityLabel={`strike ${formattedStrike}`}>{formattedStrike}</Text>
      </View>
      <Option type={'put'} ask={put.ask} bid={put.bid}/>
    </View>
  )
}

export default function OptionChainView ({ route }) {
  const [optionChains, setOptionChains] = useState([])

  useEffect(() => {
    const { symbol, expiration } = route.params
    getOptionChain(symbol, expiration)
      .then((data) => setOptionChains(data))
  }, [])

  return <SafeAreaView style={styles.container}>
    <FlatList
      data={optionChains}
      renderItem={({ item }) => <Row item={item}/>}
      keyExtractor={({ strike }) => `${strike}`}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3857',
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9'
  },
  option: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  strike: {
    backgroundColor: '#efefef',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})