import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Box, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export default function Employee(props) {
  const { user } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AddEmployee", {
          userId: user.id,
          isEdit: true,
        })
      }
      style={{ marginVertical: 5 }}
    >
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
              {`${user?.employee?.firstName} ${user?.employee?.lastName}`}
            </Text>
            <Text
              style={styles.whiteColor}
            >{`${user?.employee?.phoneNo} `}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={[{ textAlign: "center", fontSize: 16 }, styles.whiteColor]}
            >
              {`${user?.username}`}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 16 }}></Text>
          </View>
        </View>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  whiteColor: {
    color: "#ffffff",
  },
});
