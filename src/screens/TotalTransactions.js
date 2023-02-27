import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { VStack, Box, Divider, Text, Heading, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { TextInputMask } from "react-native-masked-text";
import moment from "moment";
import { getUser } from "../selector/auth";
import Container from "../components/Container";
import Transaction from "../components/Transaction";
import Icon from "../components/CustomIcon";
import { getTransactions } from "../actions/common";
import { useAppDispatch } from "../app/store";
import Gradient from "../components/Gradient";
import { getCommonData } from "../selector/common";

export default function TotalTransactions({ route, navigation }) {
  const customerId = route?.params?.customerId;
  const name = route?.params?.name;

  const showBackButton = route?.params?.showBackButton;
  const dispatch = useAppDispatch();
  const common = useSelector((state) => getCommonData(state));

  const { baseUrl } = common;

  const [pageNumber, setPageNumber] = React.useState(0);
  const [loadMore, setLoadMore] = React.useState(true);
  const [transactionData, setTransactionData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [startDate, setStartDate] = React.useState(
    moment().format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = React.useState(moment().format("DD/MM/YYYY"));

  const getData = async (currentPage) => {
    setLoading(true);
    try {
      const response = await dispatch(
        getTransactions({
          pageNumber: currentPage,
          pageSize: 15,
          customerId: customerId,
          startDate: startDate,
          endDate: endDate,
        })
      );
      const { payload } = response;

      if (payload.data.length > 0) {
        setPageNumber(currentPage + 1);
        if (currentPage == 0) {
          setTransactionData(payload.data);
        } else {
          setTransactionData(transactionData.concat(payload.data));
        }
      } else {
        if(currentPage == 0) {
          setTransactionData([]);
        }
        setLoadMore(false);
      }
    } catch (error) {

    }
    setLoading(false);
  };

  React.useEffect(() => {
    setPageNumber(0);
    getData(0);
  }, [customerId]);

  return (
    <ScrollView>
      <Container>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingBottom: 10 }}
          >
            <Icon fill="black" name="arrowleft" iconPack="AntDesign" size="6" />
          </TouchableOpacity>
        )}
        <Heading size="sm" style={{ paddingVertical: 10 }}>
          Total Transactions {`${name ? "of " + name : ""}`}
        </Heading>

        <View
          style={{
            flexDirection: Platform.OS == "web" ? "row" : "column",
            justifyContent: "space-between",
          }}
        >
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            placeholder="DD/MM/YYYY"
            value={endDate}
            onChangeText={(text) => {
              setEndDate(text);
            }}
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              height: 45,
              paddingHorizontal: 5,
            }}
          />
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={startDate}
            onChangeText={(text) => {
              setStartDate(text);
            }}
            placeholder="DD/MM/YYYY"
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              height: 45,
              paddingHorizontal: 5,
              marginVertical: Platform.OS == "web" ? 0 : 5,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (startDate != "" && endDate != "") {
                setPageNumber(0);
                getData(0);
              }
            }}
            style={{}}
          >
            <Gradient
              showGradient={startDate == "" || endDate == "" ? false : true}
              style={{
                height: 42,
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 10,
                paddingHorizontal: 10,
                backgroundColor: "grey",
              }}
            >
              <Text
                bold
                fontSize="md"
                color={"white"}
                style={{ textAlign: "center" }}
              >
                Search
              </Text>
            </Gradient>
          </TouchableOpacity>
        </View>
        <Pressable
          style={{
            alignSelf: "flex-end",
            padding: 10,
          }}
          onPress={() =>
            Linking.openURL(
              `${baseUrl}/transactions/findbyCustomerId/export?pageNumber=${pageNumber-1}&pageSize=15&customerId=${customerId}&startDate=${startDate}&endDate=${endDate}`
            )
          }
        >
          <Icon fill="#FF0000" name="pdffile1" iconPack="AntDesign" size="6" />
        </Pressable>
        <FlatList
          contentContainerStyle={{
            marginBottom: 40,
          }}
          data={transactionData}
          extraData={transactionData}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Transaction transaction={item} />}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center" }}>No Data</Text>
          )}
          onRefresh={() => {
            setLoadMore(true);
            setPageNumber(0);
            getData(0);
          }}
          onEndReached={() => {
            if (loadMore) {
              getData(pageNumber);
            }
          }}
        />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
