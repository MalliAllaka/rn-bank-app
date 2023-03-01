import React from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Alert,
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
      50: "#4F46E5",
      100: "#4F46E5",
      200: "#4F46E5",
      300: "#4F46E5",
      400: "#4F46E5",
      500: "#4F46E5",
      600: "#4F46E5",
      700: "#4F46E5",
      800: "#4F46E5",
      900: "#4F46E5",
    },
    secondary: {
      50: "#4F46E5",
      100: "#4F46E5",
      200: "#4F46E5",
      300: "#4F46E5",
      400: "#4F46E5",
      500: "#4F46E5",
      600: "#4F46E5",
      700: "#4F46E5",
      800: "#4F46E5",
      900: "#4F46E5",
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
  const [loading, setLoading] = React.useState(true);

  const checkUpdates = async () => {
    console.log("Checking for an update...");
    try {
      if (Platform.OS != "web") {
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
