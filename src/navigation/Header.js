/* eslint-disable no-nested-ternary */
import React from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';

import { Icon, Text } from 'native-base';
import { getHeaderTitle, useHeaderHeight } from '@react-navigation/elements';
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';
import { Feather, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';

export default function Header({
  navigation,
  route,
  options,
  setDrawerStatus,
  flexDir,
}) {
  const user = useSelector((state) => getUser(state));

  const title = getHeaderTitle(options, route.name);
  const insets = useSafeAreaInsets();
  const headerHeight = 50;
  const isDrawerOpen = useDrawerStatus() === 'open';

  React.useEffect(() => {
    setDrawerStatus(isDrawerOpen);
  }, [isDrawerOpen]);

  return (
    <>
      <View
        style={{
          height: insets.top,
          backgroundColor: '#fff',
        }}
      />
      <View
        style={{
          height: Platform.OS == 'ios' ? headerHeight - 10 : headerHeight,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: Platform.OS == 'ios' ? 'flex-start' : 'center',
          paddingHorizontal: 11,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <View style={styles.right}>
          {flexDir == 'front' ? (
            Platform.OS === 'android' ? (
              <TouchableNativeFeedback
                onPress={navigation.toggleDrawer}
                // background={TouchableNativeFeedback.Ripple(
                //   themedStyles.backgroundAlternativeColor.color,
                //   true
                // )}
              >
                <Icon
                  as={Entypo}
                  size="25px"
                  name="menu"
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                />
              </TouchableNativeFeedback>
            ) : (
              <TouchableOpacity onPress={navigation.toggleDrawer}>
                <Icon
                  as={Entypo}
                  size="25px"
                  name="menu"
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                />
              </TouchableOpacity>
            )
          ) : null}
          <Text style={styles.title} fontSize="lg">
            {`Hi ${
              user && user.customer && user.customer.customerDetails.firstName
                ? user.customer.customerDetails.firstName
                : user && user.employee && user.employee.firstName
                ? user.employee.firstName
                : ''
            }`}
          </Text>
        </View>

        <View style={styles.left}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}
          >
            <Icon
              as={Ionicons}
              size="22px"
              name="notifications-sharp"
              color="gray.400"
              _dark={{
                color: 'gray.400',
              }}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 10,
    // fontWeight: "700",
  },
});
