import React from "react";
import { View, Text } from "react-native";
import Content from "./shared/Content";
import Header from "./shared/header";

const SettingsScreen = () => {
  return (
    <>
      <Header header={"Settings"} />
      <Content></Content>
    </>
  );
};

export default SettingsScreen;
