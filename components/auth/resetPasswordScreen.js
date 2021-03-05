import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

import { userContext, setUserContext } from "../../store/contextApi";
import CodeInput from "react-native-confirmation-code-input";
import { useFocusEffect } from "@react-navigation/native";

import { initialLogin, loginReducer } from "../../store/user/user";
import Notify from "../../handlers/errorMessage";

function authPage({ navigation }) {
  const [phase, setPhase] = useState(0);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const user = useContext(userContext);
  const setUser = useContext(setUserContext);

  const [loginState, dispatchLogin] = useReducer(loginReducer, initialLogin);

  const { username, password, isLoading, isError, error } = loginState;
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState({
    isError: false,
    error: "",
    isLoading: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const passIco = require("../../assets/auth/seeIco.png");
  const passIcoActive = require("../../assets/auth/seeIcoActive.png");
  const [newPass, setNewPass] = useState({
    password: "",
    rePassword: "",
    isLoading: false,
    isError: false,
    newPassError: "",
  });

  useEffect(() => {
    setPhase(0);
  }, []);

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

  const verification = async (username) => {
    let channel = username.includes("@") ? "email" : "sms";
    try {
      await axios
        .post(
          `${Constants.manifest.extra.proxy}/api/auth/verification/${username}/${channel}`
        )
        .then((res) => {
          setUser({ username: username });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const usernameSubmit = () => {
    if (!loginState.isError) {
      try {
        axios
          .get(
            `${Constants.manifest.extra.proxy}/api/get-user-data/${loginState.username}`
          )
          .then((res) => {
            if (res.data.username === loginState.username) {
              verification(res.data.username);
              setPhase(1);
            }
          })
          .catch((err) => {
            dispatchLogin({
              type: "error",
              message: "Username does not exist",
            });
          });
      } catch (error) {
        dispatchLogin({ type: "error", message: "Username does not exist" });
      }
    }
  };

  const codeSubmit = () => {
    if (code.length === 4) {
      setCodeState({ ...codeState, isLoading: true });
      axios
        .post(`${Constants.manifest.extra.proxy}/api/auth/reset-confirmation`, {
          username: user.username,
          code,
        })
        .then((res) => {
          if (res.data.verified) {
            setCode("");
            setCodeState({
              ...codeState,
              isLoading: false,
              isError: false,
              error: "",
            });
            setPhase(2);
          } else {
            setCode("");
            setCodeState({
              isLoading: false,
              isError: true,
              error: "Incorrect code",
            });
          }
        })
        .catch((err) => {
          setCode("");
          setCodeState({
            isLoading: false,
            isError: true,
            error: "Incorrect code",
          });
        });
    }
  };
  const passSubmit = () => {
    if (newPass.password.length >= 6) {
      if (newPass.password === newPass.rePassword) {
        setNewPass({
          ...newPass,
          isLoading: true,
          password: "",
          rePassword: "",
        });
        //axios call
        axios
          .post(`${Constants.manifest.extra.proxy}/api/user/${user.username}`, {
            password: newPass.password,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              console.log("success");
              setPhase(3);
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setNewPass({
          ...newPass,
          isLoading: false,
          isError: true,
          newPassError: "Passwords do not match",
        });
      }
    } else {
      setNewPass({
        ...newPass,
        password: "",
        rePassword: "",
        isLoading: false,
        isError: true,
        newPassError: "Password must be at least 6 charatcer long",
      });
    }
  };

  useEffect(() => {
    if (phase === 3) {
      setTimeout(() => {
        navigation.navigate("Auth");
      }, 3000);
    }
  }, [phase]);
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.topContainer}>
        <ImageBackground
          source={require("../../assets/auth/bg3x.png")}
          style={styles.bgImage}
        >
          <View style={styles.imageInfo}>
            <Image
              source={require("../../assets/dot.png")}
              style={{ marginBottom: 10, alignSelf: "flex-end" }}
            />
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              Caucasus Mountains
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
        {phase === 0 ? (
          <>
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
                Reset Password
              </Text>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <View
                  style={{
                    height: 6,
                    width: 26,
                    backgroundColor: "#85C8D5",

                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>

            {isError ? <Notify message={error} /> : null}
            <View style={{ ...styles.inputContainer, marginTop: "10%" }}>
              <Image
                source={require("../../assets/auth/userIco.png")}
                style={{}}
              />

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
            <TouchableOpacity
              style={styles.buttonOut}
              onPress={usernameSubmit}
              title={isLoading ? "Loading" : "Sign In "}
              disabled={isLoading || username.length === 0}
            >
              <Text style={styles.buttonOutText}>Send</Text>
            </TouchableOpacity>
          </>
        ) : phase === 1 ? (
          <>
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
                Verification
              </Text>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <View
                  style={{
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",

                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 26,
                    backgroundColor: "#85C8D5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
            <View style={{ height: 100, marginTop: 50 }}>
              {/* {codeState.isError ? <Notify message={codeState.error} /> : null} */}
              <CodeInput
                onFocus={() => {
                  setCodeState({ isError: false, error: "", isLoading: false });
                }}
                className={"border-b"}
                space={10}
                size={30}
                inputPosition="center"
                activeColor="#85C8D5"
                inactiveColor="rgba(160, 160, 160, .5)"
                autoFocus={true}
                keyboardType="numeric"
                codeLength={4}
                codeInputStyle={{
                  fontWeight: "400",
                  color: "#6E6E6E",
                  fontSize: 20,
                }}
                onFulfill={(code) => {
                  setCode(code);
                }}
              />
            </View>
            <Text
              style={{
                alignSelf: "center",
                color: "#A5A5A5",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              code has been sent to {username}
            </Text>
            <TouchableOpacity
              style={styles.buttonOut}
              onPress={codeSubmit}
              title="Continue"
            >
              <Text style={styles.buttonOutText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 30,
              }}
              // onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ fontSize: 12, color: "#A5A5A5" }}>Resend </Text>
              <Text style={{ color: "#85C8D5", fontSize: 12 }}>Code</Text>
            </TouchableOpacity>
          </>
        ) : phase === 2 ? (
          <>
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
                New Password
              </Text>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <View
                  style={{
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",

                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 26,
                    backgroundColor: "#85C8D5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
            {newPass.isError ? <Notify message={newPass.newPassError} /> : null}
            <View style={styles.bigInputContainer}>
              <View style={styles.innerInputContainer}>
                <Image
                  source={require("../../assets/auth/passIco.png")}
                  style={{}}
                />
                <TextInput
                  style={styles.passInput}
                  secureTextEntry={!passwordVisible}
                  placeholder="New Password"
                  value={newPass.password}
                  onFocus={() => {
                    setNewPass({ ...newPass, isError: false });
                  }}
                  onChangeText={(password) =>
                    setNewPass({ ...newPass, password: password })
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
              <Image
                source={require("../../assets/auth/passIco.png")}
                style={{}}
              />
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Repeat Password"
                value={newPass.rePassword}
                onChangeText={(rePassword) =>
                  setNewPass({ ...newPass, rePassword: rePassword })
                }
              />
            </View>
            <TouchableOpacity
              style={styles.buttonOut}
              onPress={passSubmit}
              title={newPass.isLoading ? "Loading" : "Submit "}
              disabled={newPass.isLoading}
            >
              <Text style={styles.buttonOutText}>
                {newPass.isLoading ? "Loading" : "Submit "}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
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
                Success
              </Text>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <View
                  style={{
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",

                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 6,
                    backgroundColor: "#E5E5E5",
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    height: 6,
                    width: 26,
                    backgroundColor: "#85C8D5",
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ marginBottom: 30, height: 72, width: 72 }}
                source={require("../../assets/successIcon.png")}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#A5A5A5",
                  marginBottom: 5,
                }}
              >
                Password Updated Successfully
              </Text>
              <Text style={{ fontSize: 12, color: "#A5A5A5" }}>Good Luck!</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: { width: "100%", height: "45%", backgroundColor: "white" },
  bgImage: {
    width: "100%",
    height: "110%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    resizeMode: "stretch",
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
  buttonOut: {
    marginTop: 10,
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
  passInput: {
    paddingLeft: 10,
    paddingRight: 40,
    paddingRight: 33,
    width: "100%",
    fontSize: 16,
  },
  bigInputContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#EFEFF4",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
});

export default authPage;
