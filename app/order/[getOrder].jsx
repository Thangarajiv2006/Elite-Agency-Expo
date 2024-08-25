import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  Dimensions,
  Animated,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { color } from "../../constants/colors";
import Header from "../../components/common/Header";

import RenderProduct from "../../components/common/RenderProduct";
import * as Animatable from "react-native-animatable";
import icons from "../../constants/icons";
import { Image } from "react-native";
import { backendUrls } from "../../constants/urlConfig";
import CircleButton from "../../components/common/CircleButton";
import FormField from "../../components/common/TextInput";
import TypeOrder from "../../components/Order/TypeOrder";
import CustomButton from "../../components/common/CustomButton";

const getOrder = () => {
  const Dimensions = useWindowDimensions();
  const { getOrder: _id } = useLocalSearchParams();
  const AgencyData = useSelector((state) => state.Agency);
  const shopData = useSelector((state) => state.shop);
  const productData = useSelector((state) => state.product);

  const shop = shopData.shops.find((shop) => shop._id === _id);

  const [onProduct, setOnProduct] = useState(true);

  useEffect(() => {
    if (!AgencyData.isLogined) {
      return router.replace("/sign-in");
    }
    if (!_id) {
      return router.push("/order/selectShop");
    }
  }, []);

  //NAVIGATION PORPOSE
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  //GET ORDER FROM USER
  const [selectedProduct, setSelectedProduct] = useState([]);

  const addToCart = (id) => {
    let product = productData.products.find((item) => item._id === id);
    const productExist = selectedProduct.findIndex((item) => item._id === id);

    if (productExist !== -1) {
      setSelectedProduct(
        selectedProduct.filter((item, index) => item._id !== id)
      );
    } else {
      product.quentity = "";
      product.free = "";
      product.discount = "";
      product.total = 0;
      setSelectedProduct([...selectedProduct, product]);

      setOnProduct(false);
    }
  };

  const handleIcon = (id) => {
    const productExist = selectedProduct.findIndex((item) => item._id === id);
    if (productExist !== -1) {
      return icons.minus;
    } else {
      return icons.plus;
    }
  };

  return (
    <SafeAreaView>
      <View style={{ height: "100%", backgroundColor: color.background }}>
        <View>
          <Header
            agencyName={AgencyData.agencyDetails.AgencyName}
            backNav={true}
            onNav={() => router.back()}
          />
          <View
            style={{
              backgroundColor: color.surface,
              width: "100%",
              height: 125,
              marginBottom: 10,
              borderRadius: 5,
              marginTop: 10,
              padding: 13,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
                {shop.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={{ width: "70%" }}>
              <View style={{ height: 50 }}>
                <Text
                  style={{
                    color: color.onSurface,
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 15,
                  }}
                >
                  {shop.shopName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 200,
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
                    {shop.name}
                  </Text>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      opacity: 0.7,
                      fontSize: 12,
                    }}
                  >
                    {shop.mobile}
                  </Text>
                </View>
              </View>
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
                      {shop.FSSAI ? shop.FSSAI : "none"}
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
                      {shop.GSTIN ? shop.GSTIN : "none"}
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
                      {shop.PAN ? shop.PAN : "none"}
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
                    {shop.address.village}
                  </Text>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {shop.address.district} - {shop.address.pincode}
                  </Text>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {shop.address.state} - {shop.address.stateCode}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: color.surface,
              width: "100%",
              height: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "50%",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: color.onSurface,
                borderRightWidth: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: currentIndex === 0 ? 15 : 13,
                  color: color.onSurface,
                  opacity: currentIndex === 0 ? 1 : 0.7,
                }}
              >
                Products
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                height: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: currentIndex === 1 ? 15 : 13,
                  color: color.onSurface,
                  opacity: currentIndex === 1 ? 1 : 0.7,
                }}
              >
                Selected
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          horizontal
          pagingEnabled
          style={{}}
          data={[
            {
              id: 1,
              JSX: (
                <RenderProduct
                  circleButton={true}
                  onPressCircleButton={addToCart}
                  circleButtonIcon={handleIcon}
                />
              ),
            },
            {
              id: 2,
              JSX: (
                <TypeOrder
                  addToCart={addToCart}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  shopId={shop._id}
                  AgencyId={AgencyData.agencyDetails._id}
                />
              ),
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: Dimensions.width,
              }}
            >
              {item.JSX}
            </View>
          )}
          ref={flatListRef}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      </View>
      <StatusBar style="light" backgroundColor={color.background} />
    </SafeAreaView>
  );
};

export default getOrder;

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
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 130,
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
