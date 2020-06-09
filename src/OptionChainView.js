import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList} from 'react-native'
import { getOptionChain } from './stockService'

export const OptionChainViewName = 'OptionChainView'

export default function OptionChainView({route}) {
  const [optionChains, setOptionChains] = useState([])

  useEffect(() => {
    const {symbol, expiration} = route.params
    getOptionChain(symbol, expiration)
      .then((data) => setOptionChains(data))
  }, [])

  return <SafeAreaView>
    <FlatList
      data={optionChains}
      renderItem={({item: {strike}}) => {
        return (<View><Text accessibilityLabel={`strike ${strike}`}>strike</Text></View>)
      }}
      keyExtractor={({ strike }) => `${strike}`}
    />
  </SafeAreaView>
}