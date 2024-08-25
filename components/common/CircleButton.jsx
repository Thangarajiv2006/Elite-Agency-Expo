import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { color } from "../../constants/colors";
import icons from "../../constants/icons";

const CircleButton = ({ containerStyle, handlePress, icon, buttonStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: 50,
        height: 50,
        backgroundColor: color.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        ...containerStyle,
      }}
      onPress={handlePress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          color: color.onPrimary,
          width: 20,
          height: 20,
          ...buttonStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default CircleButton;
