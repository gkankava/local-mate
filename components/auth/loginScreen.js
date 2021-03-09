import React, { useContext, useReducer, useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import env from "expo-constants";

import localStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import { setUserContext, userContext } from "../../store/contextApi";
import { setTokenHeader } from "../../store/tokenHeader";
import { initialLogin, loginReducer } from "../../store/user/user";

import Notify from "../../handlers/errorMessage";

const passIco = require("../../assets/auth/seeIco.png");
const passIcoActive = require("../../assets/auth/seeIcoActive.png");

function login({ navigation }) {
  const user = useContext(userContext);
  const setCurrentUser = useContext(setUserContext);

  const [loginState, dispatchLogin] = useReducer(loginReducer, initialLogin);
  const { username, password, isLoading, isError, error } = loginState;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === "ios") {
        Keyboard.addListener("keyboardWillShow", _keyboardDidShow);
        Keyboard.addListener("keyboardWillHide", _keyboardDidHide);
      } else {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      }

      return () => {
        if (Platform.OS === "ios") {
          Keyboard.removeListener("keyboardWillShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardWillHide", _keyboardDidHide);
        } else {
          Keyboard.removeListener("keyboardWDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardWDidHide", _keyboardDidHide);
        }
      };
    }, [])
  );

  const _keyboardDidShow = () => {
    setKeyboardActive(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardActive(false);
  };

  const storeToken = async (value) => {
    try {
      await localStorage.setItem("jwtToken", value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    dispatchLogin({ type: "login" });
    axios
      .post(`${env.manifest.extra.proxy}/api/auth/signin`, {
        username: username.toLowerCase(),
        password,
      })
      .then((res) => {
        dispatchLogin({ type: "success" });
        storeToken(res.data.token);
        setTokenHeader(res.data.token);
        if (res.data.user.verified) {
          setCurrentUser({
            isAuthenticated: true,
            isVerified: true,
            user: res.data.user,
          });
        } else {
          setCurrentUser({
            isAuthenticated: true,
            isVerified: false,
            user: res.data.user,
          });
          navigation.navigate("Verify");
        }
      })
      .then(() => {
        console.log(user);
      })
      .catch((err) => {
        dispatchLogin({ type: "error", message: "invalid credential" });
      });
  };
  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.topContainer}>
        <ImageBackground
          source={require("../../assets/bg2.jpg")}
          style={styles.bgImage}
        >
          <View style={styles.imageInfo}>
            <Image
              source={require("../../assets/dot.png")}
              style={{ marginBottom: 10, alignSelf: "flex-end" }}
            />
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              Mount Ushba
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "200",
                alignSelf: "flex-end",
              }}
            >
              Georgia
            </Text>
          </View>
          <Image
            style={styles.logoImage}
            source={require("../../assets/logo.png")}
          />
        </ImageBackground>
      </View>
      <View
        style={{
          ...styles.bottomContainer,
          height: keyboardActive ? "85%" : "60%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "200",
            color: "#85C8D5",
            marginBottom: 50,
          }}
        >
          Hello, Mate
        </Text>

        {isError ? <Notify message={error} /> : null}

        <View style={styles.inputContainer}>
          <Image source={require("../../assets/auth/userIco.png")} style={{}} />
          <TextInput
            style={styles.textInput}
            placeholder="Phone or Email"
            value={username}
            onFocus={() => {
              dispatchLogin({ type: "removeError" });
            }}
            onChangeText={(username) => {
              dispatchLogin({
                type: "field",
                field: "username",
                value: username,
              });
            }}
          />
        </View>
        <View style={styles.bigInputContainer}>
          <View style={styles.innerInputContainer}>
            <Image
              source={require("../../assets/auth/passIco.png")}
              style={{}}
            />
            <TextInput
              style={styles.passInput}
              secureTextEntry={!passwordVisible}
              placeholder="Password"
              value={password}
              onFocus={() => {
                dispatchLogin({ type: "removeError" });
              }}
              onChangeText={(password) =>
                dispatchLogin({
                  type: "field",
                  field: "password",
                  value: password,
                })
              }
              inlineImageLeft="username"
            />
          </View>
          <TouchableOpacity
            style={{ marginLeft: -40, marginTop: 13, zIndex: 99 }}
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
          >
            <Image source={passwordVisible ? passIcoActive : passIco} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reset");
          }}
        >
          <Text
            style={{ fontSize: 12, color: "#A5A5A5", alignSelf: "flex-end" }}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOut}
          onPress={handleSubmit}
          title={isLoading ? "Loading" : "Sign In "}
          disabled={isLoading || password.length === 0 || username.length === 0}
        >
          <Text style={styles.buttonOutText}>Sign In </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: { width: "100%", height: "45%", backgroundColor: "white" },
  bgImage: {
    width: "100%",
    height: "110%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageInfo: { marginTop: "20%", marginRight: "10%", alignSelf: "flex-end" },
  logoImage: {
    height: 61,
    width: 120,
    marginBottom: "20%",
    marginLeft: "10%",
    alignSelf: "flex-start",
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    // height: "60%",
    borderTopRightRadius: 50,
    bottom: 0,
    flex: 1,
    padding: 40,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#EFEFF4",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    flexDirection: "row",
  },
  bigInputContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#EFEFF4",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerInputContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  textInput: {
    paddingLeft: 10,
    width: "100%",
    fontSize: 16,
    // position: "relative",
  },
  passInput: {
    paddingLeft: 10,
    paddingRight: 40,
    paddingRight: 33,
    width: "100%",
    fontSize: 16,
  },
  buttonOut: {
    marginTop: 50,
    alignSelf: "center",
    width: "60%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#85C8D5",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutText: { color: "#85C8D5" },
});

export default login;
