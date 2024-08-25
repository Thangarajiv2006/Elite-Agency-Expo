import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { color } from "../../constants/colors";

const ShopsRender = ({
  index,
  shopName,
  name,
  village,
  district,
  state,
  stateCode,
  pincode,
  FSSAI,
  GSTIN,
  PAN,
  mobile,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: color.surface,
        width: "100%",
        height: 125,
        marginBottom: 10,
        borderRadius: 5,
        marginTop: index === 0 ? 10 : 0,
        padding: 13,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: color.primary,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            color: color.onPrimary,
            fontSize: 30,
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={{ width: "70%" }}>
        <View style={{ height: 50 }}>
          <Text
            style={{
              color: color.onSurface,
              fontFamily: "Poppins-SemiBold",
              fontSize: 15,
            }}
          >
            {shopName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 200,
              marginTop: 2,
            }}
          >
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Medium",
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Medium",
                opacity: 0.7,
                fontSize: 12,
              }}
            >
              {mobile}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "50%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  opacity: 0.7,
                  fontSize: 12,
                }}
              >
                FSSAI:
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                {FSSAI ? FSSAI : "none"}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  opacity: 0.7,
                  fontSize: 12,
                }}
              >
                GSTIN:
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                {GSTIN ? GSTIN : "none"}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  opacity: 0.7,
                  fontSize: 12,
                }}
              >
                PAN:
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                {PAN ? PAN : "none"}
              </Text>
            </View>
          </View>
          <View style={{ width: "50%" }}>
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Medium",
                fontSize: 10,
                marginLeft: 5,
              }}
            >
              {village}
            </Text>
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Medium",
                fontSize: 10,
                marginLeft: 5,
              }}
            >
              {district} - {pincode}
            </Text>
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Medium",
                fontSize: 10,
                marginLeft: 5,
              }}
            >
              {state} - {stateCode}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopsRender;
