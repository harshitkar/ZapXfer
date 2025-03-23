import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BottomTabNavigator from './components/BottomTabNavigator';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Ensures consistent background
  },
});
