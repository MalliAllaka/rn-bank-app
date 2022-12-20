import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions, Platform } from 'react-native';
import { useBreakpointValue } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import Header from './Header';
import DrawerContent from './DrawerContent';
import Login from '../screens/authentication/Login';
import TotalTransactions from '../screens/TotalTransactions';
import Notification from '../screens/Notification';
import Settings from '../screens/Settings';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import CustomerList from '../screens/CustomerList';
import AccountDetails from '../screens/AccountDetails';
import CustomerDetails from '../screens/CustomerDetails';
import EmployeeList from '../screens/EmployeeList';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props) {
  const user = useSelector((state) => getUser(state));

  const dimensions = useWindowDimensions();
  const [drawerStatus, setDrawerStatus] = React.useState(true);
  const flexDir = useBreakpointValue({
    base: 'front',
    lg: 'permanent',
  });

  return (
    <Drawer.Navigator
      // defaultStatus={Platform.OS == "web" ? "open" : "closed"}
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
      {user.userType == 'CUSTOMER' ? (
        <Drawer.Screen
          name="HomeTab"
          component={TabNavigation}
          options={{ title: 'Home', icon: 'home-outline', pack: 'ionicons' }}
        />
      ) : null}
      {user.userType == 'CUSTOMER' ? (
        <Drawer.Screen
          name="Transactions"
          component={TotalTransactions}
          options={{
            title: 'Transactions',
            icon: 'list',
            pack: 'Feather',
          }}
          initialParams={{
            showBackButton: false,
            customerId: user?.customer?.id,
            name: `${user?.customer.customerDetails.firstName} ${user?.customer.customerDetails.lastName}`,
          }}
        />
      ) : null}
      {user.userType == 'CUSTOMER' ? (
        <Drawer.Screen
          name="CustomerRoutes"
          component={CustomerRoutes}
          options={{ title: 'Customers', icon: 'users', pack: 'Feather' }}
        />
      ) : null}

      {user.userType == 'CUSTOMER' ? (
        <Drawer.Screen
          name="EmployeeRoutes"
          component={EmployeeRoutes}
          options={{ title: 'Employee', icon: 'users', pack: 'Feather' }}
        />
      ) : null}

      <Drawer.Screen
        name="Setting"
        component={Settings}
        options={{ title: 'Setting', icon: 'setting', pack: 'AntDesign' }}
      />
    </Drawer.Navigator>
  );
}

const CustomerStack = createStackNavigator();

const CustomerRoutes = () => {
  return (
    <CustomerStack.Navigator>
      <CustomerStack.Screen
        name="CustomerList"
        component={CustomerList}
        options={{
          headerShown: false,
        }}
      />
      <CustomerStack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{
          headerShown: false,
        }}
      />
      <CustomerStack.Screen
        name="CustomerTransactions"
        component={TotalTransactions}
        options={{
          headerShown: false,
        }}
      />
    </CustomerStack.Navigator>
  );
};

const EmployeeStack = createStackNavigator();

const EmployeeRoutes = () => {
  return (
    <EmployeeStack.Navigator>
      <EmployeeStack.Screen
        name="EmployeeList"
        component={EmployeeList}
        options={{
          headerShown: false,
        }}
      />
      <EmployeeStack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{
          headerShown: false,
        }}
      />
      <EmployeeStack.Screen
        name="CustomerTransactions"
        component={TotalTransactions}
        options={{
          headerShown: false,
        }}
      />
    </EmployeeStack.Navigator>
  );
};
