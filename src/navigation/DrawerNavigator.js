import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions, Platform } from "react-native";
import { useBreakpointValue } from "native-base";
import TabNavigation from "./TabNavigation";
import Header from "./Header";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props) {
  const dimensions = useWindowDimensions();
  const [drawerStatus, setDrawerStatus] = React.useState(true);
  const flexDir = useBreakpointValue({
    base: "front",
    lg: "permanent",
  });

  return (
    <Drawer.Navigator
      // defaultStatus={Platform.OS == "web" ? "open" : "closed"}
      initialRouteName={"Tabs"}
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <Header {...props} setDrawerStatus={setDrawerStatus} />
        ),
        drawerType: flexDir,
      }}
      drawerContent={(props) => {
        return <DrawerContent {...props} />;
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigation} />

      <Drawer.Screen name="Setting" component={TabNavigation} />
    </Drawer.Navigator>
  );
}
