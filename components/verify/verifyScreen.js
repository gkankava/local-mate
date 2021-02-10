import React, { useContext, useEffect, useState } from "react";
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

import axios from "axios";

import { userContext, setUserContext } from "../../store/contextApi";
import CodeInput from "react-native-confirmation-code-input";
import { useFocusEffect } from "@react-navigation/native";

function verifyScreen() {
  const [code, setCode] = useState("");
  const phone = useContext(userContext).user.phone;
  const setCurrentUser = useContext(setUserContext);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState();

  const verification = async () => {
    console.log(phone);
    try {
      await axios
        .post(`${env.manifest.extra.proxy}/api/auth/verification/${phone}`)
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log("error here", error);
    }
  };

  useEffect(() => {
    verification();
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

  useEffect(() => {
    if (isSuccess === true) {
      setTimeout(() => {
        setCurrentUser({
          isAuthenticated: true,
          isVerified: true,
          user: data,
        });
      }, 3000);
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    if (code.length === 4) {
      axios
        .post(`${env.manifest.extra.proxy}/api/auth/confirmation`, {
          phone,
          code,
        })
        .then((res) => {
          setData(res.data);
          setIsSuccess(true);
        })
        .catch((err) => {
          console.log("error", err);
        });
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
        {isSuccess ? (
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
              Registration completed successfully
            </Text>
            <Text style={{ fontSize: 12, color: "#A5A5A5" }}>Thank you!</Text>
          </View>
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
                    width: 28,
                    backgroundColor: "#85C8D5",
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
            <View style={{ height: 100, marginTop: 50 }}>
              <CodeInput
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
              SMS code has been sent to {phone}
            </Text>
            <TouchableOpacity
              style={styles.buttonOut}
              onPress={handleSubmit}
              title="Continue"
              disabled={code.length !== 4}
            >
              <Text style={styles.buttonOutText}>Continue </Text>
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
        )}
      </View>
    </View>

    // <>
    //   {isSuccess ? (
    //     <Text>Success</Text>
    //   ) : (
    //     <View
    //       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    //     >
    //       <Text>sms has been sent on your mobile number </Text>
    //       <Text>please enter verification code </Text>
    //       <TextInput
    //         placeholder="Phone"
    //         value={code}
    //         onChangeText={(code) => setCode(code)}
    //       />
    //       <Button onPress={handleSubmit} title="submit" />
    //     </View>
    //   )}
    // </>
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

export default verifyScreen;
