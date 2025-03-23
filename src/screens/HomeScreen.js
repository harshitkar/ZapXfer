import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  console.log("HomeScreen is rendering"); // Debug log
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
