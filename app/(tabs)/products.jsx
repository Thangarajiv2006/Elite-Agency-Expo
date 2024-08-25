import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import CircleButton from "../../components/common/CircleButton";
import icons from "../../constants/icons";
import SearchInput from "../../components/common/SearchButton";
import { color } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import AddEditProduct from "../../components/Product/AddEditProduct";
import {
  createProduct,
  getAllProducts,
  refreshProducts,
} from "../../actions/products.action";
import Loader from "../../components/common/Loader";
import ProductRender from "../../components/Product/ProductRender";
import { backendUrls } from "../../constants/urlConfig";
import { useDebounce } from "use-debounce";

const Product = () => {
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

  const handleCreate = async () => {
    for (const key in productDetails) {
      if (Object.prototype.hasOwnProperty.call(productDetails, key)) {
        const element = productDetails[key];
        if (!element) {
          Alert.alert(`Error`, `Please fill ${key}`);
          return;
        }
      }
    }
    setIsLoading(true);
    await dispatch(createProduct(productDetails)).then(() => {
      setIsLoading(false);
      setShowAddProduct(false);
      setproductDetails({
        name: "",
        pic: null,
        MRP: "",
        netPrice: "",
        price: "",
        HSN: "",
        CGST: "",
        SGST: "",
      });
    });
  };

  const [showAddProduct, setShowAddProduct] = useState(false);

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
          {productData.isLoading && productData.products.length === 0 ? (
            <Loader loading={productData.isLoading} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterdData ?? []}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
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
        <View style={styles.footer}>
          <CircleButton
            icon={icons.plus}
            handlePress={() => setShowAddProduct(true)}
          />
        </View>
        <View>
          <AddEditProduct
            visible={showAddProduct}
            onClose={() => {
              setShowAddProduct(false);
              setproductDetails({
                name: "",
                pic: null,
                MRP: "",
                netPrice: "",
                price: "",
                HSN: "",
                CGST: "",
                SGST: "",
              });
            }}
            title={"Add Product"}
            productDetails={productDetails}
            setproductDetails={setproductDetails}
            handleClick={handleCreate}
            isLoading={isLoading}
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

export default Product;
