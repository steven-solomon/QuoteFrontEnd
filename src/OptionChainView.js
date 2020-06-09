import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { getOptionChain } from './stockService'
import { formatCurrency } from './formatCurrency'

export const OptionChainViewName = 'OptionChainView'

function Call ({ ask, bid }) {
  const formattedAsk = formatCurrency(ask)
  const formattedBid = formatCurrency(bid)

  return (
    <>
      <Text accessibilityLabel={`call ask ${formattedAsk}`}>{formattedAsk}</Text>
      <Text accessibilityLabel={`call bid ${formattedBid}`}>{formattedBid}</Text>
    </>
  )
}

function Put ({ask}) {
  const formattedAsk = formatCurrency(ask)
  return (
    <>
      <Text accessibilityLabel={`put ask ${formattedAsk}`}>{formattedAsk}</Text>
    </>
  )
}

function Row ({ item: { strike, call, put } }) {
  const formattedStrike = formatCurrency(strike)

  return (
    <View>
      <Call ask={call.ask} bid={call.bid}/>
      <Text accessibilityLabel={`strike ${formattedStrike}`}>{formattedStrike}</Text>
      <Put ask={put.ask}/>
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