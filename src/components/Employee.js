import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box, Text } from 'native-base';
import moment from 'moment';
import Icon from './CustomIcon';

export default function Employee(props) {
  const { user } = props;

  return (
    <Box bg="secondary.100" rounded="xl" style={{ marginVertical: 5 }}>
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
            {`${user?.employee?.firstName} ${user?.employee?.lastName}`}
          </Text>
          <Text style={{}}>{`${user?.employee?.phoneNo} `}</Text>
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
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            {`${user?.username}`}
          </Text>
        </View>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({});
