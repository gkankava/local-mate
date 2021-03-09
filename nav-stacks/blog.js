import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import { Text, TouchableOpacity, Dimensions, Image } from "react-native";
const height = Dimensions.get("screen").height;

import blogScreen from "../components/blog/blogScreen";
import postScreen from "../components/blog/postScreen";

import Mod from "../components/shared/assets/modal";

function auth() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Stack.Navigator initialRouteName="BlogScreen">
      <Stack.Screen
        name="BlogScreen"
        component={blogScreen}
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
        name="PostScreen"
        component={postScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default auth;
