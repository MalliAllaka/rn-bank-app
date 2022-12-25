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
import {
  Pressable,
  Text,
  useBreakpointValue,
  Select,
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from 'native-base';

import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { getUser } from '../selector/auth';
import * as commonActions from '../actions/common';
import Gradient from '../components/Gradient';
import TextField from '../components/InputField';
import { useAppDispatch } from '../app/store';
import ErrorMessage from '../components/ErrorMessage';
import Container from '../components/Container';
import { setUserToken, setLoginDetails } from '../reducers/auth';

var mailRegExp = /\S+@\S+\.\S+/;

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Please enter a password'),
  password: Yup.string().required('Please enter a password'),
  confirmPassword: Yup.string().required('Please enter a confirm password'),
});

export default function Settings({ route }) {
  const navigation = useNavigation();
  const user = useSelector((state) => getUser(state));

  const width = useBreakpointValue({
    base: '100%',
    md: 420,
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const updatePassword = async (values, actions) => {
    console.log(values);
    setSaving(true);
    const status = await dispatch(
      commonActions.updatePassword({
        ...values,
        id: user.id,
      })
    );
    const { payload } = status;
    toast.show(payload.message, {
      type: !payload.status ? 'danger' : 'c',
      placement: 'top',
      duration: 4000,
      offset: 30,
      animationType: 'slide-in',
    });

    setSaving(false);
    if (payload.status) {
      actions.resetForm();
      setShowModal(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: '100%',
      }}
    >
      <Container>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Formik
                enableReinitialize
                initialValues={{
                  currentPassword: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={passwordSchema}
                onSubmit={(values, actions) => {
                  updatePassword(values, actions);
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
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        width: width,
                      }}
                    >
                      <View
                        style={{
                          flex: 3,
                          backgroundColor: '#fff',
                          borderTopLeftRadius: 40,
                          borderTopRightRadius: 40,
                          paddingTop: 20,
                          paddingHorizontal: 25,
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
                              value={values.currentPassword}
                              label="Current Password"
                              onChangeText={handleChange('currentPassword')}
                              onBlur={handleBlur('currentPassword')}
                              password
                            />
                            {touched.currentPassword &&
                            errors.currentPassword ? (
                              <ErrorMessage data={errors.currentPassword} />
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
                              value={values.password}
                              label="Password"
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              password
                            />
                            {touched.password && errors.password ? (
                              <ErrorMessage data={errors.password} />
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
                              value={values.confirmPassword}
                              label="Confirm Password"
                              onChangeText={handleChange('confirmPassword')}
                              onBlur={handleBlur('confirmPassword')}
                              password
                            />
                            {touched.confirmPassword &&
                            errors.confirmPassword ? (
                              <ErrorMessage data={errors.confirmPassword} />
                            ) : null}
                            {values.confirmPassword != values.password ? (
                              <ErrorMessage
                                data={'confirm password is Wrong'}
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
        </ScrollView>
      </Container>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Reload Required</Modal.Header>

          <Modal.Footer>
            <Button
              onPress={() => {
                dispatch(setUserToken(''));
                dispatch(setLoginDetails({}));
              }}
            >
              Reload
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {},
});
