import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { color } from "../../constants/colors";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color.onBackgrond} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
