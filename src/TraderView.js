import React from "react"
import { View, Text } from 'react-native'

export const TraderViewName = "Trader"

export default function({ route }) {
  return <View>
    <Text accessibilityLabel={route.params.symbol}>{route.params.symbol}</Text>
  </View>
}

