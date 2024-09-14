import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import CircleButton from "../../components/common/CircleButton";
import icons from "../../constants/icons";
import SearchInput from "../../components/common/SearchButton";
import { color } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Loader from "../../components/common/Loader";
import { useDebounce } from "use-debounce";
import { router } from "expo-router";
import { getOrders, refreshOrders } from "../../actions/order.action";
import RenderOrder from "../../components/Order/RenderOrder";

import { billLayout } from "../../others/inovoicePdf";
import { printToFileAsync } from "expo-print";
import ShowOrderPdf from "../../components/Order/ShowOrderPdf";

const selectShop = () => {
  const AgencyData = useSelector((state) => state.Agency);
  const orderData = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearchText] = useDebounce(search, 300);

  const [filterdData, setFilteredData] = useState(orderData.orders ?? []);

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

  useEffect(() => {
    if (orderData.isLoading) {
      return;
    }
    const searchResults = orderData.orders.filter((item) => {
      return (
        item.shop.shopName.toLowerCase().includes(search.toLowerCase()) ||
        item.invoiceNo.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredData(searchResults);
  }, [debouncedSearchText, orderData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header agencyName={AgencyData.agencyDetails.AgencyName} />
          <SearchInput
            title={""}
            titleStyle={{}}
            value={search}
            placeHolders={"Search...."}
            handleInput={(e) => setSearch(e)}
            inputStyle={{ marginTop: 10, width: "90%" }}
            inputType={"default"}
          />
        </View>
        <View style={styles.scrollViewContent}>
          {orderData.isLoading && orderData.orders.length === 0 ? (
            <Loader loading={orderData.isLoading} />
          ) : (
            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              data={filterdData ?? []}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <RenderOrder
                  index={index}
                  item={item}
                  onPress={() => router.push(`/order/showOrder/${item._id}`)}
                />
              )}
              ListFooterComponent={() => <Loader loading={isFetching} />}
              onEndReached={
                orderData.isEnded || isFetching
                  ? () => {}
                  : async () => {
                      setIsFetching(true);
                      const start = orderData.orders.length;
                      await dispatch(getOrders(start, start + 10)).then(() => {
                        setIsFetching(false);
                      });
                    }
              }
              ListEmptyComponent={() => <Text>No Data</Text>}
              refreshControl={
                <RefreshControl
                  refreshing={orderData.isRefreshing}
                  onRefresh={() => {
                    dispatch(refreshOrders());
                  }}
                />
              }
            />
          )}
        </View>
        <View style={styles.footer}>
          <CircleButton
            icon={icons.plus}
            handlePress={() => router.push("/order/selectShop")}
          />
        </View>

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

export default selectShop;
