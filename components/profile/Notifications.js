import React from "react";
import { View, Text } from "react-native";
import Header from "./shared/header";
import Content from "./shared/Content";

const Notifications = () => {
  return (
    <>
      <Header header={"Notifications"} />
      <Content></Content>
    </>
  );
};

export default Notifications;
