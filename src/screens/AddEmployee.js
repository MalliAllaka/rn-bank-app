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
import { Pressable, Text, useBreakpointValue, Select } from "native-base";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as commonActions from "../actions/common";
import Gradient from "../components/Gradient";
import TextField from "../components/InputField";
import CheckBoxField from "../components/CheckBoxField";
import { useAppDispatch } from "../app/store";
import ErrorMessage from "../components/ErrorMessage";
import Icon from "../components/CustomIcon";
import Container from "../components/Container";
import Loading from "../components/Loading";

var mailRegExp = /\S+@\S+\.\S+/;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Please select a account type"),
  firstName: Yup.string().required("Please enter a first name"),
  lastName: Yup.string().required("Please enter a last name"),
  age: Yup.string().required("Please enter a age"),
  address: Yup.string().required("Please enter a address"),
  country: Yup.string().required("Please enter a country name"),
  email: Yup.string()
    .matches(mailRegExp, "Please enter a valid email address")
    .required("Please enter a email address"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10)
    .required("Please enter a Phone number"),
});

const passwordSchema = Yup.object().shape({
  password: Yup.string().required("Please enter a password"),
  confirmPassword: Yup.string().required("Please enter a confirm password"),
});

export default function AddEmployee({ route }) {
  const navigation = useNavigation();
  console.log(route?.params);
  const isEdit = route?.params?.isEdit;
  const userId = route?.params?.userId;
  const passwordSchema = isEdit
    ? {}
    : {
        password: Yup.string().required("Please enter a password"),
        confirmPassword: Yup.string().required(
          "Please enter a confirm password"
        ),
      };
  const validation = Yup.object().shape({
    role: Yup.string().required("Please select a account type"),
    firstName: Yup.string().required("Please enter a first name"),
    lastName: Yup.string().required("Please enter a last name"),
    age: Yup.number().required("Please enter a age"),
    address: Yup.string().required("Please enter a address"),
    country: Yup.string().required("Please enter a country name"),
    email: Yup.string()
      .matches(mailRegExp, "Please enter a valid email address")
      .required("Please enter a email address"),
    phoneNo: Yup.string().required("Please enter a phone number"),
    ...passwordSchema,
  });

  const width = useBreakpointValue({
    base: "100%",
    md: 420,
  });
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const addEmployee = async (values) => {
    console.log(values);
    setSaving(true);
    const registrationStatus = await dispatch(
      commonActions.addEmployee({
        ...values,
        userId: userId,
      })
    );
    const { payload } = registrationStatus;
    console.log(payload);
    if (!payload.status) {
      toast.show("failed to Save Employee try again later ", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    } else {
      navigation.replace("EmployeeList");
    }
    setSaving(false);
  };

  const getData = async (userId) => {
    setLoading(true);
    try {
      const response = await dispatch(
        commonActions.getUser({
          userId: userId,
        })
      );
      const { payload } = response;

      if (payload.data) {
        setUserData(payload.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  console.log("userData", userData);

  if (loading) {
    return <Loading />;
  }

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
      <Container>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingBottom: 10 }}
          >
            <Icon fill="black" name="arrowleft" iconPack="AntDesign" size="6" />
          </TouchableOpacity>
          <Text fontSize="lg">{`${isEdit ? "Edit" : "Add"} Employee`}</Text>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1, paddingBottom: 50 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Formik
                enableReinitialize
                initialValues={{
                  password: "",
                  confirmPassword: "",
                  role: userData?.userType,
                  firstName: userData?.employee?.firstName,
                  lastName: userData?.employee?.lastName,
                  age: userData?.employee?.age,
                  address: userData?.employee?.address,
                  country: userData?.employee?.country,
                  email: userData?.employee?.email,
                  phoneNo: userData?.employee?.phoneNo,
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  addEmployee(values);
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
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        width: width,
                      }}
                    >
                      <View
                        style={{
                          flex: 3,
                          backgroundColor: "#fff",
                          borderTopLeftRadius: 40,
                          borderTopRightRadius: 40,
                          paddingTop: 20,
                          paddingHorizontal: 10,
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
                              value={values.firstName}
                              label="First Name"
                              onChangeText={handleChange("firstName")}
                              onBlur={handleBlur("firstName")}
                            />
                            {touched.firstName && errors.firstName ? (
                              <ErrorMessage data={errors.firstName} />
                            ) : null}
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.lastName}
                              label="Last Name"
                              onChangeText={handleChange("lastName")}
                              onBlur={handleBlur("lastName")}
                            />
                            {touched.lastName && errors.lastName ? (
                              <ErrorMessage data={errors.lastName} />
                            ) : null}
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.age}
                              label="Age"
                              onChangeText={handleChange("age")}
                              onBlur={handleBlur("age")}
                            />
                            {touched.age && errors.age ? (
                              <ErrorMessage data={errors.age} />
                            ) : null}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.address}
                              label="Address"
                              onChangeText={handleChange("address")}
                              onBlur={handleBlur("address")}
                            />
                            {touched.address && errors.address ? (
                              <ErrorMessage data={errors.address} />
                            ) : null}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.country}
                              label="Country"
                              onChangeText={handleChange("country")}
                              onBlur={handleBlur("country")}
                            />
                            {touched.country && errors.country ? (
                              <ErrorMessage data={errors.country} />
                            ) : null}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.email}
                              label="Email"
                              onChangeText={handleChange("email")}
                              onBlur={handleBlur("email")}
                            />
                            {touched.email && errors.email ? (
                              <ErrorMessage data={errors.email} />
                            ) : null}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.phoneNo}
                              label="Phone No"
                              onChangeText={handleChange("phoneNo")}
                            />
                            {touched.phoneNo && errors.phoneNo ? (
                              <ErrorMessage data={errors.phoneNo} />
                            ) : null}
                          </View>
                          <Select
                            selectedValue={values.role}
                            minWidth="200"
                            accessibilityLabel="Choose Role"
                            placeholder="Choose Role"
                            _selectedItem={{
                              bg: "teal.600",
                            }}
                            mt={1}
                            onValueChange={handleChange("role")}
                            onBlur={handleBlur("role")}
                          >
                            <Select.Item label="EMPLOYEE" value="EMPLOYEE" />
                            <Select.Item label="ADMIN" value="ADMIN" />
                          </Select>
                          {touched.role && errors.role ? (
                            <ErrorMessage data={errors.role} />
                          ) : null}
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.password}
                              label="Password"
                              onChangeText={handleChange("password")}
                              onBlur={handleBlur("password")}
                              password
                            />
                            {touched.password && errors.password ? (
                              <ErrorMessage data={errors.password} />
                            ) : null}
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TextField
                              style={styles.textField}
                              value={values.confirmPassword}
                              label="Confirm Password"
                              onChangeText={handleChange("confirmPassword")}
                              onBlur={handleBlur("confirmPassword")}
                              password
                            />
                            {touched.confirmPassword &&
                            errors.confirmPassword ? (
                              <ErrorMessage data={errors.confirmPassword} />
                            ) : null}
                            {values.confirmPassword != values.password ? (
                              <ErrorMessage
                                data={"confirm password is Wrong"}
                              />
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
                                Save
                              </Text>
                            </Gradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {},
});
