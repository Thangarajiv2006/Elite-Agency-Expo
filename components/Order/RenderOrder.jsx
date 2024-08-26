import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { color } from "../../constants/colors";
import { TouchableOpacity } from "react-native";
import { format, parseISO, addDays } from "date-fns";
import { el } from "date-fns/locale";
import CircleButton from "../common/CircleButton";
import icons from "../../constants/icons";
import { backendUrls } from "../../constants/urlConfig";
import { downloadFromUrl, save } from "../../helpers/download";

import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { useSelector } from "react-redux";
import { billLayout } from "../../others/inovoicePdf";

const RenderOrder = ({ index, item, onPress }) => {
  const AgencyData = useSelector((state) => state.Agency);

  const date = parseISO(item.createdAt);
  const formattedDate = format(date, "dd-MM-yyyy");

  const [grandTotal, setGrandTotal] = useState(0);

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let grandTotalAmount = 0;

    const numToINCurrency = (amount) => {
      const formattedAmount = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return formattedAmount;
    };

    for (let i = 0; i < item.orderedProducts.length; i++) {
      const element = item.orderedProducts[i];
      const taxable = element.quentity * element.product.price;

      const SGSTAmount = (taxable * element.product.SGST) / 100;
      const CGSTAmount = (taxable * element.product.CGST) / 100;
      const discountAmount =
        ((taxable + SGSTAmount + CGSTAmount) * element.discount) / 100;
      const totalAmount = taxable + SGSTAmount + CGSTAmount - discountAmount;
      grandTotalAmount += totalAmount;
    }
    grandTotalAmount = numToINCurrency(grandTotalAmount);
    setGrandTotal(grandTotalAmount);
  }, []);

  const handleGenaratePdf = async (
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
    await save(
      file.uri,
      `${shop.shopName}${Date.now()}`,
      "application/pdf"
    ).then(() => {
      Alert.alert("Message", "PDF Created Successfully!");
    });
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
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <CircleButton
        icon={icons.download}
        containerStyle={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 35,
          height: 35,
          opacity: isDownloading ? 0.7 : 1,
        }}
        buttonStyle={{
          width: 15,
        }}
        handlePress={() =>
          handleGenaratePdf(
            AgencyData.agencyDetails,
            item.shop,
            item.orderedProducts,
            item.invoiceNo,
            item.createdAt
          )
        }
      />
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
          {item.shop.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={{ width: "70%", justifyContent: "space-between" }}>
        <View style={{ height: 50 }}>
          <Text
            style={{
              color: color.onSurface,
              fontFamily: "Poppins-SemiBold",
              fontSize: 15,
            }}
          >
            {item.shop.shopName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 175,
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
              {item.shop.name}
            </Text>
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Medium",
                opacity: 0.7,
                fontSize: 12,
              }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: color.onSurface,
              fontFamily: "Poppins-Medium",
              opacity: 0.7,
              fontSize: 12,
            }}
          >
            Grand Total:{"  "}
          </Text>
          <Text
            style={{
              color: color.onSurface,
              fontFamily: "Poppins-Medium",
              opacity: 0.7,
              fontSize: 12,
            }}
          >
            {grandTotal}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RenderOrder;
