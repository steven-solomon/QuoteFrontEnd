import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expirationValues}
        renderItem={(({ item }) => {
          return <View style={styles.row}><Text>{item}</Text></View>
        })}
        data={expirationValues}
        keyExtractor={(date) => date}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3857',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  row: {
    backgroundColor: '#fff',
    height: 44,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  }
})