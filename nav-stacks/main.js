import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import profileStack from "./profile";
import blogStack from "./blog";
import chatScreen from "../components/chat/chatScreen";

function auth() {
  return (
    <Stack.Navigator initialRouteName="Blog">
      <Stack.Screen
        name="Blog"
        component={blogStack}
        options={{ headerShown: false }}
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
