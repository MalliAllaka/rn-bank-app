import React from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NativeBaseProvider, extendTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-native-toast-notifications";

import App from "./app/App";
import { persistor, store } from "./app/store";

const extraFontSize = Platform.OS == "web" ? 6 : 0;
const theme = extendTheme({
  fontConfig: {
    Nunito: {
      100: {
        normal: "Nunito-Light",
        italic: "Nunito-LightItalic",
      },
      200: {
        normal: "Nunito-Light",
        italic: "Nunito-LightItalic",
      },
      300: {
        normal: "Nunito-Light",
        italic: "Nunito-LightItalic",
      },
      400: {
        normal: "Nunito-Regular",
        italic: "Nunito-Italic",
      },
      500: {
        normal: "Nunito-Medium",
      },
      600: {
        normal: "Nunito-Medium",
        italic: "Nunito-MediumItalic",
      },
      700: {
        normal: "Nunito-Bold",
      },
      800: {
        normal: "Nunito-Bold",
        italic: "Nunito-BoldItalic",
      },
      900: {
        normal: "Nunito-Bold",
        italic: "Nunito-BoldItalic",
      },
    },
  },

  fonts: {
    heading: "Nunito",
    body: "Nunito",
    mono: "Nunito",
  },
  colors: {
    // Add new color
    primary: {
      50: "#0DCDE8",
      100: "#0DCDE8",
      200: "#0DCDE8",
      300: "#0DCDE8",
      400: "#0DCDE8",
      500: "#0DCDE8",
      600: "#0DCDE8",
      700: "#0DCDE8",
      800: "#0DCDE8",
      900: "#0DCDE8",
    },
    secondary: {
      50: "#1A9BEF",
      100: "#1A9BEF",
      200: "#1A9BEF",
      300: "#1A9BEF",
      400: "#1A9BEF",
      500: "#1A9BEF",
      600: "#1A9BEF",
      700: "#1A9BEF",
      800: "#1A9BEF",
      900: "#1A9BEF",
    },
  },
  fontSizes: {
    "2xs": 10 + extraFontSize,
    xs: 12 + extraFontSize,
    sm: 14 + extraFontSize,
    md: 16 + extraFontSize,
    lg: 18 + extraFontSize,
    xl: 20 + extraFontSize,
    "2xl": 24 + extraFontSize,
    "3xl": 30 + extraFontSize,
    "4xl": 36 + extraFontSize,
    "5xl": 48 + extraFontSize,
    "6xl": 60 + extraFontSize,
    "7xl": 72 + extraFontSize,
    "8xl": 96 + extraFontSize,
    "9xl": 128 + extraFontSize,
  },
});
const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default function index() {
  const [loading, setLoading] = React.useState(false);

  const checkUpdates = async () => {
    console.log("Checking for an update...");
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        console.log("An update was found, downloading...");
        const fetchedUpdate = await Updates.fetchUpdateAsync();
        if (fetchedUpdate.isNew) {
          Alert.alert(
            "Update",
            "New update is available , restart is required.",
            [
              {
                text: "Accept",
                onPress: () => {
                  Updates.reloadAsync();
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          console.log("No New updates");
        }
      } else {
        console.log("No updates");
      }
    } catch (e) {
      console.log("Failed to Check Update", e);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    checkUpdates();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <ToastProvider
              duration={2000}
              animationType="slide-in"
              animationDuration={250}
              offsetTop={35}
              textStyle={{ textAlign: "center" }}
            >
              <NativeBaseProvider theme={theme} config={config}>
                <App />
              </NativeBaseProvider>
            </ToastProvider>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
