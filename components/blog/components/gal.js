import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
// import Gallery from "react-native-photo-gallery";
import Gallery from "react-native-image-gallery";

import { EvilIcons } from "@expo/vector-icons";

const gal = ({ vis, data, setVis, rendNum }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={vis > 0}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: "5%", left: 16, zIndex: 100 }}
        onPress={() => setVis(0)}
      >
        <EvilIcons name="close" size={40} color="white" />
      </TouchableOpacity>
      {/* <Gallery
        initialIndex={vis - 1}
        initialNumToRender={rendNum}
        data={data}
      /> */}
      <Gallery style={{ flex: 1, backgroundColor: "black" }} images={data} />
    </Modal>
  );
};

export default gal;
