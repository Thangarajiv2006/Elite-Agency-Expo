import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { color } from "../../constants/colors";

const FormField = ({
  title,
  titleStyle,
  placeHolders,
  handleInput,
  inputStyle,
  inputType,
  value,
  error,
}) => {
  const [isfocus, setIsFocus] = useState(false);
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        marginTop: 10,
        position: "relative",
        ...inputStyle,
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: value || isfocus ? -5 : 19,
          left: 15,
          backgroundColor: color.secondaryColors.inputBackground,
        }}
      >
        <Text
          style={{
            color: isfocus
              ? color.additionalColors.focusRing
              : color.primaryColors.secondaryText,

            ...titleStyle,
          }}
        >
          {title}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          borderColor: isfocus
            ? color.additionalColors.focusRing
            : color.secondaryColors.borders,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          paddingLeft: 15,
          height: 50,
          backgroundColor: color.secondaryColors.inputBackground,
        }}
      >
        <TextInput
          onC
          style={{ color: color.secondaryColors.inputText }}
          value={value}
          onChangeText={handleInput}
          keyboardType={inputType}
          placeholder={placeHolders}
          secureTextEntry={title.toLocaleLowerCase() === "password"}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default FormField;
