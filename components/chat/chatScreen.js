import React, { useEffect, useContext, useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from "react-native";
import env from "expo-constants";
import io from "socket.io-client";
import axios from "axios";
import { userContext } from "../../store/contextApi";
import { useFocusEffect } from "@react-navigation/native";

import ChatHeader from "./chatHeader";

import { Stopwatch } from "react-native-stopwatch-timer";

import Messages from "./messages";

import { fetchChat } from "../../handlers/fetchChat";

import * as ImagePicker from "expo-image-picker";
import Camera from "./camera";
import { Audio } from "expo-av";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../shared/header";

import {
  addKeyboardListener,
  removeKeyboardListener,
} from "../../handlers/keyboardDetect";

const ENDPOINT = env.manifest.extra.proxy;
let socket;

function chatScreen() {
  const user = useContext(userContext);

  const [camActive, setCamActive] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [media, setMedia] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState();

  const [uploadedMedia, setUploadedMedia] = useState();

  const [animVal, setAnimVal] = useState(new Animated.Value(1));
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need Audio permissions to make this work!");
        }
      }
    })();

    const { name, room } = {
      name: user.user.username,
      room: `${user.user.username}-chat-room`,
    };
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {});

    return () => {
      setMessage();
      setMedia();
      setUploadedMedia();

      socket.emit("disconnectRes");
      socket.off();
    };
  }, []);

  //Keyboard avoiding View

  const [keyboardActive, setKeyboardActive] = useState(false);
  const [keyBoardHeight, setKeyboardHeight] = useState(0);

  const _keyboardDidShow = (e) => {
    setKeyboardActive(true);
    setKeyboardHeight(e.endCoordinates.height);
    scrollViewRef.current.scrollToEnd({ animated: false });
  };

  const _keyboardDidHide = () => {
    setKeyboardActive(false);
    setKeyboardHeight(0);
  };

  useFocusEffect(
    React.useCallback(() => {
      addKeyboardListener(_keyboardDidShow, _keyboardDidHide);
      return () => {
        removeKeyboardListener(_keyboardDidShow, _keyboardDidHide);
      };
    }, [])
  );

  //socket -----

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const sendMessage = (event) => {
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  //SOCKET send media

  const sendMedia = () => {
    //upload media--> send Url, in message, if message is http://proxy/uploads/media then check type of media, display image || video || recording
    if (uploadedMedia) {
      socket.emit("sendMessage", uploadedMedia, () => setUploadedMedia());
    }
  };

  const uploadMedia = async () => {
    const formData = new FormData();
    if (media) {
      formData.append("item", {
        uri: media.uri,
        type: media.type,
        name: media.name,
      });
      try {
        await axios
          .post(`${ENDPOINT}/api/upload/media`, formData, {
            headers: {
              Accept: "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            setMedia(undefined);
            if (res.data.isUploaded) {
              let url = res.data.url;
              setUploadedMedia(url);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //media upload

  useEffect(() => {
    if (uploadedMedia) {
      sendMedia();
    }
  }, [uploadedMedia]);

  //MEDIA LIBRARY image picker

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMedia({
        name: result.uri.slice(result.uri.lastIndexOf("/") + 1),
        uri: result.uri,
        type: "image/jpg",
      });
    }
  };

  // RECORDING: sound recorder

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    setMedia({
      name: uri.slice(uri.lastIndexOf("/") + 1),
      uri: uri,
      type: `audio/${uri.slice(uri.lastIndexOf("."))}`,
    });

    const sound = new Audio.Sound();
  }

  // fetch && sort && unshift

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchChat();
  }, []);

  const fetchChat = () => {
    setIsFetching(true);
    axios
      .get(`${ENDPOINT}/api/chat/${user.user.username}`)
      .then((res) => {
        setIsFetching(false);
        // add to messages
        // console.log(res.data);
        setMessages([...res.data]);
      })
      .catch((err) => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  }, [messages]);

  // Animations

  const onAirAnimation = () => {
    Animated.loop(
      Animated.timing(animVal, {
        toValue: 0.4,
        timing: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const animatedStyle = {
    opacity: animVal,
  };

  const options = {
    text: {
      fontSize: 13,
      color: "#B5B4B4",
      marginLeft: 7,
    },
  };

  const recordingIcon = () => {
    if (isRecording) {
      return {
        height: 25,
        width: 25,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "rgb(20, 113, 155)",
      };
    } else {
      return {
        height: 20,
        width: 16,
      };
    }
  };

  return (
    <>
      <ChatHeader
        username={user.user.username}
        pP={ENDPOINT + user.user.profilePicture}
      />
      <ScrollView
        style={styles.chatArea}
        ref={scrollViewRef}
        onContentSizeChange={
          scrollViewRef.current
            ? scrollViewRef.current.scrollToEnd({ animated: false })
            : null
        }
        contentContainerStyle={{ paddingBottom: 25, paddingTop: 25 }}
      >
        <Messages
          messagelist={messages}
          name={user.user.name || user.user.username}
          pP={ENDPOINT + user.user.profilePicture}
        />
      </ScrollView>

      <View style={{ ...styles.inputArea, marginBottom: keyBoardHeight }}>
        <View style={styles.inputTop}>
          {isRecording ? (
            <View
              style={{
                ...styles.textInput,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Animated.View
                style={{
                  ...animatedStyle,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: "#D33333",
                    borderRadius: 50,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: "#D33333",
                      borderRadius: 50,
                      borderWidth: 3,
                      borderColor: "white",
                      alignSelf: "center",
                    }}
                  />
                </View>
              </Animated.View>
              <Stopwatch
                laps={false}
                msecs={false}
                start={stopwatchStart}
                reset={stopwatchReset}
                options={options}
              />
            </View>
          ) : (
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={(value) => {
                setMessage(value);
              }}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              placeholder="Type a Message"
            />
          )}

          {media ? (
            <View tyle={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  uploadMedia();
                }}
              >
                <MaterialCommunityIcons
                  name="send-circle"
                  size={33}
                  color="#14859B"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              {isRecording ? null : (
                <Image
                  style={{
                    ...styles.iconTop,
                    marginRight: 10,
                  }}
                  source={require("./assets/iconUrgent.png")}
                />
              )}
              <TouchableWithoutFeedback
                delayLongPress={300}
                onPressIn={() => {
                  setstopwatchReset(false);

                  setIsRecording(true);
                  onAirAnimation();
                }}
                onLongPress={() => {
                  console.log("recording has started");
                  startRecording();
                  setStopwatchStart(true);
                }}
                onPressOut={() => {
                  setIsRecording(false);
                  stopRecording();
                  setStopwatchStart(false);
                  setstopwatchReset(true);
                }}
              >
                <Image
                  style={recordingIcon()}
                  source={require("./assets/iconMic.png")}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <View style={styles.inputBottom}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              setCamActive(true);
            }}
          >
            <Image
              style={styles.iconBottom}
              source={require("./assets/iconCamera.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.iconBottom}
              source={require("./assets/iconImage.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Camera
        status={camActive}
        setStatus={setCamActive}
        send={uploadMedia}
        media={media}
        setMedia={setMedia}
      />
    </>
  );
}

const styles = StyleSheet.create({
  chatArea: {
    padding: 15,
    backgroundColor: "white",
  },
  inputArea: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "column",
    width: "100%",
    height: 115,
    borderTopWidth: 0.5,
    borderColor: "#E0E0E0",
    backgroundColor: "white",
  },
  inputTop: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: { flexDirection: "row" },
  inputBottom: { flexDirection: "row" },
  textInput: { flex: 1, height: 35, marginRight: 10 },
  iconTop: { height: 20, width: 16 },
  iconBottom: { height: 18, width: 20 },
});

export default chatScreen;
