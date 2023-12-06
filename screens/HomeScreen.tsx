import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
  },
});
