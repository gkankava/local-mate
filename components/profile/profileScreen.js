import React from "react";
import { View, Text, Image } from "react-native";
import TabNavigation from "../shared/btn-component/botTabNavigator";

import Header from "../shared/header";

function profileScreen() {
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
        <Text>Profile screen </Text>
        <TabNavigation />
      </View>
    </>
  );
}

export default profileScreen;
