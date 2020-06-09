import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { getExpiration } from './stockService'

export const OptionExpirationViewName = 'ChooseExpiration'

export default function OptionExpirationView ({ route }) {
  const [expirationValues, setExpirationValues] = useState([])
  const { symbol } = route.params

  useEffect(() => {
    getExpiration(symbol).then((data) => {
      setExpirationValues(data)
    })
  }, [])

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={expirationValues}
          renderItem={(({ item }) => {
            return <View><Text>{item}</Text></View>
          })}
          data={expirationValues}
          keyExtractor={(date) => date}
        />
      </SafeAreaView>
    </View>
  )
}