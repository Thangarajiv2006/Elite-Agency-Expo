import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { color } from "../../constants/colors";
import CustomButton from "../common/CustomButton";
import { Image } from "react-native";
import icons from "../../constants/icons";

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import FormField from "../common/TextInput";

const AddEditProduct = ({
  visible,
  title,
  onClose,
  handleClick,
  productDetails,
  setproductDetails,
  isLoading,
}) => {
  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setproductDetails({
        ...productDetails,
        pic: result.assets[0],
      });
    } else {
      /* setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100); */
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: "80%",
            height: 500,
            backgroundColor: color.surface,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: color.primary,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                color: color.onPrimary,
                fontSize: 30,
                fontFamily: "Nunito",
                letterSpacing: 1,
              }}
            >
              {title}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              paddingTop: 70,
              paddingBottom: 80,
              width: "100%",
            }}
          >
            <View
              style={{ width: "100%", height: "100%", alignItems: "center" }}
            >
              <View
                style={{ width: "100%", height: 150, alignItems: "center" }}
              >
                <TouchableOpacity style={{ width: "80%" }} onPress={openPicker}>
                  {productDetails.pic ? (
                    <Image
                      source={{ uri: productDetails.pic.uri }}
                      resizeMode="contain"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingVertical: 4,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderStyle: "dashed",
                        borderColor: color.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Image
                        source={icons.download}
                        resizeMode="contain"
                        alt="upload"
                        style={{
                          width: 40,
                          height: 40,
                          tintColor: color.primary,
                        }}
                      />
                      <Text style={{ color: color.onSurface, marginTop: 10 }}>
                        Choose a file
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%" }}>
                <FormField
                  title={"Product Name"}
                  handleInput={(e) =>
                    setproductDetails({ ...productDetails, name: e })
                  }
                  inputType={"default"}
                  value={productDetails.name}
                  inputStyle={{ width: "100%" }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormField
                    title={"M.R.P"}
                    handleInput={(e) =>
                      setproductDetails({ ...productDetails, MRP: e })
                    }
                    inputType={"numeric"}
                    value={productDetails.MRP}
                    inputStyle={{ width: "30%" }}
                  />
                  <FormField
                    title={"Net Price"}
                    handleInput={(e) =>
                      setproductDetails({ ...productDetails, netPrice: e })
                    }
                    inputType={"numeric"}
                    value={productDetails.netPrice}
                    inputStyle={{ width: "30%" }}
                  />
                  <FormField
                    title={"Price"}
                    handleInput={(e) =>
                      setproductDetails({ ...productDetails, price: e })
                    }
                    inputType={"numeric"}
                    value={productDetails.price}
                    inputStyle={{ width: "30%" }}
                  />
                </View>
                <FormField
                  title={"HSN"}
                  handleInput={(e) =>
                    setproductDetails({ ...productDetails, HSN: e })
                  }
                  inputType={"numeric"}
                  value={productDetails.HSN}
                  inputStyle={{ width: "100%" }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormField
                    title={"CGST"}
                    handleInput={(e) =>
                      setproductDetails({ ...productDetails, CGST: e })
                    }
                    inputType={"numeric"}
                    value={productDetails.CGST}
                    inputStyle={{ width: "48%" }}
                  />
                  <FormField
                    title={"SGST"}
                    handleInput={(e) =>
                      setproductDetails({ ...productDetails, SGST: e })
                    }
                    inputType={"numeric"}
                    value={productDetails.SGST}
                    inputStyle={{ width: "48%" }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              height: 70,
              justifyContent: "flex-end",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 100,
              flexDirection: "row",
              backgroundColor: color.surface,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <CustomButton
              handlePress={onClose}
              title={"Close"}
              containerStyles={{
                backgroundColor: color.error,
                width: 70,
                height: 40,
                marginRight: 20,
              }}
              textStyle={{ color: color.onError }}
            />
            <CustomButton
              handlePress={isLoading ? () => {} : handleClick}
              title={"Submit"}
              containerStyles={{
                backgroundColor: color.primary,
                width: 80,
                height: 40,
                marginRight: 20,
                opacity: isLoading ? 0.7 : 1,
              }}
              textStyle={{ color: color.onPrimary }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEditProduct;
