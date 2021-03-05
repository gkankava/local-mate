import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, Dimensions, Image } from "react-native";

const Stack = createStackNavigator();
const height = Dimensions.get("screen").height;

import profileStack from "./profile";
import blogStack from "./blog";
import chatScreen from "../components/chat/chatScreen";

import Mod from "../components/shared/assets/modal";

function auth() {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <Stack.Navigator initialRouteName="Blog">
      <Stack.Screen
        name="Blog"
        component={blogStack}
        options={{
          headerShown: true,
          headerTitle: false,
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerStyle: { height: height * 0.18 },
          headerRight: () => (
            <>
              <Mod vis={menuVisible} setVis={setMenuVisible} />
              <TouchableOpacity
                style={{
                  height: height * 0.18 * 0.48,
                  flexDirection: "row",
                  marginRight: 15,
                }}
                onPress={() => {
                  setMenuVisible(!menuVisible);
                  // console.log("click");
                }}
              >
                <Image
                  style={{ alignSelf: "center" }}
                  source={require("../assets/hmb.png")}
                />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={chatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={profileStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default auth;
