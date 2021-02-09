import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import profileStack from "./profile";
import blogScreen from "../components/blog/blogScreen";
import chatScreen from "../components/chat/chatScreen";

import TabNavigation from "../components/shared/btn-component/botTabNavigator";

function auth() {
  return (
    <Stack.Navigator initialRouteName="Blog">
      <Stack.Screen
        name="Blog"
        component={blogScreen}
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
