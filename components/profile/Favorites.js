import React from "react";
import { View, Text } from "react-native";
import Content from "./shared/Content";
import Header from "./shared/header";

const Favorites = () => {
  return (
    <>
      <Header header={"Favorites"} />
      <Content></Content>
    </>
  );
};

export default Favorites;
