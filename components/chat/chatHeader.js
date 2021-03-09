import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("screen").height;
import { Ionicons } from "@expo/vector-icons";

const image = require("../../assets/bg2.jpg");

const chatHeader = ({ username, pP }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.imageBg}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={35} color="white" />
          </TouchableOpacity>
          <View style={styles.centContainer}>
            <View style={styles.pPContainer}>
              <Image style={styles.pP} source={{ uri: pP }} />
              <View style={styles.marker} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                support
              </Text>
              <View
                style={{
                  width: 1,
                  height: 19,
                  backgroundColor: "#E5E5E5",
                  marginLeft: 5,
                  marginRight: 5,
                }}
              />
              <Text style={{ color: "white", fontSize: 12 }}>Local Mate</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.dotContainer}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.18,
    width: "100%",
    backgroundColor: "white",
  },
  imageBg: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  dotContainer: {
    flexDirection: "row",
    width: 28,
    justifyContent: "space-between",
  },
  dot: { height: 6, width: 6, borderRadius: 50, backgroundColor: "white" },
  centContainer: { flexDirection: "column", alignItems: "center" },
  pPContainer: { width: 70 },
  pP: {
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  marker: {
    position: "absolute",
    width: 10,
    height: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#75E910",
    bottom: 2,
    right: 10,
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default chatHeader;
