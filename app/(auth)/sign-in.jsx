import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../constants/colors";
import FormField from "../../components/common/TextInput";
import CustomButton from "../../components/common/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.action";

const Login = () => {
  const Agency = useSelector((state) => state.Agency);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Agency.errorCode) {
      Alert.alert("Error", Agency.errorMessage);
    }
  }, [Agency]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleLogin = async () => {
    if (!isValidEmail(email) || !password) {
      Alert.alert("Error", "Please enter all the inputs");
    } else if (!isValidEmail(email)) {
      Alert.alert("Error", "Please the valid Email");
    } else {
      await dispatch(login({ email, password }));
    }
  };

  return (
    <SafeAreaView>
      <View style={style.wrapper}>
        <View style={style.container}>
          <View style={style.title}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: color.onSurface,
                fontSize: 30,
                fontWeight: 900,
              }}
            >
              Login
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 400 - 75,
              padding: 20,
            }}
          >
            <FormField
              title={"Email"}
              inputType={"email-address"}
              value={email}
              handleInput={(e) => setEmail(e)}
            />
            <FormField
              title={"Password"}
              inputType={"default"}
              value={password}
              handleInput={(e) => setPassword(e)}
              inputStyle={{ marginTop: 20 }}
            />
            <CustomButton
              title={"Login"}
              handlePress={Agency.isLoading ? () => {} : handleLogin}
              containerStyles={{
                width: "100%",
                backgroundColor: color.primary,
                marginTop: 20,
                opacity: Agency.isLoading ? 0.7 : 1,
              }}
              textStyle={{ color: color.onPrimary }}
            />
            <Text
              style={{
                marginTop: 10,
                color: color.onSurface,
              }}
            >
              You're not a Member?{"  "}
              <Link
                href={"/sign-up"}
                style={{
                  color: color.additionalColors.links,
                }}
              >
                Sign-Up
              </Link>
            </Text>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={color.background} style="light" />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: color.background,
  },
  container: {
    width: "90%",
    height: 400,
    backgroundColor: color.surface,
    borderStyle: "solid",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: color.secondaryColors.borders,
  },
  title: {
    width: "100%",
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.surface,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default Login;
