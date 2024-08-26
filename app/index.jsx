import { color } from "@/constants/colors";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";
import CustomButton from "../components/common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isAldreadyLogin } from "../actions/auth.action";
import { getData } from "@/store/localStorage";

export default function Index() {
  const Agency = useSelector((state) => state.Agency);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  if (Agency.isLogined) {
    <Redirect href={"/analytics"} />;
  }

  useEffect(() => {
    const dispatchEvent = async () => {
      const token = await getData("token");
      if (token) {
        dispatch(isAldreadyLogin(token));
      }
    };
    setLoading(true);
    dispatchEvent();
    setLoading(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          style={{
            backgroundColor: color.background,
            flex: 1,
            height: "100%",
            position: "relative",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "75%",
              backgroundColor: color.surface,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              bottom: 100,
            }}
          >
            <View style={{ width: 350 }}>
              <Image
                source={images.Analyse}
                resizeMode="contain"
                style={{ width: "100%", height: 300 }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: color.onSurface,
                  fontFamily: "Poppins-Regular",
                  fontWeight: 500,
                  fontSize: 25,
                  textAlign: "center",
                }}
              >
                Build your Buissness with
              </Text>
              <Text
                style={{
                  color: color.primary,
                  fontFamily: "Poppins-Bold",
                  fontWeight: 800,
                  fontSize: 30,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Elite Agency
              </Text>
            </View>
            <CustomButton
              title={loading ? "wait" : "Continue"}
              containerStyles={{
                marginTop: 50,
                backgroundColor: color.primary,
              }}
              textStyle={{
                fontSize: 15,
                color: color.onPrimary,
                fontWeight: 500,
              }}
              handlePress={loading ? () => {} : () => router.push("/sign-in")}
            />
          </View>

          <StatusBar backgroundColor={color.surface} style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
