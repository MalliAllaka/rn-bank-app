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

export default function CustomerDetails({ route, navigation }) {
  const showBackButton = route?.params?.showBackButton;
  const [activeType, setActiveType] = React.useState('deposit');

  const data = useSelector((state) => getUser(state));

  const userData = React.useMemo(() => {
    if (data) {
      let dataArray = [];
      dataArray.push({
        title: 'Account Number',
        value: `${data.customer.accountNumber}`,
      });
      dataArray.push({
        title: 'Customer Id',
        value: `${data.customer.customerId}`,
      });
      dataArray.push({
        title: 'Balance',
        value: `${data.customer.balance}`,
      });
      dataArray.push({
        title: 'Name',
        value: `${data.customer.customerDetails.firstName} ${data.customer.customerDetails.lastName}`,
      });
      dataArray.push({
        title: 'Age',
        value: `${data.customer.customerDetails.age}`,
      });
      dataArray.push({
        title: 'E-Mail',
        value: `${data.customer.customerDetails.email}`,
      });
      dataArray.push({
        title: 'Phone No',
        value: `${data.customer.customerDetails.phoneNo}`,
      });

      return dataArray;
    }
    return [];
  }, [data]);

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
          {activeType == 'withdraw' ? <WithdrawalAmount /> : <DepositAmount />}
        </View>
        <Heading size="sm" style={{ paddingVertical: 10 }}>
          Latest Transactions
        </Heading>
        <Transaction />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CustomerTransactions', {
              customerId: 12,
              showBackButton: true,
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
