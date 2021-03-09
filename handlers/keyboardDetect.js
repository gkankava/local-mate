import { Keyboard, Platform } from "react-native";
import { useState } from "react";

export const addKeyboardListener = (_keyboardDidShow, _keyboardDidHide) => {
  if (Platform.OS === "ios") {
    Keyboard.addListener("keyboardWillShow", _keyboardDidShow);
    Keyboard.addListener("keyboardWillHide", _keyboardDidHide);
  } else {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }
};

export const removeKeyboardListener = (_keyboardDidShow, _keyboardDidHide) => {
  if (Platform.OS === "ios") {
    Keyboard.removeListener("keyboardWillShow", _keyboardDidShow);
    Keyboard.removeListener("keyboardWillHide", _keyboardDidHide);
  } else {
    Keyboard.removeListener("keyboardWDidShow", _keyboardDidShow);
    Keyboard.removeListener("keyboardWDidHide", _keyboardDidHide);
  }
};
