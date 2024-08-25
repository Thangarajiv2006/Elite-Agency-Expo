import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { color } from "../../constants/colors";

const SearchInput = ({
  title,
  titleStyle,
  placeHolders,
  handleInput,
  inputStyle,
  inputType,
  value,
  error,
  onPressAddButton,
}) => {
  const [isfocus, setIsFocus] = useState(false);
  return (
    <View
      style={{
        height: 50,
        position: "relative",
        ...inputStyle,
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: value || isfocus ? -6 : 15,

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
      <View
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
          style={{ color: color.secondaryColors.inputText }}
          value={value}
          onChangeText={handleInput}
          keyboardType={inputType}
          placeholder={placeHolders}
          secureTextEntry={title.toLocaleLowerCase() === "password"}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholderTextColor={color.onSurface}
        />
      </View>
    </View>
  );
};

export default SearchInput;
