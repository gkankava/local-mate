import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import Header from "../shared/header";

import profileStack from "../../nav-stacks/profile";
import blogScreen from "../blog/blogScreen";
import chatScreen from "../chat/chatScreen";

function mainScreen() {
  return (
    <>
      {/* <Header /> */}
      {/* shared screen view on top of bottom tab navigation */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
        }}
      >
        {/* <Tab.Navigator>
          <Tab.Screen name="Blog" component={blogScreen} />
          <Tab.Screen
            name="Chat"
            component={chatScreen}
            options={{ tabBarVisible: false }}
          />
          <Tab.Screen name="Profile" component={profileStack} />
        </Tab.Navigator> */}

        <View style={{ position: "absolute", bottom: 0, height: 90 }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: Dimensions.get("window").width / 9,
              bottom: 30,
              zIndex: 2,
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
          >
            <Image source={require("./assets/chaticon.png")}></Image>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export default mainScreen;
