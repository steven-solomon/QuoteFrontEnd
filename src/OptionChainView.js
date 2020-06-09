import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { getOptionChain } from './stockService'
import { formatCurrency } from './formatCurrency'

export const OptionChainViewName = 'OptionChainView'

function Option ({ type, ask, bid }) {
  const formattedAsk = formatCurrency(ask)
  const formattedBid = formatCurrency(bid)

  return (
    <>
      <Text accessibilityLabel={`${type} ask ${formattedAsk}`}>{formattedAsk}</Text>
      <Text accessibilityLabel={`${type} bid ${formattedBid}`}>{formattedBid}</Text>
    </>
  )
}

function Row ({ item: { strike, call, put } }) {
  const formattedStrike = formatCurrency(strike)

  return (
    <View>
      <Option type={'call'} ask={call.ask} bid={call.bid}/>
      <Text accessibilityLabel={`strike ${formattedStrike}`}>{formattedStrike}</Text>
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

  return <SafeAreaView>
    <FlatList
      data={optionChains}
      renderItem={({ item }) => <Row item={item}/>}
      keyExtractor={({ strike }) => `${strike}`}
    />
  </SafeAreaView>
}