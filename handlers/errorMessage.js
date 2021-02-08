import React from "react";
import { Text } from "react-native";

const errorMessage = ({ message }) => {
  return (
    <>
      <Text
        style={{
          color: "#FC6969",
          marginBottom: 15,
          fontWeight: "200",
        }}
      >
        *{message}
      </Text>
    </>
  );
};

export default errorMessage;
