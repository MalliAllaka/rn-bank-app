import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Text } from "native-base";
import { Feather, AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import Gradient from "../components/Gradient";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  console.log("TabNavigation");
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ label: "home", iconName: "home", iconPack: Entypo }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          label: "setting",
          iconName: "stats-chart-outline",
          iconPack: Ionicons,
        }}
      />
      <Tab.Screen
        name="Home2"
        component={Home}
        options={{ label: "home", iconName: "home", iconPack: Entypo }}
      />
      <Tab.Screen
        name="Settings2"
        component={Settings}
        options={{
          label: "setting",
          iconName: "stats-chart-outline",
          iconPack: Ionicons,
        }}
      />
      <Tab.Screen
        name="Home3"
        component={Home}
        options={{ label: "home", iconName: "home", iconPack: Entypo }}
      />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        justifyContent: "space-evenly",
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        // borderTopColor: "#000",
        // borderTopWidth: StyleSheet.hairlineWidth,
        elevation: 20,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 10 },
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: "100%",
              marginHorizontal: 5,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              bottom: 7,
              overflow: "hidden",
            }}
          >
            <Gradient
              showGradient={isFocused}
              style={{
                justifyContent: "center",
                flex: 1,
                height: "100%",
                width: "100%",
                alignItems: "center",
                paddingTop: 7,
              }}
            >
              <Icon
                as={options.iconPack}
                size="20px"
                name={options.iconName}
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              />
              <Text
                style={{
                  color: isFocused ? "#222" : "#222",
                  textAlign: "center",
                }}
              >
                {options.label}
              </Text>
            </Gradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
