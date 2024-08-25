import { View, Text, ScrollView, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/common/CustomButton";
import { logout } from "../../actions/auth.action";
import { Redirect, router } from "expo-router";
import { color } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/common/Header";
import { useDebounce } from "use-debounce";

const Analytics = () => {
  const AgencyData = useSelector((state) => state.Agency);

  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          backgroundColor: color.background,
        }}
      >
        <View>
          <Header agencyName={AgencyData.agencyDetails.AgencyName} />
        </View>
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-Regular",
              color: color.onBackgrond,
            }}
          >
            This Page is Still Working by the{" "}
            <Text style={{ color: color.primary }}>Editor</Text>
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor={color.background} />
    </SafeAreaView>
  );
};

export default Analytics;
