import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import env from "expo-constants";

import { Audio } from "expo-av";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const message = ({
  message: { user, text },
  name,
  pP,
  urgent,
  setImgModal,
}) => {
  const [sound, setSound] = React.useState();

  const [type, setType] = React.useState();
  const [imgUri, setImgUri] = React.useState();
  const [soundUri, setSoundUri] = React.useState();
  const [duration, setDuration] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [val, setVal] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isPlaying) {
      playSoundAnim();
    } else {
      val.setValue(0);
    }
  }, [isPlaying]);

  let isSentByUser = false;
  let fullUrl;

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync().then((res) => {
      setDuration(res.durationMillis);
      // playSoundAnim();
      setTimeout(() => {
        setIsPlaying(false);
      }, res.durationMillis);
    });
  }

  async function stopSound() {
    sound.stopAsync();
    setIsPlaying(false);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByUser = true;
  }
  React.useEffect(() => {
    if (text.includes("/uploads/media")) {
      fullUrl = env.manifest.extra.proxy + text;
      if (
        text.slice(text.lastIndexOf(".")) === ".caf" ||
        text.slice(text.lastIndexOf(".")) === ".m4a"
      ) {
        setType("audio");
        setSoundUri(fullUrl);
      } else {
        setType("image");
        setImgUri(fullUrl);
      }
    }
  }, []);

  //animation

  const playSoundAnim = () => {
    Animated.timing(val, {
      toValue: 180,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const playAnimationStyle = {
    transform: [
      {
        translateX: val,
      },
    ],
  };

  return isSentByUser ? (
    <>
      {type === "image" ? (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "flex-end",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#14859B",
              borderRadius: 15,
              borderBottomRightRadius: 0,
              borderColor: "#106C7E",
              borderWidth: 1,
              maxWidth: "80%",
              minHeight: 100,
              maxHeight: 400,
            }}
          >
            <TouchableOpacity
              onPress={() => setImgModal({ state: true, img: imgUri })}
            >
              <Image
                style={{
                  height: 250,
                  minWidth: 200,
                  maxWidth: 200,
                  borderColor: "#F2F2F2",
                  borderRadius: 10,
                  borderRadius: 15,
                  borderBottomRightRadius: 0,
                }}
                source={{ uri: imgUri }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              marginLeft: 10,
            }}
          >
            <Image
              source={{
                uri: pP,
              }}
              style={{ flex: 1, width: 40, height: 40, borderRadius: 50 }}
            />
            <View
              style={{
                position: "absolute",
                height: 12,
                width: 12,
                backgroundColor: "#75E910",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "white",
                left: "70%",
                top: "70%",
              }}
            />
          </View>
        </View>
      ) : type === "audio" ? (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "flex-end",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#14859B",
              borderRadius: 15,
              borderBottomRightRadius: 0,
              borderColor: "#106C7E",
              borderWidth: 1,
              maxWidth: "80%",
              minHeight: 10,
              maxHeight: 400,
            }}
          >
            <View
              style={{
                backgroundColor: "#14859B",
                height: 50,
                width: 250,
                borderRadius: 15,
                borderBottomRightRadius: 0,
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
              }}
            >
              <TouchableOpacity onPress={!isPlaying ? playSound : stopSound}>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isPlaying ? (
                    //   <AntDesign name="play" size={30} color="white" />
                    <AntDesign name="pausecircle" size={30} color="#14859B" />
                  ) : (
                    <AntDesign name="play" size={30} color="#14859B" />
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 10,
                  width: 180,
                  height: "100%",
                  marginRight: 10,
                }}
              >
                <ImageBackground
                  source={require("./assets/soundForm.png")}
                  style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center",
                  }}
                >
                  <Animated.View
                    style={[
                      {
                        height: "100%",
                        width: 2,
                        backgroundColor: "#73ADB9",
                        // backgroundColor: "white",
                      },
                      playAnimationStyle,
                    ]}
                  />
                </ImageBackground>
                <View></View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              marginLeft: 10,
            }}
          >
            <Image
              source={{
                uri: pP,
              }}
              style={{ flex: 1, width: 40, height: 40, borderRadius: 50 }}
            />
            <View
              style={{
                position: "absolute",
                height: 12,
                width: 12,
                backgroundColor: "#75E910",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "white",
                left: "70%",
                top: "70%",
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "flex-end",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#14859B",
              borderRadius: 15,
              borderBottomRightRadius: 0,
              padding: 10,
              paddingLeft: 28,
              paddingRight: 28,
              borderWidth: 0.5,
              borderColor: "#106C7E",
              maxWidth: "80%",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>{text}</Text>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              marginLeft: 10,
            }}
          >
            <Image
              source={{
                uri: pP,
              }}
              style={{ flex: 1, width: 40, height: 40, borderRadius: 50 }}
            />
            <View
              style={{
                position: "absolute",
                height: 12,
                width: 12,
                backgroundColor: "#75E910",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "white",
                left: "70%",
                top: "70%",
              }}
            />
          </View>
        </View>
      )}
    </>
  ) : (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "flex-end",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          height: 40,
          width: 40,
          marginRight: 10,
        }}
      >
        <Image
          source={{
            uri:
              "https://smallimg.pngkey.com/png/small/115-1150152_default-profile-picture-avatar-png-green.png",
          }}
          style={{ flex: 1, width: 40, height: 40, borderRadius: 50 }}
        />
        <View
          style={{
            position: "absolute",
            height: 12,
            width: 12,
            backgroundColor: "#75E910",
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "white",
            left: "70%",
            top: "70%",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: 15,
          borderBottomLeftRadius: 0,
          padding: 10,
          paddingLeft: 28,
          paddingRight: 28,
          borderWidth: 0.5,
          borderColor: "#F2F2F2",
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: "#3A3A3C", fontSize: 14 }}>{text}</Text>
      </View>
    </View>
  );
};

export default message;

{
  /* <View
style={{
  flexDirection: "row",
  alignSelf: "flex-end",
  alignItems: "flex-end",
  marginBottom: 10,
}}
>

  <View
    style={{
      backgroundColor: "#14859B",
      borderRadius: 15,
      borderBottomRightRadius: 0,
      padding: 10,
      paddingLeft: 28,
      paddingRight: 28,
      borderWidth: 0.5,
      borderColor: "#106C7E",
      maxWidth: "80%",
    }}
  >
    <Text style={{ color: "white", fontSize: 14 }}>{text}</Text>
  </View>
)}
<View
  style={{
    height: 40,
    width: 40,
    marginLeft: 10,
  }}
>
  <Image
    source={{
      uri: pP,
    }}
    style={{ flex: 1, width: 40, height: 40, borderRadius: 50 }}
  />
  <View
    style={{
      position: "absolute",
      height: 12,
      width: 12,
      backgroundColor: "#75E910",
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "white",
      left: "70%",
      top: "70%",
    }}
  />
</View>
</View>
) : ()
 */
}
