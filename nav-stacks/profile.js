import React, { useState } from "react";

import { Text, TouchableOpacity, Dimensions, Image } from "react-native";
const height = Dimensions.get("screen").height;

import Mod from "../components/shared/assets/modal";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import profileScreen from "../components/profile/profileScreen";
import billingScreen from "../components/profile/billingScreen";
import profileSettingsScreen from "../components/profile/profileSettingsScreen";
import settingsScreen from "../components/profile/settingsScreen";

import Notifications from "../components/profile/Notifications";
import Membership from "../components/profile/Membership";
import Favorites from "../components/profile/Favorites";
import Share from "../components/profile/Share";
import Help from "../components/profile/Help";

function profile() {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Profile"
          component={profileScreen}
          options={{
            headerShown: true,
            headerTitle: false,
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerStyle: {
              height: height * 0.15,
            },
            headerLeftContainerStyle: { marginLeft: 25, opacity: 0 },
            headerRightContainerStyle: { marginRight: 25 },
            headerRight: () => (
              <>
                <Mod
                  vis={menuVisible}
                  setVis={setMenuVisible}
                  profileStack={true}
                />
                <TouchableOpacity
                  style={{
                    height: height * 0.18 * 0.48,
                    flexDirection: "row",
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
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Membership"
          component={Membership}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Share"
          component={Share}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default profile;
