import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { backendUrls } from "../../constants/urlConfig";
import FormField from "../common/TextInput";
import icons from "../../constants/icons";
import { color } from "../../constants/colors";
import CircleButton from "../common/CircleButton";
import CustomButton from "../common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/order.action";

const TypeOrder = ({
  selectedProduct,
  setSelectedProduct,
  addToCart,
  shopId,
  AgencyId,
}) => {
  const orderData = useSelector((state) => state.order);
  const AgencyData = useSelector((state) => state.Agency);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDataChange, setIsDataChange] = useState(false);
  const [renderJSX, setRenderJSX] = useState(<></>);

  const [grandTotal, setGrantTotal] = useState(0);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const numToINCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
    return formattedAmount;
  };

  const calculateTotal = (price, quentity, discount, SGST, CGST) => {
    const taxable = price * quentity;
    const SGSTAmount = (taxable * SGST) / 100;
    const CGSTAmount = (taxable * CGST) / 100;
    const discountAmount =
      ((taxable + SGSTAmount + CGSTAmount) * discount) / 100;
    const total = taxable + SGSTAmount + CGSTAmount - discountAmount;
    return total;
  };

  const calculateGrandTotal = (arr) => {
    let grandTotal = 0;
    arr.forEach((item) => (grandTotal += item.total));
    setGrantTotal(grandTotal);
  };

  const handleCreateOrder = () => {
    for (let i = 0; i < selectedProduct.length; i++) {
      const product = selectedProduct[i];
      if (!product.quentity.trim()) {
        return;
      }
    }
    let product = [];
    for (let i = 0; i < selectedProduct.length; i++) {
      const element = selectedProduct[i];
      const data = {
        product: element._id,
        free: element.free ? element.free : "0",
        quentity: element.quentity ? element.quentity : "0",
        discount: element.discount ? element.discount : "0",
      };
      product.push(data);
    }
    const formData = {
      orderedProducts: product,
      shop: shopId,
    };
    dispatch(createOrder(formData, AgencyData.agencyDetails));
  };

  useEffect(() => {
    setRenderJSX(
      <FlatList
        data={selectedProduct ?? []}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: color.surface,
              width: "100%",
              marginBottom: 10,
              borderRadius: 5,
              marginTop: 10,
              padding: 13,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
              onLayout={onLayout}
            >
              <View style={{ width: 100, height: 100 }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                  source={{ uri: backendUrls.public + item.pic }}
                />
              </View>
              <View
                style={{
                  width: dimensions.width - 140,
                  marginLeft: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Medium",
                      fontSize: 15,
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: color.onSurface,
                      fontFamily: "Poppins-Light",
                      fontSize: 10,
                    }}
                  >
                    {item.HSN}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Light",
                          fontSize: 12,
                        }}
                      >
                        MRP
                      </Text>
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Regular",
                          fontSize: 10,
                        }}
                      >
                        {item.MRP}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Light",
                          fontSize: 12,
                        }}
                      >
                        Net Price
                      </Text>
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Regular",
                          fontSize: 10,
                        }}
                      >
                        {item.netPrice}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Light",
                          fontSize: 12,
                        }}
                      >
                        Price
                      </Text>
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Regular",
                          fontSize: 10,
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Light",
                          fontSize: 12,
                        }}
                      >
                        SGST
                      </Text>
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Regular",
                          fontSize: 10,
                        }}
                      >
                        {item.SGST + "%"}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Light",
                          fontSize: 12,
                        }}
                      >
                        CGST
                      </Text>
                      <Text
                        style={{
                          color: color.onSurface,
                          fontFamily: "Poppins-Regular",
                          fontSize: 10,
                        }}
                      >
                        {item.CGST + "%"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <CircleButton
                containerStyle={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  right: 10,
                  top: 10,
                }}
                buttonStyle={{ width: 10, height: 10 }}
                icon={icons.minus}
                handlePress={() => addToCart(item._id)}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <FormField
                title={"Quentity"}
                value={item.quentity}
                handleInput={(e) => {
                  const li = selectedProduct;
                  li[index].quentity = e;
                  li[index].total = calculateTotal(
                    li[index].price,
                    e,
                    li[index].discount,
                    li[index].SGST,
                    li[index].CGST
                  );
                  setSelectedProduct(li);
                  setIsDataChange(!isDataChange);
                }}
                inputStyle={{
                  width: "30%",
                }}
                inputType={"numeric"}
              />
              <FormField
                title={"Free"}
                value={item.free}
                handleInput={(e) => {
                  const li = selectedProduct;
                  li[index].free = e;
                  setSelectedProduct(li);
                  setIsDataChange(!isDataChange);
                }}
                inputStyle={{
                  width: "30%",
                }}
                inputType={"numeric"}
              />
              <FormField
                title={"Discount"}
                value={item.discount}
                handleInput={(e) => {
                  const li = selectedProduct;
                  li[index].discount = e;
                  li[index].total = calculateTotal(
                    li[index].price,
                    li[index].quentity,
                    e,
                    li[index].SGST,
                    li[index].CGST
                  );

                  setSelectedProduct(li);
                  setIsDataChange(!isDataChange);
                }}
                inputStyle={{
                  width: "30%",
                }}
                inputType={"numeric"}
              />
            </View>
            <View
              style={{
                width: "100%",
                height: 30,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  minWidth: 130,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    color: color.onSurface,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Total:
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: color.onSurface,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {numToINCurrency(item.total)}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: color.onBackgrond,
              }}
            >
              No Item is here
            </Text>
          </View>
        )}
      />
    );
    calculateGrandTotal(selectedProduct);
  }, [isDataChange, selectedProduct]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingBottom: 60,
      }}
    >
      {renderJSX}
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 60,
          flexDirection: "row",
          alignItems: "ceter",
          justifyContent: "space-between",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: color.surface,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            minWidth: 130,
            justifyContent: "space-between",
            alignSelf: "center",
            paddingLeft: 15,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              opacity: 0.8,
              color: color.onSurface,
              fontFamily: "Poppins-Regular",
            }}
          >
            Grant Toatal:{" "}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: color.onSurface,
              fontFamily: "Poppins-Regular",
            }}
          >
            {numToINCurrency(grandTotal)}
          </Text>
        </View>
        <View
          style={{
            width: 100,
            height: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <CustomButton
            handlePress={
              orderData.isLoading || selectedProduct.length === 0
                ? () => {}
                : handleCreateOrder
            }
            title={"Submit"}
            containerStyles={{
              height: 40,
              backgroundColor: color.primary,
              opacity:
                orderData.isLoading || selectedProduct.length === 0 ? 0.7 : 1,
            }}
            textStyle={{
              color: color.onPrimary,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TypeOrder;
