import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Touchable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import env from "expo-constants";
import * as ImagePicker from "expo-image-picker";

import { userContext, setUserContext } from "../../store/contextApi";

import { Feather } from "@expo/vector-icons";

import ProfilePictureModal from "./comp/ProfilePictureModal";
import ImagePrev from "./comp/ImagePrev";
import Camera from "../chat/camera";

const height = Dimensions.get("screen").height;
const ENDPOINT = env.manifest.extra.proxy;

const ProfileHeader = () => {
  const currentUser = useContext(userContext);
  const {
    username,
    profilePicture,
    name,
    membership = "Free",
    expiration = 112,
  } = useContext(userContext).user;
  const setCurrentUser = useContext(setUserContext);

  const [ppModalVisible, setPpModalVisible] = useState(false);

  //handle Profile Picture

  const [media, setMedia] = useState();
  const [imgPrevVisible, setImgPrevVisible] = useState(false);
  const [camActive, setCamActive] = useState(false);
  //image picker
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
      setImgPrevVisible(true);
      setPpModalVisible(false);
    }
  };

  //upload and set pp

  const uploadMedia = async () => {
    const formData = new FormData();
    if (media) {
      formData.append("avatar", {
        uri: media.uri,
        type: media.type,
        name: media.name,
      });
      try {
        await axios
          .post(`${ENDPOINT}/api/upload/avatar`, formData, {
            headers: {
              Accept: "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            setMedia(undefined);
            if (res.data.isUploaded) {
              let url = res.data.url;
              postPp(url);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const postPp = async (url) => {
    try {
      await axios
        .post(`${ENDPOINT}/api/user/pp/${username}`, { pp: url })
        .then((res) => {
          if (res.data.success) {
            setCurrentUser({
              ...currentUser,
              user: {
                ...currentUser.user,
                profilePicture: url,
              },
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      start={[0.2, 0]}
      end={[1, 1]}
      colors={["#85C8D5", "#94C936"]}
      style={styles.linearContainer}
    >
      <View style={styles.botContainer}>
        <View style={styles.pPContainer}>
          <Image
            style={styles.pP}
            source={{ uri: env.manifest.extra.proxy + profilePicture }}
          />
          <TouchableOpacity
            style={styles.indicatorContainer}
            activeOpacity={0.8}
            onPress={() => setPpModalVisible(!ppModalVisible)}
          >
            <Feather name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>{name ? name : username}</Text>
        <View style={styles.memberShipContainer}>
          {/* **** has to be refactored */}
          <View
            style={membership === "Free" ? styles.planFree : styles.planPremium}
          >
            <Text
              style={
                membership === "Free"
                  ? styles.planFreeTitle
                  : styles.planPremiumTitle
              }
            >
              {membership}
            </Text>
          </View>
          {membership !== "Free" && (
            <Text style={{ color: "white", fontSize: 12, marginLeft: 12 }}>
              {expiration} {expiration === 1 ? "day" : "days"} left
            </Text>
          )}
        </View>
      </View>

      <ProfilePictureModal
        vis={ppModalVisible}
        setVis={setPpModalVisible}
        openPicker={pickImage}
        openCam={setCamActive}
      />
      <ImagePrev
        vis={imgPrevVisible}
        setVis={setImgPrevVisible}
        img={media}
        clearSelectedMedia={setMedia}
        upload={uploadMedia}
      />
      <Camera
        status={camActive}
        setStatus={setCamActive}
        send={uploadMedia}
        media={media}
        setMedia={setMedia}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearContainer: {
    height: height * 0.55,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 25,
    paddingTop: 65,
    paddingBottom: height * 0.1,
  },
  menuBtnHandleLong: {
    width: 28,
    height: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  menuBtnHandleShort: {
    width: 18,
    height: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  botContainer: { alignItems: "center" },
  pPContainer: { height: 130, width: 130, marginBottom: 24 },
  pP: {
    height: 130,
    width: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "white",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#85C8D5",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  memberShipContainer: {
    marginBottom: 26,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  planFree: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    padding: 31,
    paddingTop: 4,
    paddingBottom: 4,
  },
  planFreeTitle: { fontSize: 12, color: "white" },
  planPremium: {},
  planPremiumTitle: { fontSize: 12, color: "#92C94B" },
});

export default ProfileHeader;
