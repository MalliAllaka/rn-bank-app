import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  BackHandler,
  AppState,
  Platform,
  Alert,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAppState } from '@react-native-community/hooks';
import { useSelector } from 'react-redux';

import Navigation from '../navigation';
import * as authApi from '../actions/auth';
import { useAppDispatch } from '../app/store';

export default function App() {
  const dispatch = useAppDispatch();
  const currentAppState = useAppState();
  const auth = useSelector((state) => state.auth);

  const [loading, setLoading] = React.useState(true);
  const [verifyLocalAuthenticationStatus, setVerifyLocalAuthenticationStatus] =
    React.useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localAuthenticationStatus, setLocalAuthenticationStatus] =
    useState(false);

  const localAuthenticationMethod = async () => {
    setIsAuthenticated(true);
    try {
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
      let isAuthenticationMethodAvailble = false;
      if (isBiometricAvailable) {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (savedBiometrics) {
          isAuthenticationMethodAvailble = true;
          LocalAuthentication.authenticateAsync().then((result) => {
            console.log('result called ' + JSON.stringify(result));
            setIsAuthenticated(false);
            if (result.success) {
              setLocalAuthenticationStatus(true);
            } else {
              BackHandler.exitApp();
              setLocalAuthenticationStatus(false);
            }
          });
        }
      }
      if (!isAuthenticationMethodAvailble) {
        setLocalAuthenticationStatus(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (
      currentAppState == 'active' &&
      !localAuthenticationStatus &&
      !isAuthenticated &&
      verifyLocalAuthenticationStatus
    ) {
      //   localAuthenticationMethod();
    }
  }, [currentAppState]);

  const verifyLogin = async () => {
    if (auth.loginDetails && auth.loginDetails.username) {
      setLoading(true);
      console.log('called');

      const verifyStatus = await dispatch(authApi.doLogin(auth.loginDetails));
      console.log('called end');

      const { payload } = verifyStatus;
      if (payload) {
        setVerifyLocalAuthenticationStatus(true);
        // localAuthenticationMethod();
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    verifyLogin();
  }, []);

  if (loading) {
    return (
      <>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'#000'} />
        </View>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      </>
    );
  }

  if (!localAuthenticationStatus && verifyLocalAuthenticationStatus && false) {
    return (
      <>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'#000'} />
        </View>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
