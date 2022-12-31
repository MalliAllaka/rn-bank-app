import * as React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, VStack, Divider, Button, Heading } from 'native-base';
import Container from '../components/Container';

import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Icon from '../components/CustomIcon';
import WithdrawalAmount from '../components/WithdrawalAmount';
import DepositAmount from '../components/DepositAmount';
import Transaction from '../components/Transaction';
import { getCustomer } from '../actions/common';
import { useAppDispatch } from '../app/store';
import Loading from '../components/Loading';

export default function CustomerDetails({ route, navigation }) {
  const showBackButton = route?.params?.showBackButton;
  // const customer = route?.params?.customer;
  const customerId = route?.params?.customerId;
  const dispatch = useAppDispatch();

  const [activeType, setActiveType] = React.useState('deposit');
  const [customer, setCustomer] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const userData = React.useMemo(() => {
    if (customer) {
      let dataArray = [];
      dataArray.push({
        title: 'Account Number',
        value: `${customer.accountNumber}`,
      });
      dataArray.push({
        title: 'Customer Id',
        value: `${customer.customerId}`,
      });
      dataArray.push({
        title: 'User Name',
        value: `${customer.user.username}`,
      });
      dataArray.push({
        title: 'Balance',
        value: `${customer.balance}`,
      });
      dataArray.push({
        title: 'Name',
        value: `${customer.customerDetails.firstName} ${customer.customerDetails.lastName}`,
      });
      dataArray.push({
        title: 'Age',
        value: `${customer.customerDetails.age}`,
      });
      dataArray.push({
        title: 'E-Mail',
        value: `${customer.customerDetails.email}`,
      });
      dataArray.push({
        title: 'Phone No',
        value: `${customer.customerDetails.phoneNo}`,
      });

      return dataArray;
    }
    return [];
  }, [customer]);

  const getData = async (customerId) => {
    setLoading(true);
    try {
      const response = await dispatch(
        getCustomer({
          customerId: customerId,
        })
      );
      const { payload } = response;

      if (payload.data) {
        setCustomer(payload.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    getData(customerId);
  }, [customerId]);

  if (loading) {
    return <Loading />;
  }

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            onPress={() => setActiveType('deposit')}
            style={{ borderRadius: 50, width: '40%' }}
            variant={activeType == 'deposit' ? 'solid' : 'outline'}
          >
            Deposit
          </Button>
          <Button
            onPress={() => setActiveType('withdraw')}
            style={{ borderRadius: 50, width: '40%' }}
            variant={activeType == 'withdraw' ? 'solid' : 'outline'}
          >
            Withdraw
          </Button>
        </View>
        <View style={{ marginTop: 10 }}>
          {activeType == 'withdraw' ? (
            <WithdrawalAmount customer={customer} setCustomer={setCustomer} />
          ) : (
            <DepositAmount customer={customer} setCustomer={setCustomer} />
          )}
        </View>
        {/* <Heading size="sm" style={{ paddingVertical: 10 }}>
          Latest Transactions
        </Heading>
        <Transaction /> */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CustomerTransactions', {
              showBackButton: true,
              customerId: customer?.id,
              name: `${customer.customerDetails.firstName} ${customer.customerDetails.lastName}`,
            })
          }
        >
          <Heading
            size="sm"
            color="primary.500"
            style={{ paddingVertical: 10, textAlign: 'center' }}
          >
            View All Transactions
          </Heading>
        </TouchableOpacity>
        <Heading size="sm" style={{ paddingVertical: 10 }}>
          Customer Details
        </Heading>
        <VStack space="4" divider={<Divider />}>
          {userData.map((d, i) => {
            return (
              <View
                key={`${d.title}${i}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1 }}>{`${d.title} `}</Text>
                <Text style={{ flex: 1 }}>{`${d.value} `}</Text>
              </View>
            );
          })}
        </VStack>
      </ScrollView>
    </Container>
  );
}
