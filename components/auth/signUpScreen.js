import React, { useContext, useReducer, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import env from "expo-constants";

import localStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { userContext, setUserContext } from "../../store/contextApi";
import { setTokenHeader } from "../../store/tokenHeader";
import { initialSignUp, signUpReducer } from "../../store/user/user";
import { useFocusEffect } from "@react-navigation/native";

import Notify from "../../handlers/errorMessage";

function signUpScreen({ navigation }) {
  const setCurrentUser = useContext(setUserContext);
  const [signUpState, dispatchSignUp] = useReducer(
    signUpReducer,
    initialSignUp
  );
  const {
    phone,
    password,
    rePassword,
    isLoading,
    isError,
    error,
  } = signUpState;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const passIco = require("../../assets/auth/seeIco.png");
  const passIcoActive = require("../../assets/auth/seeIcoActive.png");

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
    if (password === rePassword && password.length > 6) {
      dispatchSignUp({ type: "signUp" });

      axios
        .post(`${env.manifest.extra.proxy}/api/auth/signup`, {
          phone,
          password,
        })
        .then((res) => {
          dispatchSignUp({ type: "success" });
          storeToken(res.data.token);
          setTokenHeader(res.data.token);
          setCurrentUser({
            isAuthenticated: true,
            user: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatchSignUp({
            type: "error",
            message: "this phone is already registered",
          });
        });
    } else if (password === rePassword) {
      dispatchSignUp({
        type: "error",
        message: "password must be at least 8 characters long",
      });
    } else {
      dispatchSignUp({ type: "error", message: "passwords do not match" });
    }
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
          source={require("../../assets/auth/bg2x.png")}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
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
            Join Us
          </Text>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
            <View
              style={{
                height: 6,
                width: 28,
                backgroundColor: "#85C8D5",
                borderRadius: 3,
              }}
            />
            <View
              style={{
                height: 6,
                width: 6,
                backgroundColor: "#E5E5E5",
                borderRadius: 3,
                marginLeft: 5,
              }}
            />
          </View>
        </View>
        {isError ? <Notify message={error} /> : null}
        <View style={styles.inputContainer}>
          <Image source={require("../../assets/auth/userIco.png")} style={{}} />
          <TextInput
            style={styles.textInput}
            placeholder="Phone"
            value={phone}
            onFocus={() => {
              dispatchSignUp({ type: "removeError" });
            }}
            onChangeText={(phone) =>
              dispatchSignUp({
                type: "field",
                field: "phone",
                value: phone,
              })
            }
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
                dispatchSignUp({ type: "removeError" });
              }}
              onChangeText={(password) =>
                dispatchSignUp({
                  type: "field",
                  field: "password",
                  value: password,
                })
              }
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
        <View style={styles.inputContainer}>
          <Image source={require("../../assets/auth/passIco.png")} style={{}} />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Repeat Password"
            value={rePassword}
            onChangeText={(rePassword) =>
              dispatchSignUp({
                type: "field",
                field: "rePassword",
                value: rePassword,
              })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.buttonOut}
          onPress={handleSubmit}
          title={isLoading ? "Loading" : "Sign Up "}
          disabled={
            isLoading ||
            password.length === 0 ||
            rePassword.length === 0 ||
            phone.length === 0
          }
        >
          <Text style={styles.buttonOutText}>Continue </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 30 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ fontSize: 12, color: "#A5A5A5" }}>
            Already a member?{" "}
          </Text>
          <Text style={{ color: "#85C8D5" }}>Sign In </Text>
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

export default signUpScreen;
