import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import CircleButton from "../../components/common/CircleButton";
import EditAndAdd from "../../components/Shops/EditAndAdd";
import icons from "../../constants/icons";
import SearchInput from "../../components/common/SearchButton";
import { color } from "../../constants/colors";
import { createShop } from "../../actions/shop.action";
import { StatusBar } from "expo-status-bar";

const FixedHeaderFooterExample = () => {
  const AgencyData = useSelector((state) => state.Agency);
  const shopData = useSelector((state) => state.shop);

  useEffect(() => {
    if (AgencyData.errorCode) {
      Alert.alert("Error", AgencyData.errorCode);
    }
    if (shopData.errorCode) {
      Alert.alert("Error", shopData.errorCode);
    }
  }, [AgencyData, shopData]);

  const [showAddShop, setShowAdd] = useState(false);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header agencyName={AgencyData.agencyDetails.AgencyName} />
          <SearchInput
            title={""}
            titleStyle={{}}
            placeHolders={"Search...."}
            handleInput={() => {}}
            inputStyle={{ marginTop: 10, width: "90%" }}
            inputType={"default"}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={{ color: color.onBackgrond }}>
            This page is still working by the Editor
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <CircleButton
            icon={icons.plus}
            handlePress={() => setShowAdd(true)}
          />
        </View>
        <View></View>
        <StatusBar style="light" backgroundColor={color.background} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  scrollViewContent: {
    backgroundColor: color.background,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60, // Ensure content starts below the header
    paddingBottom: 50, // Ensure content ends above the footer
  },
  footer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
});

export default FixedHeaderFooterExample;
