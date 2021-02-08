import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function authPage({ navigation }) {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <ImageBackground
          source={require("../../assets/bg2.jpg")}
          style={styles.bgImage}
        />
        <View
          style={{
            position: "absolute",
            right: "10%",
            marginTop: "20%",
          }}
        >
          <Image
            source={require("../../assets/dot.png")}
            style={{ marginBottom: 10, alignSelf: "flex-end" }}
          />
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            Mount Ushba
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "200",
              alignSelf: "flex-end",
            }}
          >
            Georgia
          </Text>
        </View>
        <Image
          style={styles.logoImage}
          source={require("../../assets/logo.png")}
        />
      </View>
      <View style={styles.bottomContainer}>
        <LinearGradient
          start={[0.2, 0]}
          end={[1, 1]}
          colors={["#4666A0", "#002960"]}
          style={styles.linearBackground}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.buttonFill}
          >
            <Text style={styles.buttonFillTxt}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.buttonOut}
          >
            <Text style={styles.buttonOutText}>Sign Up</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
  },
  logoImage: {
    position: "absolute",
    alignSelf: "center",
    top: "60%",
    height: 61,
    width: 120,
  },
  bgImage: { width: "100%", height: "110%" },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    height: "25%",
    borderTopRightRadius: 50,
    bottom: 0,
    overflow: "hidden",
  },
  linearBackground: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFill: {
    width: "60%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonFillText: {
    color: "#0D346C",
    fontWeight: "normal",
  },
  buttonOut: {
    width: "60%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutText: {
    color: "white",
    fontWeight: "normal",
  },
});

export default authPage;
