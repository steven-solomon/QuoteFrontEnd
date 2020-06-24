import React from "react"
import { View, Text } from 'react-native'

export const TraderViewName = "Trader"

export default function({ route: { params: { type, contractID, premium } } }) {
  return <View>
    <Text accessibilityLabel={contractID}>{contractID}</Text>
    <Text accessibilityLabel={`premium ${premium}`}>{premium}</Text>
    <Text accessibilityLabel={`type ${type}`}>{type}</Text>
  </View>
}

