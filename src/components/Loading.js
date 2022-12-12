import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={'#000'} />
      </View>
    </>
  );
}

export default Loading;
