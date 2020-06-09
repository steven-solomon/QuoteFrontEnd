import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList} from 'react-native'
import { getOptionChain } from './stockService'
import { formatCurrency } from './formatCurrency'

export const OptionChainViewName = 'OptionChainView'

function Row({strike}) {
  const formattedStrike = formatCurrency(strike);
  return (
    <View>
      <Text accessibilityLabel={`strike ${formattedStrike}`}>{formattedStrike}</Text>
    </View>
  )
}

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
      renderItem={({item: {strike}}) => <Row strike={strike}/>}
      keyExtractor={({ strike }) => `${strike}`}
    />
  </SafeAreaView>
}