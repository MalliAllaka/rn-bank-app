import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { VStack, Text, Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Container from '../components/Container';
import Transaction from '../components/Transaction';
import Customer from '../components/Customer';
import { getCustomers, getSearchCustomers } from '../actions/common';
import { useAppDispatch } from '../app/store';

export default function CustomerList(props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [loadMore, setLoadMore] = React.useState(true);
  const [customerData, setCustomerData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');

  const user = useSelector((state) => getUser(state));

  const searchData = async () => {
    setLoading(true);
    try {
      if (searchText) {
        const response = await dispatch(
          getSearchCustomers({
            pageNumber: 0,
            pageSize: 10,
            searchText: searchText,
          })
        );
        const { payload } = response;

        console.log(payload);
        if (payload.data.length > 0) {
          setPageNumber(1);

          setCustomerData(payload.data);
        } else {
          setLoadMore(false);
          setCustomerData([]);
        }
      }
    } catch (error) {}
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    try {
      console.log('getData Called', loadMore);

      const response = await dispatch(
        getCustomers({
          pageNumber: pageNumber,
          pageSize: 10,
        })
      );
      const { payload } = response;

      if (payload.data.length > 0) {
        setPageNumber(pageNumber + 1);
        if (pageNumber == 0) {
          setCustomerData(payload.data);
        } else {
          setCustomerData(customerData.concat(payload.data));
        }
      } else {
        setLoadMore(false);
      }
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    if (pageNumber == 0) {
      getData();
    }
  }, [pageNumber]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchText('');
      setLoadMore(true);
      setPageNumber(0);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <View style={{ marginBottom: 10, alignItems: 'flex-end' }}>
        <Button
          rounded="none"
          onPress={() => navigation.navigate('AddCustomer')}
        >
          Add Customer
        </Button>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Input
          w="100%"
          py="0"
          value={searchText}
          onChangeText={(newText) => {
            console.log('newText', newText);
            if (!newText) {
              setLoadMore(true);
              setPageNumber(0);
            }
            setSearchText(newText);
          }}
          InputRightElement={
            <Button rounded="none" onPress={searchData}>
              Search
            </Button>
          }
          placeholder="Search Customer"
        />
      </View>
      <FlatList
        contentContainerStyle={{
          marginBottom: 40,
        }}
        data={customerData}
        extraData={customerData}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Customer customer={item} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}>No Data</Text>
        )}
        onRefresh={() => {
          setSearchText('');
          setLoadMore(true);
          setPageNumber(0);
        }}
        onEndReached={() => {
          if (loadMore) {
            getData();
          }
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
