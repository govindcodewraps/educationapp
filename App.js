import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RootNavigator from './src/routes/RootNavigator';

import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    // useFonts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <RootNavigator />
      <FlashMessage position={{top: 0, left: 0, right: 0}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
