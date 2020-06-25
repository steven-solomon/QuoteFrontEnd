import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { submitOrder } from './stockService'

export const TraderViewName = 'Trader'

export default function ({ route: { params } }) {
  const { type, contractID, premium } = params
  const [contractsCount, setContractsCount] = useState('1')

  return <View>
    <Text accessibilityLabel={contractID}>{contractID}</Text>
    <Text accessibilityLabel={`premium ${premium}`}>{premium}</Text>
    <Text accessibilityLabel={`type ${type}`}>{type}</Text>
    <TextInput onChangeText={setContractsCount} keyboardType='number-pad' value={contractsCount} accessibilityLabel={`number of contracts`}/>
    <Button accessibilityLabel={"Submit"} onPress={() => {submitOrder(params)}}>Submit</Button>
  </View>
}

