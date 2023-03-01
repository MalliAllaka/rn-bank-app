import * as React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Pressable, Text, useBreakpointValue } from "native-base";
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import * as authApi from "../../actions/auth";
import Gradient from "../../components/Gradient";
import TextField from "../../components/InputField";
import CheckBoxField from "../../components/CheckBoxField";
import { useAppDispatch } from "../../app/store";
import ChangeUrl from "../../components/ChangeUrl";
import { api } from "../../utils/api";
import HomeWeb from "./Home";

export default function Login() {
  const navigation = useNavigation();
  const width = useBreakpointValue({
    base: "100%",
    md: 420,
  });
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("1234");
  const [loading, setLoading] = React.useState(false);

  const [showLogin, setShowLogin] = React.useState(false);

  const doLogin = async () => {
    console.log("before login dispatch");

    setLoading(true);
    const loginStatus = await dispatch(
      authApi.doLogin({
        username: username,
        password: password,
      })
    );
    const { payload } = loginStatus;

    if (!payload) {
      toast.show(
        `You have entered an invalid username or password ${api?.defaults?.baseURL}`,
        {
          type: "danger",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        }
      );
    }
    setLoading(false);
  };
  if (!showLogin) {
    return <HomeWeb setShowLogin={setShowLogin} />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <ChangeUrl />

        <View
          style={{
            height:
              Dimensions.get("window").height - insets.top - insets.bottom,
            paddingHorizontal: 20,
            width,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              height: Dimensions.get("window").height * 0.42,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text fontSize="2xl" color={"black"}>
              Welcome to Online Bank
            </Text>
          </View>

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
                label="Username"
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
          </View>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity onPress={doLogin} style={{}}>
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

            {/* <Text style={{ textAlign: 'center' }} color="primary.400">
              Forgot Password?
            </Text> */}
          </View>
          <View style={{ justifyContent: "center", marginTop: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Are you new to Online Bank?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ textAlign: "center" }} color="primary.400">
                Create an Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textField: {
    paddingBottom: 20,
  },
});
