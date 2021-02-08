import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import mainScreen from "../components/main/mainScreen";

function auth() {
  const fetchInitialData = async (key) => {
    const { data } = await axios.get(
      `http://localhost:8081/api/get_initial/Test01`
    );
    return data;
  };

  return (
    <>
      {/* {isSuccess ? ( */}
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View> */}
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={mainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* ) : isLoading ? ( */}
      {/* ) : null} */}
    </>
  );
}

export default auth;
