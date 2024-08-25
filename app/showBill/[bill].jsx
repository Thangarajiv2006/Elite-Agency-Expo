import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Dimensions } from "react-native";
import Pdf from "react-native-pdf";
import { backendUrls } from "../../constants/urlConfig";

const bill = () => {
  const { bill } = useLocalSearchParams();
  const source = {
    uri: `${bill}`, // URL to the PDF file
    cache: true, // Optional, caches the file locally
  };
  console.log(bill);

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{ flex: 1, width: Dimensions.get("window").width }}
      />
    </View>
  );
};

export default bill;
