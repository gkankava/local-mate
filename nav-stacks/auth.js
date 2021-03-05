import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import authScreen from "../components/auth/authScreen";
import loginScreen from "../components/auth/loginScreen";
import signUpScreen from "../components/auth/signUpScreen";
import verifyScreen from "../components/auth/verifyScreen";
import resetScreen from "../components/auth/resetPasswordScreen";

function auth() {
  return (
    <>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={authScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={loginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={signUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verify"
          component={verifyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reset"
          component={resetScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default auth;
