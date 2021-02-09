import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";

const botTabNavigator = () => {
  const nav = useNavigation();
  return (
    <View style={{ position: "absolute", bottom: 0, height: 90 }}>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: Dimensions.get("window").width / 9,
          bottom: 30,
          zIndex: 2,
        }}
        onPress={() => {
          nav.navigate("Blog");
        }}
      >
        <Image source={require("./assets/blog.png")}></Image>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: Dimensions.get("window").width / 9,
          bottom: 30,
          zIndex: 2,
        }}
        onPress={() => {
          nav.navigate("Profile");
        }}
      >
        <Image source={require("./assets/profile.png")}></Image>
      </TouchableOpacity>
      <Image
        style={{
          width: Dimensions.get("window").width,
          height: 100,
        }}
        source={require("./assets/bottombar.png")}
      ></Image>
      <TouchableOpacity
        style={{ position: "absolute", alignSelf: "center", bottom: 32 }}
        onPress={() => {
          nav.navigate("Chat");
        }}
      >
        <Image source={require("./assets/chaticon.png")}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default botTabNavigator;
