import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import blogScreen from "../components/blog/blogScreen";
import postScreen from "../components/blog/postScreen";

function auth() {
  return (
    <Stack.Navigator initialRouteName="BlogScreen">
      <Stack.Screen
        name="BlogScreen"
        component={blogScreen}
        options={{ headerShown: false }}
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
