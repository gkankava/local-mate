import React from "react";
import { View, Text } from "react-native";
import Content from "./shared/Content";
import Header from "./shared/header";

const BillingScreen = () => {
  return (
    <>
      <Header header={"Billing"} />
      <Content></Content>
    </>
  );
};

export default BillingScreen;
