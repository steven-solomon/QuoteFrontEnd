import { Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export const StockViewName = 'StockView'

export default function StockView ({ route }) {
  const { symbol } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text accessibilityLabel='symbol'>{symbol}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})