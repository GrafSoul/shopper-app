import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ProjectItem from '../components/ProjectItem';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ProjectItem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
