import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { VStack, Text, Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Container from '../components/Container';
import Employee from '../components/Employee';
import { getEmployees, getSearchEmployees } from '../actions/common';
import { useAppDispatch } from '../app/store';

export default function EmployeeList(props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [loadMore, setLoadMore] = React.useState(true);
  const [employeeData, setEmployeeData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');

  const searchData = async () => {
    setLoading(true);
    try {
      if (searchText) {
        const response = await dispatch(
          getSearchEmployees({
            pageNumber: 0,
            pageSize: 10,
            searchText: searchText,
          })
        );
        const { payload } = response;

        console.log(payload);
        if (payload.data.length > 0) {
          setPageNumber(1);

          setEmployeeData(payload.data);
        } else {
          setLoadMore(false);
          setEmployeeData([]);
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
        getEmployees({
          pageNumber: pageNumber,
          pageSize: 10,
        })
      );
      const { payload } = response;

      if (payload.data.length > 0) {
        setPageNumber(pageNumber + 1);
        if (pageNumber == 0) {
          setEmployeeData(payload.data);
        } else {
          setEmployeeData(employeeData.concat(payload.data));
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

  return (
    <Container>
      <View style={{ marginBottom: 10, alignItems: 'flex-end' }}>
        <Button
          rounded="none"
          onPress={() => navigation.navigate('AddEmployee')}
        >
          Add Employee
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
          placeholder="Search Employee"
        />
      </View>
      <FlatList
        contentContainerStyle={{
          marginBottom: 40,
        }}
        data={employeeData}
        extraData={employeeData}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Employee user={item} />}
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
