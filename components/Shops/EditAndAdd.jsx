import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import CustomButton from "../common/CustomButton";
import FormField from "../common/TextInput";
import { color } from "../../constants/colors";

const EditAndAdd = ({
  visible,
  title,
  onClose,
  handleClick,
  buttonText,
  shopDetails,
  setShopDetails,
  isLoading,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={{
            width: "90%",
            height: "90%",
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
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              paddingTop: 70,
              paddingBottom: 80,
              width: "100%",
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ width: "100%" }}>
              <FormField
                title={"Shop Name"}
                handleInput={(e) =>
                  setShopDetails({ ...shopDetails, shopName: e })
                }
                inputType={"default"}
                value={shopDetails.shopName}
                inputStyle={{ width: "100%" }}
              />
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontFamily: "Nunito",
                    fontWeight: 700,
                    color: color.onSurface,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  Adress
                </Text>
                <FormField
                  title={"Village"}
                  handleInput={(e) =>
                    setShopDetails({ ...shopDetails, village: e })
                  }
                  inputType={"default"}
                  value={shopDetails.village}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
                <FormField
                  title={"District"}
                  handleInput={(e) =>
                    setShopDetails({ ...shopDetails, district: e })
                  }
                  inputType={"default"}
                  value={shopDetails.district}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
                <FormField
                  title={"State"}
                  handleInput={(e) =>
                    setShopDetails({ ...shopDetails, state: e })
                  }
                  inputType={"default"}
                  value={shopDetails.state}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <FormField
                    title={"State code"}
                    handleInput={(e) =>
                      setShopDetails({ ...shopDetails, stateCode: e })
                    }
                    inputType={"numeric"}
                    value={shopDetails.stateCode}
                    inputStyle={{ width: "35%" }}
                  />
                  <FormField
                    title={"Pincode"}
                    handleInput={(e) =>
                      setShopDetails({ ...shopDetails, pincode: e })
                    }
                    inputType={"numeric"}
                    value={shopDetails.pincode}
                    inputStyle={{ width: "60%" }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    marginTop: 20,
                    fontFamily: "Nunito",
                    fontWeight: 700,
                    color: color.onSurface,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  Persnal Details
                </Text>
                <View>
                  <FormField
                    title={"Name"}
                    handleInput={(e) =>
                      setShopDetails({ ...shopDetails, name: e })
                    }
                    inputType={"default"}
                    value={shopDetails.name}
                    inputStyle={{ width: "100%", marginTop: 10 }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormField
                      title={"Mobile"}
                      handleInput={(e) =>
                        setShopDetails({ ...shopDetails, mobile: e })
                      }
                      inputType={"numeric"}
                      value={shopDetails.mobile}
                      inputStyle={{ width: "45%", marginTop: 10 }}
                    />
                  </View>
                  <FormField
                    title={"FSSAI Code"}
                    handleInput={(e) =>
                      setShopDetails({ ...shopDetails, FSSAI: e })
                    }
                    inputType={"numeric"}
                    value={shopDetails.FSSAI}
                    inputStyle={{ width: "100%", marginTop: 10 }}
                  />
                  <FormField
                    title={"PAN Number"}
                    handleInput={(e) =>
                      setShopDetails({ ...shopDetails, PAN: e })
                    }
                    inputType={"default"}
                    value={shopDetails.PAN}
                    inputStyle={{ width: "100%", marginTop: 10 }}
                  />
                  <FormField
                    title={"GSTN No"}
                    handleInput={(e) =>
                      setShopDetails({ ...shopDetails, GSTIN: e })
                    }
                    inputType={"Default"}
                    value={shopDetails.GSTIN}
                    inputStyle={{ width: "100%", marginTop: 10 }}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default EditAndAdd;
