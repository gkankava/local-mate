import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Menu from "./assets/modal";

import { userContext } from "../../store/contextApi";

const image = require("../../assets/bg2.jpg");
const dots = require("../../assets/dot.png");

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const header = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const { name, profilePicture } = useContext(userContext).user;

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            height: "100%",
          }}
        >
          <View style={styles.profileContainer}>
            <View style={styles.profilePicture}>
              <Image
                source={{
                  uri: profilePicture,
                }}
                style={{ flex: 1, width: null, height: null }}
              />
            </View>
            <View style={styles.profileText}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "200" }}>
                Hello {name}
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                What Are You Looking For?
              </Text>
            </View>
          </View>
          <Menu
            vis={menuVisible}
            setVis={setMenuVisible}
            nav={navigation}
            height={height}
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
              source={require("../../assets/hmb.png")}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: height * 0.18,
  },
  image: {
    height: height * 0.18,
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    // position: "absolute",
    // top: 100,
    // left: 25,
  },
  profilePicture: {
    marginRight: 10,
    height: height * 0.18 * 0.48,
    width: height * 0.18 * 0.48,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 2,
    overflow: "hidden",
  },
  profileText: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-end",
    marginBottom: 17.5,
  },
  menuWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 20,
    padding: 25,
  },
});

export default header;
