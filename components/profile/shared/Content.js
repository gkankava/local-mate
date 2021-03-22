import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height;

const Content = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: height,
    width: "100%",
    left: 0,
    top: height * 0.22 - 50,
    position: "absolute",
    borderTopRightRadius: 50,
    paddingTop: 53,
    paddingBottom: 53,
  },
});

export default Content;
