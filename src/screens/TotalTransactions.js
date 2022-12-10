import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { VStack, Box, Divider, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Container from '../components/Container';
import Transaction from '../components/Transaction';
import Icon from '../components/CustomIcon';

export default function TotalTransactions({ route, navigation }) {
  const customerId = route?.params?.customerId;
  const showBackButton = route?.params?.showBackButton;

  const user = useSelector((state) => getUser(state));

  return (
    <Container>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ paddingBottom: 10 }}
        >
          <Icon fill="black" name="arrowleft" iconPack="AntDesign" size="6" />
        </TouchableOpacity>
      )}
      <ScrollView>
        <Heading size="sm" style={{ paddingVertical: 10 }}>
          Total Transactions of {customerId}
        </Heading>
        <ScrollView>
          <VStack space="4">
            <Transaction />
          </VStack>
        </ScrollView>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
