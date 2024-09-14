import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, Dimensions } from "react-native";
import Pdf from "react-native-pdf";
import { color } from "../../constants/colors";

const PdfViewer = ({ uri }) => {
  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      {uri ? (
        <Pdf
          source={{ uri }}
          onError={(error) => {
            console.log(error);
          }}
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: color.background,
          }}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color={color.background}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default PdfViewer;
