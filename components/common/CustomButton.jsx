import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { color } from "@/constants/colors";

const CustomButton = ({ handlePress, title, containerStyles, textStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: color.secondaryColors.primaryButtonBackground,
        width: "80%",
        height: 50,
        borderRadius: 10,
        ...containerStyles,
      }}
      onPress={handlePress}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text
          style={{
            color: color.secondaryColors.primaryButtonText,
            fontSize: 12,
            fontFamily: "Poppins-Regular",
            ...textStyle,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
