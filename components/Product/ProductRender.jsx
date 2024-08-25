import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { color } from "../../constants/colors";
import { backendUrls } from "../../constants/urlConfig";

const ProductRender = ({
  index,
  name,
  pic,
  MRP,
  netPrice,
  price,
  HSN,
  CGST,
  SGST,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <View
      style={{
        backgroundColor: color.surface,
        width: "100%",
        height: 125,
        marginBottom: 10,
        borderRadius: 5,
        marginTop: index === 0 ? 10 : 0,
        padding: 13,
        flexDirection: "row",
      }}
      onLayout={onLayout}
    >
      <View style={{ width: 100, height: 100 }}>
        <Image
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          resizeMode="cover"
          source={{ uri: pic }}
        />
      </View>
      <View
        style={{
          width: dimensions.width - 140,
          marginLeft: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              color: color.onSurface,
              fontFamily: "Poppins-Medium",
              fontSize: 15,
            }}
            numberOfLines={2}
          >
            {name}
          </Text>
          <Text
            style={{
              color: color.onSurface,
              fontFamily: "Poppins-Light",
              fontSize: 10,
            }}
          >
            {HSN}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 10 }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Light",
                  fontSize: 12,
                }}
              >
                MRP
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                }}
              >
                {MRP}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Light",
                  fontSize: 12,
                }}
              >
                Net Price
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                }}
              >
                {netPrice}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Light",
                  fontSize: 12,
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                }}
              >
                {price}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", columnGap: 10 }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Light",
                  fontSize: 12,
                }}
              >
                SGST
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                }}
              >
                {SGST + "%"}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Light",
                  fontSize: 12,
                }}
              >
                CGST
              </Text>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                }}
              >
                {CGST + "%"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductRender;
