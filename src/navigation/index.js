import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import DrawerNavigator from './DrawerNavigator';
import Login from '../screens/authentication/Login';
import { getToken } from '../selector/auth';
import Register from '../screens/authentication/Register';
import UserDetails from '../screens/UserDetails';

const Stack = createStackNavigator();

export default function index() {
  const token = useSelector((state) => getToken(state));

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          ) : (
            <Stack.Screen
              name="authenticationRoutes"
              component={AuthenticationRoutes}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const AuthStack = createStackNavigator();

const AuthenticationRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          title: 'Registration',
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
        }}
        initialParams={{
          fromAdmin: false,
        }}
      />
      <AuthStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: true,
          title: 'User Details',
        }}
      />
    </AuthStack.Navigator>
  );
};
