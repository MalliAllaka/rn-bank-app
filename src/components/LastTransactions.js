import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { VStack, Box, Divider, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Icon from './CustomIcon';
import Transaction from './Transaction';

export default function LastTransactions(props) {
  const navigation = useNavigation();

  const user = useSelector((state) => getUser(state));

  return (
    <View>
      <Heading size="sm" style={{ paddingVertical: 10 }}>
        Last 10 Transactions
      </Heading>
      <ScrollView>
        <VStack space="4">
          <Transaction />
        </VStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
