import { Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Grid, LineChart } from 'react-native-svg-charts'
import { getHistoricalData } from './stockService'

export const StockViewName = 'StockView'

export default function StockView ({ route }) {
  const [data, setData] = useState([])
  const { symbol } = route.params

  useEffect(() => {
    getHistoricalData(symbol).then((d) => setData(d))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text accessibilityLabel='symbol'>{symbol}</Text>
        <LineChart
          style={{ height: 200 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid/>
        </LineChart>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})