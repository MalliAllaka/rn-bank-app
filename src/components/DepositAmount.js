import * as React from 'react';
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
} from 'react-native';
import { Pressable, Text, useBreakpointValue, Select } from 'native-base';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as commonActions from '../actions/common';
import Gradient from './Gradient';
import TextField from './InputField';
import CheckBoxField from './CheckBoxField';
import { useAppDispatch } from '../app/store';
import ErrorMessage from './ErrorMessage';

var mailRegExp = /\S+@\S+\.\S+/;

const validationSchema = Yup.object().shape({
  amount: Yup.string().required('Please enter a amount'),
  method: Yup.string().required('Please enter a payment method'),
  depositor: Yup.string().required('Please select a depositor Name'),
});
let initData = {
  amount: '',
  method: '',
  depositor: '',
};
initData = {
  amount: '',
  method: '',
  depositor: '',
};

export default function DepositAmount(props) {
  const deposite = () => {};
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          enableReinitialize
          initialValues={initData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            deposite(values);
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
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flex: 3,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingTop: 20,
                    paddingHorizontal: 5,
                  }}
                >
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <TextField
                        style={styles.textField}
                        value={values.amount}
                        label="Amount"
                        onChangeText={handleChange('amount')}
                        onBlur={handleBlur('amount')}
                      />
                      {touched.amount && errors.amount ? (
                        <ErrorMessage data={errors.amount} />
                      ) : null}
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <TextField
                        style={styles.textField}
                        value={values.method}
                        label="Payment Method"
                        onChangeText={handleChange('method')}
                        onBlur={handleBlur('method')}
                      />
                      {touched.method && errors.method ? (
                        <ErrorMessage data={errors.method} />
                      ) : null}
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <TextField
                        style={styles.textField}
                        value={values.depositor}
                        label="Depositor Name"
                        onChangeText={handleChange('depositor')}
                        onBlur={handleBlur('depositor')}
                      />
                      {touched.depositor && errors.depositor ? (
                        <ErrorMessage data={errors.depositor} />
                      ) : null}
                    </View>
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <TouchableOpacity onPress={handleSubmit} style={{}}>
                      <Gradient
                        showGradient
                        style={{
                          height: 42,
                          width: '65%',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          borderRadius: 20,
                          marginVertical: 20,
                        }}
                      >
                        <Text
                          bold
                          fontSize="md"
                          color={'white'}
                          style={{ textAlign: 'center' }}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textField: {},
});
