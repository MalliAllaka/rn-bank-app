import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { VStack, Box, Divider, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Container from '../components/Container';
import Transaction from '../components/Transaction';
import Icon from '../components/CustomIcon';
import { getTransactions } from '../actions/common';
import { useAppDispatch } from '../app/store';

export default function LastTransactions(props) {
  const { user } = props;

  const dispatch = useAppDispatch();
  const [transactionData, setTransactionData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        getTransactions({
          pageNumber: 0,
          pageSize: 5,
          customerId: user.customer.id,
        })
      );
      const { payload } = response;

      setTransactionData(payload.data);
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, [user]);

  return (
    <Container>
      <Heading size="sm" style={{ paddingVertical: 10 }}>
        Last 5 Transactions
      </Heading>

      <FlatList
        contentContainerStyle={{
          marginBottom: 40,
        }}
        data={transactionData}
        extraData={transactionData}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Transaction transaction={item} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}>No Data</Text>
        )}
        onRefresh={() => {
          getData();
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
