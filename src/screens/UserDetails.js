import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

export default function UserDetails({ route, navigation }) {
  const data = route?.params?.data;

  const userData = React.useMemo(() => {
    if (data) {
      let dataArray = [];
      dataArray.push({
        title: 'Username',
        value: `${data.username}`,
      });
      dataArray.push({
        title: 'Name',
        value: `${data.customer.customerDetails.firstName} ${data.customer.customerDetails.lastName}`,
      });
      dataArray.push({
        title: 'E-Mail',
        value: `${data.customer.customerDetails.email}`,
      });
      dataArray.push({
        title: 'Phone No',
        value: `${data.customer.customerDetails.phoneNo}`,
      });

      dataArray.push({
        title: 'Account Number',
        value: `${data.customer.accountNumber}`,
      });
      dataArray.push({
        title: 'Customer Id',
        value: `${data.customer.customerId}`,
      });
      return dataArray;
    }
    return [];
  }, [data]);
  return (
    <View style={{ flex: 1 }}>
      {userData.map((d, i) => {
        return (
          <View
            style={{
              backgroundColor: i % 2 == 1 ? 'transparent' : '#fff',
              padding: 10,
            }}
          >
            <Text fontSize="lg">{d.title}</Text>
            <Text>{`${d.value}`}</Text>
          </View>
        );
      })}
    </View>
  );
}
