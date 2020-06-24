import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'

export const TraderViewName = 'Trader'

export default function ({ route: { params: { type, contractID, premium } } }) {
  const [contractsCount, setContractsCount] = useState('1')

  return <View>
    <Text accessibilityLabel={contractID}>{contractID}</Text>
    <Text accessibilityLabel={`premium ${premium}`}>{premium}</Text>
    <Text accessibilityLabel={`type ${type}`}>{type}</Text>
    <TextInput onChangeText={setContractsCount} keyboardType='number-pad' value={contractsCount} accessibilityLabel={`number of contracts`}/>
  </View>
}

