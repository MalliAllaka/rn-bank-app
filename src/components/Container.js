import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBreakpointValue } from 'native-base';

export default function Container(props) {
  const width = useBreakpointValue({
    base: '100%',
    md: 780,
  });
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: width, padding: 10, flex: 1 }}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
