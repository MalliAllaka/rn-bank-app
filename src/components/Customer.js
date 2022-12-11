import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Box, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from './CustomIcon';

export default function Customer(props) {
  const navigation = useNavigation();
  const { customer } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CustomerDetails', {
          showBackButton: true,
          customer: customer,
        })
      }
      style={{ marginVertical: 5 }}
    >
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
              alignSelf: 'center',
              paddingVertical: 10,
            }}
          >
            <Text style={{}} bold>
              {`${customer?.customerDetails?.firstName} ${customer?.customerDetails?.lastName}`}
            </Text>
            <Text style={{}}>
              {`${customer?.accountNumber}`} -
              {`${customer?.accountType?.accType}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                paddingVertical: 10,
                alignItems: 'center',
              }}
            >
              <Icon
                fill="black"
                name="rupee"
                iconPack="fontawesome"
                size="14"
              />
              <Text
                style={{ textAlign: 'center', fontSize: 16 }}
              >{`${customer?.balance}`}</Text>
            </View>
            <Icon fill="black" name="arrowright" iconPack="AntDesign" />
          </View>
        </View>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
