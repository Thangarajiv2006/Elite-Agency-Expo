import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { billLayout } from "../../../others/inovoicePdf";
import { printToFileAsync } from "expo-print";
import { color } from "../../../constants/colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/Header";
import Loader from "../../../components/common/Loader";
import PdfViewer from "../../../components/common/PDFViewer";
import Pdf from "react-native-pdf";
import CircleButton from "../../../components/common/CircleButton";
import icons from "../../../constants/icons";
import { save } from "../../../helpers/download";

const showOrder = () => {
  const AgencyData = useSelector((state) => state.Agency);
  const orderData = useSelector((state) => state.order);

  const { productId } = useLocalSearchParams();

  //Show Bill
  const [data, setData] = useState({
    shop: {
      shopName: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const [billUri, setBillUri] = useState("");
  const generateBill = async (
    agencyDetails,
    shop,
    products,
    invoiceNo,
    createdAt
  ) => {
    const html = billLayout(
      agencyDetails,
      shop,
      products,
      invoiceNo,
      createdAt
    );
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    return file;
  };

  useEffect(() => {
    const createBill = async () => {
      setLoading(true);
      const order = orderData.orders.find((order) => order._id === productId);
      if (orderData) {
        const file = await generateBill(
          AgencyData.agencyDetails,
          order.shop,
          order.orderedProducts,
          order.invoiceNo,
          order.createdAt
        );
        setData(order);
        setBillUri(file.uri);
      } else {
        router.push("/order");
        Alert.alert("Error", "Order no found!");
      }
      setLoading(false);
    };

    createBill();
  }, []);

  const download = async (uri) => {
    await save(
      uri,
      `${data.shop.shopName}${Date.now()}`,
      "application/pdf"
    ).then(() => {
      router.push("/orders");
      Alert.alert("Message", "PDF Created Successfully!");
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{}}>
        <View style={styles.header}>
          <Header
            agencyName={data.shop.shopName}
            backNav={true}
            onNav={() => router.back()}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            paddingTop: 60,
            height: Dimensions.get("window").height,
          }}
        >
          <PdfViewer uri={billUri} />
        </ScrollView>
        <View style={styles.footer}>
          <CircleButton
            icon={icons.download}
            handlePress={() => download(billUri)}
          />
        </View>
      </View>
      <StatusBar style="light" backgroundColor={color.background} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.background,
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
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 15,
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

export default showOrder;
