import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import CircleButton from "../../components/common/CircleButton";
import EditAndAdd from "../../components/Shops/EditAndAdd";
import icons from "../../constants/icons";
import SearchInput from "../../components/common/SearchButton";
import { color } from "../../constants/colors";
import {
  createShop,
  fetchShops,
  refreshShops,
} from "../../actions/shop.action";
import { StatusBar } from "expo-status-bar";
import Loader from "../../components/common/Loader";
import ShopsRender from "../../components/Shops/ShopsRender";
import { useDebounce } from "use-debounce";
import { router } from "expo-router";

const selectShop = () => {
  const AgencyData = useSelector((state) => state.Agency);
  const shopData = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearchText] = useDebounce(search, 300);

  const [filterdData, setFilteredData] = useState(shopData.shops ?? []);

  useEffect(() => {
    if (AgencyData.errorCode) {
      Alert.alert("Error", AgencyData.errorMessage);
    }
    if (shopData.errorCode) {
      Alert.alert("Error", shopData.errorMessage);
    }
  }, [AgencyData, shopData]);

  useEffect(() => {
    if (!shopData.shops.length) {
      const start = shopData.shops.length;
      dispatch(fetchShops(start, start + 10));
    }
  }, []);

  useEffect(() => {
    if (shopData.isLoading) {
      return;
    }
    const searchResults = shopData.shops.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.shopName.toLowerCase().includes(search.toLowerCase()) ||
        item.address.village.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(searchResults);
  }, [debouncedSearchText, shopData]);

  const [showAddShop, setShowAdd] = useState(false);

  const [shopDetails, setShopDetails] = useState({
    shopName: "",
    village: "",
    district: "Tirunelveli",
    state: "Tamilnadu",
    stateCode: "33",
    pincode: "",
    name: "",
    mobile: "",
    FSSAI: "",
    PAN: "",
    GSTIN: "",
  });

  const handleCreate = () => {
    if (
      !shopDetails.shopName.trim() ||
      !shopDetails.village.trim() ||
      !shopDetails.district.trim() ||
      !shopDetails.state.trim() ||
      !shopDetails.stateCode.trim() ||
      !shopDetails.pincode.trim() ||
      !shopDetails.name.trim() ||
      !shopDetails.mobile.trim()
    ) {
      Alert.alert("Error", "Please Enter Required Field");
      return;
    }
    setIsLoading(true);
    dispatch(createShop(shopDetails)).then(() => {
      setIsLoading(false);
      setShowAdd(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            agencyName={AgencyData.agencyDetails.AgencyName}
            backNav={true}
            onNav={() => router.back()}
          />
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
        <View contentContainerStyle={styles.scrollViewContent}></View>

        <View style={styles.scrollViewContent}>
          {shopData.isLoading && shopData.shops.length === 0 ? (
            <Loader loading={shopData.isLoading} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ width: "100%", minHeight: "100%" }}
              data={filterdData ?? []}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <ShopsRender
                  index={index}
                  shopName={item.shopName}
                  name={item.name}
                  village={item.address.village}
                  district={item.address.district}
                  state={item.address.state}
                  stateCode={item.address.stateCode}
                  pincode={item.address.pincode}
                  FSSAI={item.FSSAI}
                  GSTIN={item.GSTIN}
                  PAN={item.PAN}
                  mobile={item.mobile}
                  onPress={() => {
                    router.push(`/order/${item._id}`);
                  }}
                />
              )}
              ListFooterComponent={() => <Loader loading={isFetching} />}
              onEndReached={
                shopData.isEnded || isFetching
                  ? () => {}
                  : async () => {
                      setIsFetching(true);
                      const start = shopData.shops.length;
                      await dispatch(fetchShops(start, start + 10)).then(() => {
                        setIsFetching(false);
                      });
                    }
              }
              refreshControl={
                <RefreshControl
                  refreshing={shopData.isRefreshing}
                  onRefresh={() => {
                    dispatch(refreshShops());
                  }}
                />
              }
            />
          )}
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
