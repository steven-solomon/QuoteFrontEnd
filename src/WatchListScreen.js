import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

export default function WatchListScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text accessibilityLabel='Your watch list is empty'>Your watch list is empty</Text>
      </View>
    </SafeAreaView>
  );
}