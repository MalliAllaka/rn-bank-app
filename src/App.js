import React from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";

import Navigation from "./navigation";

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
});

export default function index() {
  console.log("index");
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider theme={theme}>
        <Navigation />
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
