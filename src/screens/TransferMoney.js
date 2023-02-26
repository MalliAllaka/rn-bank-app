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
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import * as commonActions from "../actions/common";
import Gradient from "../components/Gradient";
import TextField from "../components/InputField";
import CheckBoxField from "../components/CheckBoxField";
import ErrorMessage from "../components/ErrorMessage";

import Container from "../components/Container";
import Icon from "../components/CustomIcon";
import { getCustomer } from "../actions/common";
import { useAppDispatch } from "../app/store";
import Loading from "../components/Loading";
import { getUser } from "../selector/auth";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Please enter a valid amount")
    .typeError("Please enter a valid amount"),
  remark: Yup.string().required("Please enter remarks"),
});
let initData = {
  amount: "",
  remark: "",
};

export default function TransferMoney({ route, navigation }) {
  const showBackButton = route?.params?.showBackButton;
  const customerId = route?.params?.customerId;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const user = useSelector((state) => getUser(state));

  const [customer, setCustomer] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const getData = async (customerId) => {
    setLoading(true);
    try {
      const response = await dispatch(
        getCustomer({
          customerId: customerId,
        })
      );
      const { payload } = response;

      if (payload.data) {
        setCustomer(payload.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    getData(customerId);
  }, [customerId]);

  const transferAmount = async (values, setSubmitting, resetForm) => {
    setLoading(true);
    const apiStatus = await dispatch(
      commonActions.transferAmount({
        ...values,
        depositCustomerId: user.customer.id,
        customer: {
          id: customerId,
        },
      })
    );
    const { payload } = apiStatus;
    console.log(payload);
    if (!payload.status) {
      toast.show(payload.message || "request failed ", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    } else {
      navigation.replace("TransferMoneySuccess", {
        showBackButton: true,
        transaction: payload.data,
      });
    }
    setSubmitting(false);
  };

  if (loading || customer == null) {
    return <Loading />;
  }

  return (
    <Container>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ alignSelf: "center" }}
          >
            <Icon fill="black" name="arrowleft" iconPack="AntDesign" size="6" />
          </TouchableOpacity>
        )}
        <Heading size="sm" style={{ paddingHorizontal: 10 }}>
          Transfer Money
        </Heading>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
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
              }}
            >
              <Heading size="sm" style={{ paddingVertical: 10 }}>
                Customer Details
              </Heading>
              <VStack space="4">
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ flex: 1 }}>Customer Name</Text>
                  <Text style={{ flex: 1 }}>
                    {`${customer.customerDetails.firstName} ${customer.customerDetails.lastName}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ flex: 1 }}>Account Number</Text>
                  <Text
                    style={{ flex: 1 }}
                  >{`${customer.accountNumber} `}</Text>
                </View>
              </VStack>
              <Formik
                enableReinitialize
                initialValues={initData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
                  if (user?.customer?.balance < values.amount) {
                    setErrors({
                      amount: "Insufficient Funds",
                    });
                  } else {
                    transferAmount(values, setSubmitting, resetForm);
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                }) => {
                  console.log(errors);
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignSelf: "center",
                        width: "100%",
                        marginTop: 10,
                      }}
                    >
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Heading size="sm" style={{}}>
                            Enter Transfer Amount
                          </Heading>
                          <TextField
                            style={styles.textField}
                            value={values.amount}
                            label="Amount"
                            onChangeText={handleChange("amount")}
                            onBlur={handleBlur("amount")}
                          />
                          {touched.amount && errors.amount ? (
                            <ErrorMessage data={errors.amount} />
                          ) : null}
                        </View>
                      </View>
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <TextField
                            style={styles.textField}
                            value={values.remark}
                            label="Remark"
                            onChangeText={handleChange("remark")}
                            onBlur={handleBlur("remark")}
                          />
                          {touched.remark && errors.remark ? (
                            <ErrorMessage data={errors.remark} />
                          ) : null}
                        </View>
                      </View>

                      <View style={{ marginTop: 10, marginBottom: 20 }}>
                        <TouchableOpacity onPress={handleSubmit} style={{}}>
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
                              Transfer
                            </Text>
                          </Gradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  textField: {},
});
