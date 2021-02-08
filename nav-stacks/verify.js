import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import verifyScreen from "../components/verify/verifyScreen";
import confirmationScreen from "../components/verify/confirmationScreen";

function verify() {
  return (
    <>
      <Stack.Navigator initialRouteName="Verify">
        <Stack.Screen
          name="Verify"
          component={verifyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmation"
          component={confirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default verify;
