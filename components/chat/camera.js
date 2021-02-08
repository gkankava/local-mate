import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const camera = ({ status, setStatus, setMedia, send }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [camPrev, setCamPrev] = useState(true);
  const [imgPrev, setImagePrev] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: false,
      });
      if (photo) {
        setImagePrev(photo.uri);
        setMedia({
          uri: photo.uri,
          name: photo.uri.slice(photo.uri.lastIndexOf("/") + 1),
          type: `image/${photo.uri.slice(photo.uri.lastIndexOf(".") + 1)}`,
        });
        if (imgPrev) {
          setCamPrev(false);
        }
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={status}
      onRequestClose={() => {
        setStatus(false);
        setCamPrev(true);
        setImagePrev(null);
      }}
    >
      {status && <StatusBar backgroundColor="rgba(0,0,0, 1)" />}
      {camPrev ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStatus(false)}
            >
              <AntDesign name="close" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={() => takePicture()}>
              <Entypo name="circle" size={75} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialIcons name="flip-camera-ios" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <ImageBackground
          source={{ uri: imgPrev }}
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 30,
              width: Dimensions.get("window").width,
              height: 80,
              flex: 1,
              borderRadius: 30,
              backgroundColor: "rgba(255,255,255, .2)",
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={{}} onPress={() => setCamPrev(true)}>
              <AntDesign name="close" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                send();
                setCamPrev(true);
                setStatus(false);
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  fontWeight: "100",
                }}
              >
                Send{"  "}
              </Text>
              <FontAwesome name="send" size={35} color="#85C8D5" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        //   </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  camera: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: Dimensions.get("window").width,
    //  width: "100%",
    height: 100,
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  closeButton: {},
  button: {},
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default camera;
