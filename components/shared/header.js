import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Menu from "./assets/modal";

import { userContext } from "../../store/contextApi";

const image = require("../../assets/bg2.jpg");
const dots = require("../../assets/dot.png");

const header = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const { name, profilePicture } = useContext(userContext).user;

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Menu vis={menuVisible} setVis={setMenuVisible} nav={navigation} />
        <View style={styles.menuWrapper}>
          <View style={{}}>
            <Image source={dots} style={{ marginBottom: 10 }} />
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              Mount Ushba
            </Text>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "200" }}>
              Georgia
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setMenuVisible(!menuVisible);
            }}
          >
            <Image source={require("../../assets/hmb.png")} />
          </TouchableOpacity>
        </View>
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
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              What Are You Looking For?
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 200,
  },
  image: {
    height: 435,
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
    position: "absolute",
    top: 140,
    left: 25,
  },
  profilePicture: {
    marginRight: 10,
    height: 50,
    width: 50,
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
    top: 30,
    padding: 25,
  },
});

export default header;
