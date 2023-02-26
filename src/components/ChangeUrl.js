import React from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { Modal, Button, HStack } from "native-base";

import TextField from "./InputField";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { apiBaseUrl, setBaseUrl } from "../utils/api";
import { getCommonData } from "../selector/common";
import { useAppDispatch } from "../app/store";
import { updateBaseUrl } from "../reducers/common";
import Icon from "./CustomIcon";

export default function ChangeUrl({ closeModal }) {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const common = useSelector((state) => getCommonData(state));

  const { baseUrl } = common;

  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(baseUrl);
  }, [common]);

  return (
    <>
      <HStack
        space="4"
        justifyContent="flex-end"
        alignItems="center"
        style={{ paddingHorizontal: 10 }}
      >
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Icon fill="black" name="questioncircle" iconPack="AntDesign" />
        </Pressable>
      </HStack>

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Change Api</Modal.Header>
          <Modal.Body>
            <View style={[styles.container]}>
              <TextField
                placeholder="Place api url"
                value={value}
                onChangeText={(nextValue) => setValue(nextValue)}
                style={{ flex: 1 }}
              />
            </View>
            <Button
              onPress={() => {
                dispatch(updateBaseUrl(value));
                setBaseUrl(value);
                setModalVisible(!modalVisible);
              }}
            >
              Save
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
  },
});
