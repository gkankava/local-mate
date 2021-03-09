import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  //   Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const ProfilePictureModal = ({ vis, setVis, openPicker, openCam }) => {
  const checkMediaLibraryPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("You have to grant media library permissions");
      } else {
        openPicker();
      }
    }
  };
  const checkCameraPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Camera.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You have to grant camera permissions");
      } else {
        setVis(false);
        openCam(true);
      }
    }
  };

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
      <View style={styles.backdrop}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={vis}
          onRequestClose={() => {
            setVis(false);
          }}
          statusBarTranslucent={true}
        >
          <View
            style={styles.container}
            onStartShouldSetResponder={() => {
              setVis(false);
            }}
          />
          <View style={styles.optionsContainer}>
            <Text style={styles.title}>Edit Profile Photo</Text>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => {
                checkMediaLibraryPermissionAsync();
              }}
            >
              <View
                style={{ ...styles.iconWrapper, backgroundColor: "#C2E438" }}
              >
                <MaterialIcons name="camera-alt" size={18} color="white" />
              </View>
              <Text style={styles.btnTitle}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btnWrapper, marginBottom: 0 }}
              onPress={() => {
                checkCameraPermissionAsync();
              }}
            >
              <View
                style={{ ...styles.iconWrapper, backgroundColor: "#85C8D5" }}
              >
                <MaterialIcons name="photo-library" size={18} color="white" />
              </View>
              <Text style={styles.btnTitle}>Camera</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.1)" },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  optionsContainer: {
    backgroundColor: "white",
    paddingTop: 25,
    paddingBottom: 30,
    paddingLeft: 25,
    zIndex: 1000,
  },
  title: { color: "#85C8D5", fontSize: 16, marginBottom: 15 },
  btnWrapper: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  btnTitle: { fontSize: 14, marginLeft: 10 },
});
export default ProfilePictureModal;
