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
} from "react-native";
import {
  Pressable,
  Text,
  useBreakpointValue,
  Select,
  Heading,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import * as commonActions from "../actions/common";
import Gradient from "../components/Gradient";
import TextField from "../components/InputField";
import CheckBoxField from "../components/CheckBoxField";
import { useAppDispatch } from "../app/store";
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/Container";
import { getUser } from "../selector/auth";

var mailRegExp = /\S+@\S+\.\S+/;

const validationSchema = Yup.object().shape({
  accountNo: Yup.number()
    .required("Please enter a valid account no")
    .typeError("Please enter a valid account no"),
});
let initData = {
  accountNo: "10001",
};

export default function TransferAccountVerification(props) {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [customer, setCustomer] = React.useState(null);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const user = useSelector((state) => getUser(state));

  const verifyAccount = async (values, setSubmitting, resetForm, setErrors) => {
    setLoading(true);
    const apiStatus = await dispatch(
      commonActions.verifyAccount({
        ...values,
      })
    );
    const { payload } = apiStatus;
    console.log(payload);
    if (!payload.status) {
      setCustomer(null);

      toast.show(payload.message || "request failed ", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    } else {
      if (!payload.data) {
        setErrors({
          accountNo: "Account Not Found ",
        });
      } else {
        navigation.navigate("TransferMoney", {
          showBackButton: true,
          customerId: payload.data.id,
        });
        // toast.show('request done successfully ', {
        //   type: 'success',
        //   placement: 'top',
        //   duration: 4000,
        //   offset: 30,
        //   animationType: 'slide-in',
        // });
        resetForm(initData);
      }
    }
    setSubmitting(false);
    setLoading(false);
  };
  return (
    <Container>
      <Heading size="sm" style={{ paddingVertical: 10 }}>
        Account Verification
      </Heading>
      <ScrollView>
        <Formik
          enableReinitialize
          initialValues={initData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
            if (
              String(user?.customer?.accountNumber) == values.accountNo.trim()
            ) {
              setErrors({
                accountNo: "Please enter a valid account no",
              });
            } else {
              verifyAccount(values, setSubmitting, resetForm, setErrors);
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
                }}
              >
                <View
                  style={{
                    flex: 3,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    paddingTop: 20,
                    paddingHorizontal: 5,
                  }}
                >
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <TextField
                        style={styles.textField}
                        value={values.accountNo}
                        label="Account No"
                        onChangeText={handleChange("accountNo")}
                        onBlur={handleBlur("accountNo")}
                      />
                      {touched.accountNo && errors.accountNo ? (
                        <ErrorMessage data={errors.accountNo} />
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
                          Verify & Continue
                        </Text>
                      </Gradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  textField: {},
});
