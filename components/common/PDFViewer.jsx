import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const PdfViewer = ({ uri }) => {
  return (
    <View style={{ flex: 1 }}>
      {uri ? (
        <WebView
          source={{ uri }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
      )}
    </View>
  );
};

export default PdfViewer;
