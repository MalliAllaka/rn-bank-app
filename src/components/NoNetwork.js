import React from 'react';
import { StatusBar, Image, Platform, Alert, View, Text } from 'react-native';

function NoNetwork() {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Image
        style={{
          width: 200,
          height: 200,
          //   backgroundColor: '#fff',
        }}
        source={require('../../assets/image/noWifi.png')}
      />
      <Text
        style={{
          fontSize: 18,
          alignSelf: 'center',
          padding: 10,
          color: 'gray',
        }}
      >
        No Network
      </Text>
      {/* <Text
        style={{
          fontSize: 14,
          alignSelf: 'center',
          padding: 10,
          color: 'gray',
        }}
      >
        Try again
      </Text> */}
    </View>
  );
}

export default NoNetwork;
