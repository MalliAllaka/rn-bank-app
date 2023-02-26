import * as React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Text, VStack, Divider, Button, Heading } from "native-base";
import { useToast } from "react-native-toast-notifications";

import Container from "../components/Container";
import Icon from "../components/CustomIcon";

export default function TransferMoneySuccess({ route, navigation }) {
  const showBackButton = route?.params?.showBackButton;
  const transaction = route?.params?.transaction;
  console.log(transaction);
  const toast = useToast();
  React.useEffect(() => {
    if (!transaction) {
      navigation.pop();
    }
  }, []);
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          {showBackButton && (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon
                fill="black"
                name="arrowleft"
                iconPack="AntDesign"
                size="6"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Heading
            size="sm"
            style={{ marrginVertical: 10, alignSelf: "center" }}
          >
            Send Money
          </Heading>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 3,
              backgroundColor: "#fff",
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 5,
              alignItems: "center",
            }}
          >
            <Icon
              fill="#00FF00"
              name="checkcircle"
              iconPack="AntDesign"
              size={50}
            />
            <Heading size="sm" style={{ marrginVertical: 10 }}>
              Success
            </Heading>

            <Heading size="sm" style={{ marginVertical: 10 }}>
              {`You're successfully sent `}
              <Icon fill="#000" name="rupee" iconPack="fontawesome" size={4} />
              {` ${transaction.amount}`} to Account No.
              {` ${transaction.customer.accountNumber}`}
            </Heading>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  textField: {},
});
