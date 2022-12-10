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

export default function Header({
  navigation,
  route,
  options,
  setDrawerStatus,
}) {
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
          {Platform.OS === 'android' ? (
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
          )}
          <Text style={styles.title} fontSize="lg">
            Online Bank
          </Text>
        </View>

        <View style={styles.left}>
          <Icon
            as={Ionicons}
            size="22px"
            name="notifications-sharp"
            color="gray.400"
            _dark={{
              color: 'gray.400',
            }}
          />
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
