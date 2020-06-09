import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { getOptionChain } from './stockService'
import { formatCurrency } from './formatCurrency'

export const OptionChainViewName = 'OptionChainView'

function Row ({ item: { strike, call: { ask } } }) {
  const formattedStrike = formatCurrency(strike)
  const formattedAsk = formatCurrency(ask)

  return (
    <View>
      <Text accessibilityLabel={`call ask ${formattedAsk}`}>{formattedAsk}</Text>
      <Text accessibilityLabel={`strike ${formattedStrike}`}>{formattedStrike}</Text>
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