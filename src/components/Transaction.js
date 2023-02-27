import React from "react";
import { StyleSheet, View } from "react-native";
import { Box, Text } from "native-base";
import moment from "moment";
import Icon from "./CustomIcon";

export default function Transaction(props) {
  const { transaction } = props;

  return (
    <Box bg="secondary.100" rounded="xl" style={{ marginVertical: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={styles.whiteColor} bold>
            {`${
              transaction?.date
                ? moment(transaction?.date).format("DD MMM YYYY")
                : ""
            }`}
          </Text>
          <Text
            style={styles.whiteColor}
          >{`${transaction?.from} / ${transaction?.method}`}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Icon fill="#ffffff" name="rupee" iconPack="fontawesome" />
          <Text
            style={[{ textAlign: "center", fontSize: 16 }, styles.whiteColor]}
          >{`${transaction?.amount}`}</Text>
          <Text
            style={{ textAlign: "center", paddingLeft: 5, fontSize: 16 }}
            color={transaction?.type == "Withdraw" ? "#ffffff" : "#ffffff"}
            //   color="red.500"
          >
            {`${transaction?.type == "Withdraw" ? "DR" : "CR"}`}
          </Text>
        </View>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  whiteColor: {
    color: "#ffffff",
  },
});
