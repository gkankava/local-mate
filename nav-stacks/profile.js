import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import profileScreen from "../components/profile/profileScreen";
import billingScreen from "../components/profile/billingScreen";
import profileSettingsScreen from "../components/profile/profileSettingsScreen";
import settingsScreen from "../components/profile/settingsScreen";

function profile() {
  return (
    <>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Profile"
          component={profileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsBilling"
          component={billingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsProfile"
          component={profileSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={settingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default profile;
