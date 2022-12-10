import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { VStack, Text, Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Container from '../components/Container';
import Transaction from '../components/Transaction';
import Customer from '../components/Customer';

export default function CustomerList(props) {
  const navigation = useNavigation();

  const user = useSelector((state) => getUser(state));

  const searchData = () => {};

  return (
    <Container>
      <View style={{ marginBottom: 10 }}>
        <Input
          w="100%"
          py="0"
          InputRightElement={
            <Button rounded="none" onPress={searchData}>
              Search
            </Button>
          }
          placeholder="Search Customer"
        />
      </View>
      <ScrollView>
        <VStack space="4">
          <Customer />
        </VStack>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
