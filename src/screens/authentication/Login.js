import * as React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { Pressable, Text, useBreakpointValue } from "native-base";

import { useNavigation } from "@react-navigation/native";

import Gradient from "../../components/Gradient";
import TextField from "../../components/InputField";
import CheckBoxField from "../../components/CheckBoxField";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigation();
  const width = useBreakpointValue({
    base: "100%",
    md: 420,
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#fff",
          alignSelf: "center",
          width: width,
        }}
      >
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Text fontSize="2xl" color={"black"}>
            Welcome to Online Bank
          </Text>
        </View>

        <View
          style={{
            flex: 3,
            backgroundColor: "#fff",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: 20,
            paddingHorizontal: 25,
          }}
        >
          <Text fontSize="xl" style={{ paddingVertical: 5 }}>
            Sign In
          </Text>
          <View style={{}}>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <TextField
                style={styles.textField}
                value={username}
                label="Email Address"
                onChangeText={(text) => setUsername(text)}
              />
              <TextField
                style={styles.textField}
                value={password}
                label="Password"
                onChangeText={(text) => setPassword(text)}
                password
              />
            </View>

            <CheckBoxField />
          </View>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                console.log("pressed!");
                navigation.navigate("DrawerNavigator");
              }}
              style={{}}
            >
              <Gradient
                showGradient
                style={{
                  height: 42,
                  width: "65%",
                  alignSelf: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  marginVertical: 20,
                }}
              >
                <Text
                  bold
                  fontSize="md"
                  color={"white"}
                  style={{ textAlign: "center" }}
                >
                  Sign In
                </Text>
              </Gradient>
            </TouchableOpacity>

            <Text style={{ textAlign: "center" }} color="primary.400">
              Forgot Password?
            </Text>
          </View>
          <View style={{ justifyContent: "center", marginTop: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Are you new to Online Bank?
            </Text>
            <Text style={{ textAlign: "center" }} color="primary.400">
              Create an Account
            </Text>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    paddingBottom: 20,
  },
});
