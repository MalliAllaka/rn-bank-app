import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Gradient(props) {
  const { showGradient, style: customStyles } = props;
  if (!showGradient) {
    return (
      <View style={[styles.linearGradient, { ...customStyles }]}>
        {props.children}
      </View>
    );
  }
  return (
    <LinearGradient
      start={[0, -0.2]}
      end={[1, 0]}
      colors={["#0DCDE8", "#0DDF5B"]}
      style={[styles.linearGradient, { ...customStyles }]}
    >
      {props.children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    // width: "100%",
    // height: "100%",
  },
});
