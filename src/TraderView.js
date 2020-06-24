import React from "react"
import { View, Text } from 'react-native'

export const TraderViewName = "Trader"

export default function({ route }) {
  return <View>
    <Text accessibilityLabel={route.params.contractID}>{route.params.contractID}</Text>
  </View>
}

