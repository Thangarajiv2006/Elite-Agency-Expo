import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../constants/colors";
import FormField from "../../components/common/TextInput";
import CustomButton from "../../components/common/CustomButton";
import { Link, router } from "expo-router";
import createAxiosInstance from "../../helpers/axios";

const Signup = () => {
  const [agencyDetails, setAgencyDetails] = useState({
    agencyName: "",
    houseNo: "",
    street: "",
    village: "",
    district: "",
    state: "",
    stateCode: "",
    pincode: "",
    name: "",
    mobile: "",
    email: "",
    FSSAI: "",
    PAN: "",
    GSTIN: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const axios = await createAxiosInstance();

    if (loading) {
      return;
    }
    for (const key in agencyDetails) {
      if (!agencyDetails[key]) {
        Alert.alert("Error", "Please Enter All inputs ");
        return;
      }
    }
    setLoading(true);
    const res = await axios.post("/agency/auth/sign-up", agencyDetails);

    setLoading(false);
    if (res.data.errorCode) {
      Alert.alert(res.data.errorMessage);
    } else if (res.status === 201) {
      setAgencyDetails({
        agencyName: "",
        houseNo: "",
        street: "",
        village: "",
        district: "",
        state: "",
        stateCode: "",
        pincode: "",
        name: "",
        mobile: "",
        email: "",
        FSSAI: "",
        PAN: "",
        GSTIN: "",
        password: "",
      });
      router.push("/sign-in");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          backgroundColor: color.background,
        }}
      >
        <View style={{ backgroundColor: color.surface, padding: 15 }}>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: color.onSurface,
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                fontWeight: 900,
              }}
            >
              Signup
            </Text>
          </View>
          <View>
            <FormField
              title={"Agency Name"}
              handleInput={(e) =>
                setAgencyDetails({ ...agencyDetails, agencyName: e })
              }
              inputType={"default"}
              value={agencyDetails.agencyName}
              inputStyle={{ width: "100%" }}
            />
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "Poppins-Regular",
                  fontWeight: 700,
                  color: color.onSurface,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Adress
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",

                  marginTop: 10,
                }}
              >
                <FormField
                  title={"House No"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, houseNo: e })
                  }
                  inputType={"default"}
                  value={agencyDetails.houseNo}
                  inputStyle={{ width: "35%" }}
                />
                <FormField
                  title={"Street"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, street: e })
                  }
                  inputType={"default"}
                  value={agencyDetails.street}
                  inputStyle={{ width: "60%" }}
                />
              </View>
              <FormField
                title={"Village"}
                handleInput={(e) =>
                  setAgencyDetails({ ...agencyDetails, village: e })
                }
                inputType={"default"}
                value={agencyDetails.village}
                inputStyle={{ width: "100%", marginTop: 10 }}
              />
              <FormField
                title={"District"}
                handleInput={(e) =>
                  setAgencyDetails({ ...agencyDetails, district: e })
                }
                inputType={"default"}
                value={agencyDetails.district}
                inputStyle={{ width: "100%", marginTop: 10 }}
              />
              <FormField
                title={"State"}
                handleInput={(e) =>
                  setAgencyDetails({ ...agencyDetails, state: e })
                }
                inputType={"default"}
                value={agencyDetails.state}
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
                    setAgencyDetails({ ...agencyDetails, stateCode: e })
                  }
                  inputType={"numeric"}
                  value={agencyDetails.stateCode}
                  inputStyle={{ width: "35%" }}
                />
                <FormField
                  title={"Pincode"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, pincode: e })
                  }
                  inputType={"numeric"}
                  value={agencyDetails.pincode}
                  inputStyle={{ width: "60%" }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: "Poppins-Regular",
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
                    setAgencyDetails({ ...agencyDetails, name: e })
                  }
                  inputType={"default"}
                  value={agencyDetails.name}
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
                      setAgencyDetails({ ...agencyDetails, mobile: e })
                    }
                    inputType={"numeric"}
                    value={agencyDetails.mobile}
                    inputStyle={{ width: "35%", marginTop: 10 }}
                  />
                  <FormField
                    title={"E-mail"}
                    handleInput={(e) =>
                      setAgencyDetails({ ...agencyDetails, email: e })
                    }
                    inputType={"email-address"}
                    value={agencyDetails.email}
                    inputStyle={{ width: "60%", marginTop: 10 }}
                  />
                </View>
                <FormField
                  title={"FSSAI Code"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, FSSAI: e })
                  }
                  inputType={"numeric"}
                  value={agencyDetails.FSSAI}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
                <FormField
                  title={"PAN Number"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, PAN: e })
                  }
                  inputType={"default"}
                  value={agencyDetails.PAN}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
                <FormField
                  title={"GSTN No"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, GSTIN: e })
                  }
                  inputType={"Default"}
                  value={agencyDetails.GSTIN}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
                <FormField
                  title={"Password"}
                  handleInput={(e) =>
                    setAgencyDetails({ ...agencyDetails, password: e })
                  }
                  value={agencyDetails.password}
                  inputStyle={{ width: "100%", marginTop: 10 }}
                />
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop: 15 }}>
            <CustomButton
              title={loading ? "loading" : "Create an Account"}
              handlePress={handleSignup}
              containerStyles={{
                backgroundColor: color.primary,
                opacity: loading ? 0.5 : 1,
                width: "100%",
              }}
              textStyle={{
                color: color.onPrimary,
                fontSize: 13,
                fontWeight: 500,
              }}
            />
            <Text
              style={{
                marginTop: 10,
                color: color.onSurface,
              }}
            >
              Aldready have an account?{"  "}
              <Link
                href={"/sign-in"}
                style={{
                  color: color.additionalColors.links,
                }}
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor={color.surface} style="light" />
    </SafeAreaView>
  );
};

export default Signup;
