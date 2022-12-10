import React, { useEffect, useCallback } from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import Index from './src';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
    'Nunito-BlackItalic': require('./assets/fonts/Nunito-BlackItalic.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('./assets/fonts/Nunito-ExtraBoldItalic.ttf'),
    'Nunito-ExtraLight': require('./assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('./assets/fonts/Nunito-ExtraLightItalic.ttf'),
    'Nunito-Italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
    'Nunito-LightItalic': require('./assets/fonts/Nunito-LightItalic.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-MediumItalic': require('./assets/fonts/Nunito-MediumItalic.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('./assets/fonts/Nunito-SemiBoldItalic.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Index />
    </View>
  );
}

// import React, { useEffect, useCallback } from "react";
// import "react-native-gesture-handler";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import Index from "./src/App";

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     "Nunito-Black": require("./assets/fonts/Nunito-Black.ttf"),
//     "Nunito-BlackItalic": require("./assets/fonts/Nunito-BlackItalic.ttf"),
//     "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
//     "Nunito-BoldItalic": require("./assets/fonts/Nunito-BoldItalic.ttf"),
//     "Nunito-ExtraBold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
//     "Nunito-ExtraBoldItalic": require("./assets/fonts/Nunito-ExtraBoldItalic.ttf"),
//     "Nunito-ExtraLight": require("./assets/fonts/Nunito-ExtraLight.ttf"),
//     "Nunito-ExtraLightItalic": require("./assets/fonts/Nunito-ExtraLightItalic.ttf"),
//     "Nunito-Italic": require("./assets/fonts/Nunito-Italic.ttf"),
//     "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
//     "Nunito-LightItalic": require("./assets/fonts/Nunito-LightItalic.ttf"),
//     "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
//     "Nunito-MediumItalic": require("./assets/fonts/Nunito-MediumItalic.ttf"),
//     "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
//     "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
//     "Nunito-SemiBoldItalic": require("./assets/fonts/Nunito-SemiBoldItalic.ttf"),
//   });

//   useEffect(() => {
//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }
//     prepare();
//   }, []);

//   const onLayoutRootView = async () => {
//     if (fontsLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   };

//   useEffect(() => {
//     onLayoutRootView();
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }
//   return <Index />;
// }
