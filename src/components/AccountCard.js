import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { VStack, Box, Divider, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Icon from './CustomIcon';

export default function AccountCard(props) {
  const { user } = props;
  const navigation = useNavigation();

  return (
    <Box
      bg={{
        linearGradient: {
          colors: ['primary.300', 'secondary.800'],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      rounded="xl"
    >
      <VStack space="4" divider={<Divider />}>
        <View>
          <Box px="4" pt="4">
            <Text fontSize="lg" bold>
              {user?.customer?.accountType?.accType}
            </Text>
          </Box>
          <Box px="4">
            <Text style={{ textAlign: 'center' }} bold>
              {user?.customer?.accountNumber}
            </Text>
            <Text style={{ textAlign: 'center', paddingTop: 10 }}>
              Available Balance
            </Text>
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
                {user?.customer?.balance}
              </Text>
            </View>
          </Box>
        </View>
        <Box px="4" pb="4">
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text bold style={{ textAlign: 'center' }}>
              View All Transaction
            </Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({});
