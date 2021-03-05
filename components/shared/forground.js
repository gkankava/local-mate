import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "./assets/modal";
import { useNavigation } from "@react-navigation/native";

const h = Dimensions.get("screen").height;

const Forground = ({
  menuVisible,
  setMenuVisible,
  name,
  pp,
  opacity,
  display,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        paddingBottom: 65,
        paddingTop: 55,
        opacity: opacity,
        display: display,
      }}
    >
      {/* top */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={require("../../assets/dot.png")}
            style={{ marginBottom: 10 }}
          />
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            Mount Ushba
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "200",
            }}
          >
            Georgia
          </Text>
        </View>
        {/* <Modal
          vis={menuVisible}
          setVis={setMenuVisible}
          nav={navigation}
          height={h}
        />
        <TouchableOpacity
          style={{
            height: h * 0.18 * 0.48,
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
        </TouchableOpacity> */}
      </View>
      {/* profile container */}
      <View
        style={{
          ...styles.profileContainer,
        }}
      >
        <View style={styles.profilePicture}>
          <Image
            source={{
              uri: pp,
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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
  },
  profilePicture: {
    marginRight: 10,
    height: h * 0.18 * 0.48,
    width: h * 0.18 * 0.48,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 2,
    overflow: "hidden",
  },
  profileText: {
    flexDirection: "column",
    alignSelf: "center",
  },
});

export default Forground;
