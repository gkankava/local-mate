import React from "react";
import { View, Text } from "react-native";

import TabNavigation from "../shared/btn-component/botTabNavigator";

import Header from "../shared/header";

function blogScreen() {
  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>blog screen </Text>
        <TabNavigation />
      </View>
    </>
  );
}

export default blogScreen;
