import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  //   Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function ImagePrev({ vis, setVis, clearSelectedMedia, img, upload }) {
  const [ar, setAr] = useState(0);

  useEffect(() => {
    if (img) {
      if (img.uri) {
        Image.getSize(img.uri, (width, height) => {
          setAr(width / height);
        });
      }
    }
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={vis}
      onRequestClose={() => {
        setVis(false);
      }}
      statusBarTranslucent={true}
    >
      {img ? (
        <View style={styles.contaier}>
          <TouchableOpacity
            onPress={() => {
              setVis(false);
              clearSelectedMedia();
            }}
            style={{ alignSelf: "flex-start", marginLeft: 25 }}
          >
            <Ionicons name="ios-close-sharp" size={35} color="white" />
          </TouchableOpacity>
          <Image
            style={
              ar > 1
                ? { width: width, height: width * ar }
                : ar < 1
                ? { width: width * ar, height: height * 0.7 }
                : { width: width, height: width }
            }
            source={{ uri: img.uri }}
          />
          <View style={styles.botContainer}>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                setVis(false);
                clearSelectedMedia();
              }}
            >
              <Text style={styles.btnText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                upload();
                setVis(false);
              }}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "rgba(0,0,0,1)",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botContainer: {
    padding: 25,
    paddingBottom: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  btnContainer: {
    backgroundColor: "#31E4A4",
    paddingTop: 15,
    paddingBottom: 15,
    width: 130,
    borderRadius: 50,
    alignItems: "center",
  },
  btnText: { color: "white", fontSize: 18 },
});

export default ImagePrev;
