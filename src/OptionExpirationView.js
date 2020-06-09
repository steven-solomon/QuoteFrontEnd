import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { getExpiration } from './stockService'

export const OptionExpirationViewName = 'ChooseExpiration'

function accessibilityLabel(item, selected) {
  if (selected === item)
    return `${item} selected`
  else
    return `${item}`
}

export default function OptionExpirationView ({ route }) {
  const [selected, setSelected] = useState(undefined)
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
        keyExtractor={(date) => date}
        renderItem={(({ item }) => {
          return (
            <TouchableHighlight onPress={() => {
              setSelected(item)
            }}>
              <View style={styles.row} accessibilityLabel={accessibilityLabel(item, selected)}>
                <Text>{item}</Text>
              </View>
            </TouchableHighlight>
          )
        })}
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