import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { getOptionChain } from './stockService'
import { formatCurrency } from './formatCurrency'

export const OptionChainViewName = 'OptionChainView'

function Option ({ type, ask, bid, navigation, contractID }) {
  const formattedAsk = formatCurrency(ask)
  const formattedBid = formatCurrency(bid)

  return (
    <View style={styles.option}>
      <TouchableHighlight onPress={() => navigation.push('Trader', {type, contractID, action: 'ask'})}>
        <Text>
          <Text>Ask:</Text>
          <Text accessibilityLabel={`${type} ask ${formattedAsk}`}>{formattedAsk}</Text>
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.push('Trader', {type, contractID, action: 'bid'})}>
        <Text>
          <Text>Bid:</Text>
          <Text accessibilityLabel={`${type} bid ${formattedBid}`}>{formattedBid}</Text>
        </Text>
      </TouchableHighlight>
    </View>
  )
}

function Strike({ strike }) {
  const formattedStrike = formatCurrency(strike)
  return (
    <View style={styles.strike}>
      <Text accessibilityLabel={`strike ${formattedStrike}`}>{formattedStrike}</Text>
    </View>
  )
}

function Row ({ navigation, item: { strike, call, put } }) {
  return (
    <View style={styles.row}>
        <Option navigation={navigation} type={'call'} contractID={call.symbol} ask={call.ask} bid={call.bid}/>
      <Strike strike={strike} />
      <Option type={'put'} ask={put.ask} bid={put.bid}/>
    </View>
  )
}

export default function OptionChainView ({ route, navigation }) {
  const [optionChains, setOptionChains] = useState([])

  useEffect(() => {
    const { symbol, expiration } = route.params
    getOptionChain(symbol, expiration)
      .then((data) => setOptionChains(data))
  }, [])

  return <SafeAreaView style={styles.container}>
    <FlatList
      data={optionChains}
      renderItem={({ item }) => <Row navigation={navigation} item={item}/>}
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