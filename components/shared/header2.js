import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Menu from "./assets/modal";
import env from "expo-constants";

import { userContext } from "../../store/contextApi";
import { ScrollView } from "react-native-gesture-handler";

const image = require("../../assets/bg2.jpg");
const dots = require("../../assets/dot.png");

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const BANNER_H = 350;
import DummyText from "./dummytext";

const header = (props) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  // console.log(scrollPos);

  const { name, profilePicture } = useContext(userContext).user;
  let pp = env.manifest.extra.proxy + profilePicture;

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <View>
        <ImageBackground source={image} style={styles.header}>
          <View
            style={{
              padding: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              paddingBottom: 65,
              paddingTop: 55,
            }}
          >
            {/* top header */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  ...styles.profileContainer,
                  display: scrollPos >= 100 ? "flex" : "none",
                }}
              >
                <View style={styles.profilePicture}>
                  <Image
                    source={{
                      uri: pp,
                    }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                    }}
                  />
                </View>
                <View style={styles.profileText}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "200",
                    }}
                  >
                    Hello {name}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    What Are You Looking For?
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  opacity: scrollPos < 100 ? (100 - scrollPos) / 100 : 1,
                  display: scrollPos < 100 ? "flex" : "none",
                }}
              >
                <Image
                  source={require("../../assets/dot.png")}
                  style={{ marginBottom: 10 }}
                />
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                >
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
              <Menu
                vis={menuVisible}
                setVis={setMenuVisible}
                nav={navigation}
                height={height}
              />
              <TouchableOpacity
                style={{
                  height: height * 0.18 * 0.48,
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
              </TouchableOpacity>
            </View>
            {/* profile container */}
            <View
              style={{
                ...styles.profileContainer,
                opacity: scrollPos < 100 ? (100 - scrollPos) / 100 : 1,
                display: scrollPos >= 100 ? "none" : "flex",
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
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "200" }}
                >
                  Hello {name}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  What Are You Looking For?
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <Animated.ScrollView
        onScroll={
          // setScrollPos(Math.floor(e.nativeEvent.contentOffset.y));

          Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )
        }
        scrollEventThrottle={16}
        style={{
          ...styles.scrF(scrollY),
          borderTopRightRadius: 50,
          backgroundColor: "white",
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [-50, -150],
              }),
            },
          ],
          // marginTop:
          //   scrollPos >= 0 && scrollPos < 150
          //     ? -50 - scrollPos
          //     : scrollPos < 0
          //     ? -50
          //     : -200,
          // paddingTop:
          //   scrollPos >= 0 && scrollPos < 150
          //     ? scrollPos
          //     : scrollPos < 0
          //     ? 0
          //     : 150,
        }}
        contentContainerStyle={{ paddingBottom: 650 }}
      >
        {props.children ? props.children : null}
        {/* <View style={{ height: 1000 }}></View> */}
      </Animated.ScrollView>
      {/* </View> */}
    </View>
  );
};

const styles = {
  scrF: (scroll) => {
    // return {
    //   transform: [
    //     {
    //       translateY: scroll,
    //     },
    //   ],
    // };
  },

  header: {
    height: BANNER_H,
    width: "100%",
  },
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
    height: height * 0.18 * 0.48,
    width: height * 0.18 * 0.48,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 2,
    overflow: "hidden",
  },
  profileText: {
    flexDirection: "column",
    alignSelf: "center",
  },
  menuWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 20,
    padding: 25,
  },
};

export default header;
