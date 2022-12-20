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

export default function TotalTransactions({ route, navigation }) {
  const customerId = route?.params?.customerId;
  const name = route?.params?.name;

  const showBackButton = route?.params?.showBackButton;
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [loadMore, setLoadMore] = React.useState(true);
  const [transactionData, setTransactionData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async (currentPage) => {
    setLoading(true);
    try {
      const response = await dispatch(
        getTransactions({
          pageNumber: currentPage,
          pageSize: 15,
          customerId: customerId,
        })
      );
      const { payload } = response;

      if (payload.data.length > 0) {
        setPageNumber(currentPage + 1);
        if (currentPage == 0) {
          setTransactionData(payload.data);
        } else {
          setTransactionData(transactionData.concat(payload.data));
        }
      } else {
        setLoadMore(false);
      }
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    setPageNumber(0);
    getData(0);
  }, [customerId]);

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
      <Heading size="sm" style={{ paddingVertical: 10 }}>
        Total Transactions {`${name ? 'of ' + name : ''}`}
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
          setLoadMore(true);
          getData(0);
        }}
        onEndReached={() => {
          if (loadMore) {
            getData(pageNumber);
          }
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
