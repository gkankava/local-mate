import React from "react";
import { View, Text, Image } from "react-native";

function profileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 140,
      }}
    >
      <View>
        <Text>profile screen </Text>
        {/* <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 90,
            width: "100%",
            backgroundColor: "red",
          }}
        >
          <Image source={require("../../assets/svg/bot.png")} />
        </View> */}
      </View>
    </View>
  );
}

export default profileScreen;
