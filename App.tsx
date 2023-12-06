import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from './navigators/StackNavigator';

export default function App() {
  return <>
  <StatusBar style='light' />
  <StackNavigator />
  </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
