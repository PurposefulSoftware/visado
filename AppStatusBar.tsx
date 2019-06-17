import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },

  // rest of the styles
});

export default function AppStatusBar() {
  return (
    <View>
      <StatusBar  barStyle="dark-content" hidden={false}/>
    </View>
  )
}