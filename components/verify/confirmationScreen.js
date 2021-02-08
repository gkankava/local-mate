import React, { useContext, useReducer } from "react";
import { View, Button, TextInput } from "react-native";
import localStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { userContext, setUserContext } from "../../store/contextApi";
import { setTokenHeader } from "../../store/tokenHeader";
import { initialSignUp, signUpReducer } from "../../store/user/user";

import Notify from "../../handlers/errorMessage";

function confirmationScreen() {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
}

export default confirmationScreen;
