import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "use-debounce";
import SearchInput from "./SearchButton";
import Loader from "./Loader";
import { backendUrls } from "../../constants/urlConfig";
import { getAllProducts, refreshProducts } from "../../actions/products.action";
import { color } from "../../constants/colors";
import ProductRender from "../Product/ProductRender";
import CircleButton from "./CircleButton";
import icons from "../../constants/icons";

const RenderProduct = ({
  circleButton,
  onPressCircleButton,
  state,
  circleButtonIcon,
}) => {
  const AgencyData = useSelector((state) => state.Agency);
  const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearchText] = useDebounce(search, 300);

  const [filterdData, setFilteredData] = useState(productData.products ?? []);

  const [productDetails, setproductDetails] = useState({
    name: "",
    pic: null,
    MRP: "",
    netPrice: "",
    price: "",
    HSN: "",
    CGST: "",
    SGST: "",
  });

  useEffect(() => {
    // GET A DATA FROM BACKEND
    if (!productData.products.length) {
      const start = productData.products.length;
      dispatch(getAllProducts(start, start + 10));
    }
  }, []);

  useEffect(() => {
    if (AgencyData.errorCode) {
      Alert.alert("Error", AgencyData.errorMessage);
    }
    if (productData.errorCode) {
      Alert.alert("Error", productData.errorMessage);
    }
  }, [AgencyData, productData]);

  useEffect(() => {
    if (productData.isLoading) {
      return;
    }
    const searchResults = productData.products.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(searchResults);
  }, [debouncedSearchText, productData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchInput
          title={""}
          titleStyle={{}}
          value={search}
          placeHolders={"Search...."}
          handleInput={(e) => setSearch(e)}
          inputStyle={{ marginVertical: 10, width: "90%" }}
          inputType={"default"}
        />
      </View>
      <View style={styles.scrollViewContent}>
        {productData.isLoading && productData.products.length === 0 ? (
          <Loader loading={productData.isLoading} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterdData ?? []}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={{ position: "relative" }}>
                <ProductRender
                  index={index}
                  name={item.name}
                  pic={backendUrls.public + item.pic}
                  MRP={item.MRP}
                  netPrice={item.netPrice}
                  price={item.price}
                  HSN={item.HSN}
                  CGST={item.CGST}
                  SGST={item.SGST}
                />
                {circleButton ? (
                  <CircleButton
                    containerStyle={{
                      position: "absolute",
                      width: 30,
                      height: 30,
                      right: 10,
                      top: index === 0 ? 20 : 10,
                    }}
                    buttonStyle={{
                      width: 15,
                      height: 15,
                    }}
                    icon={circleButtonIcon(item._id)}
                    handlePress={() => onPressCircleButton(item._id)}
                  />
                ) : (
                  <></>
                )}
              </View>
            )}
            ListFooterComponent={() => <Loader loading={isFetching} />}
            onEndReached={
              productData.isEnded || isFetching
                ? () => {}
                : async () => {
                    setIsFetching(true);
                    const start = productData.products.length;
                    await dispatch(getAllProducts(start, start + 10)).then(
                      () => {
                        setIsFetching(false);
                      }
                    );
                  }
            }
            refreshControl={
              <RefreshControl
                refreshing={productData.isRefreshing}
                onRefresh={() => {
                  dispatch(refreshProducts());
                }}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 15,
    paddingTop: 70,
  },
});

export default RenderProduct;
