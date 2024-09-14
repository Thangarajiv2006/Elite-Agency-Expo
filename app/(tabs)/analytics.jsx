import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/common/Header";
import CircleButton from "../../components/common/CircleButton";
import icons from "../../constants/icons";
import { getOrders } from "../../actions/order.action";
import RenderOrder from "../../components/Order/RenderOrder";
import { router } from "expo-router";
import Loader from "../../components/common/Loader";

const Analytics = () => {
  const AgencyData = useSelector((state) => state.Agency);
  const orderData = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (AgencyData.errorCode) {
      Alert.alert("Error", AgencyData.errorMessage);
    }
    if (orderData.errorCode) {
      Alert.alert("Error", orderData.errorMessage);
    }
  }, [AgencyData, orderData]);

  useEffect(() => {
    if (!orderData.orders.length) {
      const start = orderData.orders.length;
      dispatch(getOrders(start, start + 10));
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header agencyName={AgencyData.agencyDetails.AgencyName} />
        </View>
        <View style={styles.scrollViewContent}>
          <View
            style={{
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Regular",
                color: color.onBackgrond,
              }}
            >
              Welcome Back{" "}
              <Text style={{ color: color.primary }}>
                {AgencyData.agencyDetails.name},
              </Text>
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: color.surface,
                padding: 10,
                marginTop: 10,
              }}
            >
              <View style={{ height: 50 }}>
                <Text
                  style={{
                    color: color.primary,

                    fontFamily: "Poppins-SemiBold",
                    fontSize: 15,
                  }}
                >
                  {AgencyData.agencyDetails.AgencyName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 200,
                    marginTop: 2,
                    position: "relative",
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
                    {AgencyData.agencyDetails.name}
                  </Text>
                </View>
              </View>
              <CircleButton
                icon={icons.pencil}
                containerStyle={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
                buttonStyle={{ width: 15, height: 15 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "50%" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        opacity: 0.7,
                        fontSize: 12,
                      }}
                    >
                      Mobile:
                    </Text>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      {AgencyData.agencyDetails.mobile}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        opacity: 0.7,
                        fontSize: 12,
                      }}
                    >
                      FSSAI:
                    </Text>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      {AgencyData.agencyDetails.FSSAI
                        ? AgencyData.agencyDetails.FSSAI
                        : "none"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        opacity: 0.7,
                        fontSize: 12,
                      }}
                    >
                      GSTIN:
                    </Text>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      {AgencyData.agencyDetails.GSTIN
                        ? AgencyData.agencyDetails.GSTIN
                        : "none"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        opacity: 0.7,
                        fontSize: 12,
                      }}
                    >
                      PAN:
                    </Text>
                    <Text
                      style={{
                        color: color.onSurface,
                        fontFamily: "Poppins-Medium",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      {AgencyData.agencyDetails.PAN
                        ? AgencyData.agencyDetails.PAN
                        : "none"}
                    </Text>
                  </View>
                </View>
                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {AgencyData.agencyDetails.address.houseNo},{" "}
                    {AgencyData.agencyDetails.address.street},
                  </Text>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {AgencyData.agencyDetails.address.village},
                  </Text>

                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {AgencyData.agencyDetails.address.district} -{" "}
                    {AgencyData.agencyDetails.address.pincode}
                  </Text>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {AgencyData.agencyDetails.address.state} -{" "}
                    {AgencyData.agencyDetails.address.stateCode}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Medium",
                  fontSize: 20,
                  marginLeft: 5,
                  marginTop: 10,
                }}
              >
                Latest Orders
              </Text>
              <TouchableOpacity onPress={() => router.push("/orders")}>
                <Text
                  style={{
                    color: color.primary,
                    fontFamily: "Poppins-Medium",
                    fontSize: 15,
                    marginLeft: 5,
                    marginTop: 10,
                  }}
                >
                  more
                </Text>
              </TouchableOpacity>
            </View>
            {orderData.isLoading && orderData.orders.length === 0 ? (
              <Loader loading={orderData.isLoading} />
            ) : (
              <FlatList
                style={{}}
                showsVerticalScrollIndicator={false}
                data={orderData.orders.slice(0, 4) ?? []}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <RenderOrder
                    index={index}
                    item={item}
                    onPress={() => router.push(`/order/showOrder/${item._id}`)}
                  />
                )}
              />
            )}
          </View>
        </View>
      </View>

      <StatusBar style="light" backgroundColor={color.background} />
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
    paddingTop: 70,
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

export default Analytics;
