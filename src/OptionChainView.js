import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { getOptionChain } from './stockService'

export const OptionChainViewName = 'OptionChainView'

export default function OptionChainView({route}) {
  useEffect(() => {
    const {symbol, expiration} = route.params
    getOptionChain(symbol, expiration)
  }, [])

  return <View><Text>Hi</Text></View>
}