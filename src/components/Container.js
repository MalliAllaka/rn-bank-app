import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { useDrawerStatus } from "@react-navigation/drawer";

export default function Container(props) {
  const isDrawerOpen = useDrawerStatus() === "open";

  if (isDrawerOpen || Platform.OS !== "web") {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>{props.children}</View>
    );
  }
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <View style={{ flexDirection: "row", flex: 1 }}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
