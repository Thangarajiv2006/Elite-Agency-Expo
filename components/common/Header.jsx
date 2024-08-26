import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { color } from "../../constants/colors";
import icons from "../../constants/icons";
import SearchInput from "./SearchButton";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth.action";

const Header = ({ agencyName, backNav, onNav }) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: color.surface,
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      <View
        style={{
          backgroundColor: color.surface,
          width: "100%",
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginRight: 30 }}
            onPress={onNav}
          >
            {backNav ? (
              <Image
                source={icons.backNav}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: color.primary }}
              />
            ) : (
              <Image
                source={icons.user}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: color.primary }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: color.onSurface,
                fontWeight: "900",
                letterSpacing: 1,
                fontSize: 15,
                marginRight: 10,
                opacity: 0.7,
              }}
            >
              {agencyName}
            </Text>
          </View>
        </View>

        {backNav ? (
          <></>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 90,
            }}
          >
            <TouchableOpacity>
              <Image
                source={icons.bell}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: color.onSurface,
                  opacity: 0.9,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: color.onSurface,
                  opacity: 0.9,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(logout())}>
              <Image
                source={icons.signout}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: color.onSurface,
                  opacity: 0.9,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ alignItems: "center" }}></View>
    </View>
  );
};

export default Header;
