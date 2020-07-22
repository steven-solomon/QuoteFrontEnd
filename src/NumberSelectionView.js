import { SafeAreaView, FlatList, ScrollView, View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

function firstTicks (index) {
  if (index !== 0) {
    return <>
      <View style={styles.tick}></View>
      <View style={styles.tick}></View>
    </>
  } else {
    return <>
      <View style={[styles.tick, {backgroundColor: 'transparent'}]}></View>
      <View style={[styles.tick, {backgroundColor: 'transparent'}]}></View>
    </>
  }
}

function lastTicks(index) {
  if (index !== 4) {
    return <>
      <View style={styles.tick}></View>
      <View style={styles.tick}></View>
    </>
  } else {
    return <>
      <View style={[styles.tick, {backgroundColor: 'transparent'}]}></View>
      <View style={[styles.tick, {backgroundColor: 'transparent'}]}></View>
    </>
  }
}

function renderItem ({ item, index }) {
  return <View key={item} style={[styles.selectable]}>
    <View style={styles.number}>
      <Text style={{ fontSize: 70, color: '#71E4AF' }}>{item}</Text>
    </View>
    <View style={styles.ticks}>
      {firstTicks(index)}
      <View style={[styles.tick, { backgroundColor: '#71E4AF', height: 44 }]}></View>
      {lastTicks(index)}
    </View>
  </View>
}

export default function NumberSelectionView () {
  const width = Dimensions.get('window').width
  const totalItemWidth = 50
  console.log('totalItemWidth', totalItemWidth)

  const [selected, setSelected] = useState(0)

  const data = [1, 2, 3, 4, 5]
  return <SafeAreaView style={styles.container}>
    <View style={{height: 150}}>
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={width}
      onSnapToItem={(i) => {
        setSelected(i)
      }}
      inactiveSlideScale={1}
      itemWidth={100}
      sliderHeight={0}
      style={{ flex: 1, backgroundColor: 'yellow' }}
    />
    </View>
    <View style={{height: 200}}>
      <Text style={{color: 'yellow'}}>Selected Item: {data[selected]}</Text>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#1F2849',
  },
  point: {
    backgroundColor: 'white',
    height: 44,
    width: 100,
  },
  ticks: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  selectable: {
    flex: 1
  },
  selectableText: {
    fontSize: 50
  },
  tick: {
    backgroundColor: 'white',
    width: 3,
    height: 24
  },
  number: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export const NumberSelectionViewName = 'NumberSelectionView'