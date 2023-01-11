import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Text, Input, Pressable, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const TextField = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    height = 50,
    fontSize = 16,
    color = "#000",
    borderColor = "transparent",
    labelBackgroundColor = "#ffffff",
    password = false,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = React.useState(false);

  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  return (
    <View style={[{ paddingTop: 10, ...style }]}>
      <View style={{ height: height }}>
        <Input
          autoCapitalize="none"
          size="md"
          borderColor={!!value || isFocused ? "secondary.400" : "muted.400"}
          _focus={{
            borderColor: !!value || isFocused ? "secondary.400" : "muted.400",
            backgroundColor: "#fff",
          }}
          style={[
            styles.input,
            {
              backgroundColor: "#fff",
              height: height * 0.9,
            },
          ]}
          ref={inputRef}
          {...restOfProps}
          value={value}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          type={password ? (show ? "text" : "password") : "text"}
          InputRightElement={
            password ? (
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            ) : null
          }
        />

        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                backgroundColor: labelBackgroundColor,
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.75],
                    }),
                  },
                  {
                    translateY: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [(height - 16) * 0.4, -12],
                    }),
                  },
                  {
                    translateX: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [8, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text
              color={!!value || isFocused ? "secondary.400" : "muted.400"}
              style={{
                fontSize,
              }}
            >
              {label}
              {errorText ? "*" : ""}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 5,
    borderRadius: 4,
  },
  labelContainer: {
    position: "absolute",
    paddingHorizontal: 8,
  },

  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: "#B00020",
  },
});

export default TextField;
