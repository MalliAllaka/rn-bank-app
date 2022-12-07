import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Gradient from "../components/Gradient";
import Container from "../components/Container";

export default function Settings() {
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    </Container>
  );
}
