import { SafeAreaView, FlatList, ScrollView, View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

export default function NumberSelectionView () {
  const width = Dimensions.get('window').width;
  const totalItemWidth = 50;
  console.log('totalItemWidth', totalItemWidth);

  return <SafeAreaView style={styles.container}>
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 10]}
      renderItem={({item}) => {
        return <View key={item} style={[styles.selectable, {width: totalItemWidth}]}><Text style={styles.selectableText}>{item}</Text></View>
      }}
      horizontal
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      snapToAlignment="center"
      decelerationRate="fast"
      bounces={false}
      getItemLayout={(data, index) => ({
        length: totalItemWidth,
        offset: 1000,
        index,
      })}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'darkblue',
  },
  point: {
    backgroundColor: 'white',
    height: 44,
    width: 100,
  },
  selectable: {
  },
  selectableText: {
    fontSize: 50
  },
})

export const NumberSelectionViewName = 'NumberSelectionView'