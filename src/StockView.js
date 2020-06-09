import { Text, SafeAreaView, ScrollView, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Grid, LineChart } from 'react-native-svg-charts'
import { getHistoricalData } from './stockService'
import { OptionExpirationViewName } from './OptionExpirationView'

export const StockViewName = 'StockView'

export default function StockView ({ route, navigation }) {
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

        <Button onPress={() => navigation.push(OptionExpirationViewName, {symbol})}
                title='Action Now' accessibilityLabel={'Action now'} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})