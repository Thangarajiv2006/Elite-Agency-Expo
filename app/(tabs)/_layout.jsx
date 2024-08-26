import { router, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import icons from "../../constants/icons";
import { color } from "../../constants/colors";
import { useSelector } from "react-redux";
import Header from "../../components/common/Header";

const TabIcons = ({ icon, color, name, focused }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        overflow: "hidden",
        opacity: focused ? 1 : 0.7,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
        style={{ width: 20, height: 20 }}
      />
      <Text style={{ color: color, fontSize: 10, marginTop: 5 }}>{name}</Text>
    </View>
  );
};

const TabLayout = () => {
  const AgencyData = useSelector((state) => state.Agency);

  useEffect(() => {
    if (!AgencyData.isLogined) {
      router.replace("/sign-in");
    }
  }, [AgencyData]);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.onBackgrond,
        tabBarStyle: {
          width: "100%",
          height: 70,
          backgroundColor: color.background,
          borderTopColor: color.secondaryColors.borders,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, focused }) => (
            <TabIcons
              name={"Analytics"}
              color={color}
              focused={focused}
              icon={icons.analytics}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, focused }) => (
            <TabIcons
              name={"Products"}
              color={color}
              focused={focused}
              icon={icons.products}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, focused }) => (
            <TabIcons
              name={"Shop"}
              color={color}
              focused={focused}
              icon={icons.shops}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workers"
        options={{
          title: "Workers",
          tabBarIcon: ({ color, focused }) => (
            <TabIcons
              name={"Workers"}
              color={color}
              focused={focused}
              icon={icons.worker}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <TabIcons
              name={"Orders"}
              color={color}
              focused={focused}
              icon={icons.cart}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
