import React, { useState } from "react";
import {
  Modal,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
} from "react-native";
import Message from "./message";
import { EvilIcons } from "@expo/vector-icons";

const messages = ({ messagelist, name, pP, urgent }) => {
  const [imgModal, setImgModal] = useState({ state: false, img: "" });

  return (
    <>
      {imgModal.state && <StatusBar backgroundColor="rgba(0,0,0, .9)" />}
      {messagelist.map((message, i) => (
        <Message
          setImgModal={setImgModal}
          message={message}
          name={name}
          key={i}
          pP={pP}
        />
      ))}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imgModal.state}
        onRequestClose={() => {
          setImgModal({ state: false, img: "" });
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0, .9)",
            height: "100%",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              left: 20,
              zIndex: 99,
              backgroundColor: "rgba(0,0,0, .9)",
            }}
            onPress={() => setImgModal({ state: false, img: "" })}
          >
            <EvilIcons name="close" size={40} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: imgModal.img }}
            style={{
              zIndex: -100,
              resizeMode: "contain",
              height: "100%",
              width: "100%",
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default messages;
