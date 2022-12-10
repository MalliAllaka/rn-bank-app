import * as React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, VStack, Divider } from 'native-base';
import Container from '../components/Container';

import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import Icon from '../components/CustomIcon';

export default function AccountDetails({ route, navigation }) {
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
      <ScrollView>
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
