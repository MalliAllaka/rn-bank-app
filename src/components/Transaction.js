import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box, Text } from 'native-base';
import Icon from './CustomIcon';

export default function Transaction(props) {
  const { transaction } = props;

  return (
    <Box bg="secondary.100" rounded="xl">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <Text style={{}} bold>
            05 Dec 2022
          </Text>
          <Text style={{}}>from / username /account</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            paddingVertical: 10,
            alignItems: 'center',
          }}
        >
          <Icon fill="black" name="rupee" iconPack="fontawesome" />
          <Text style={{ textAlign: 'center', fontSize: 16 }}>100</Text>
          <Text
            style={{ textAlign: 'center', paddingLeft: 5, fontSize: 16 }}
            color="green.500"
            //   color="red.500"
          >
            CR
          </Text>
        </View>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({});
