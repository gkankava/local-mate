import React from "react";
import { Text } from "react-native";

const formValidation = ({ type, phone, email, password, rePassword }) => {
  const [message, setMessage] = React.useState([{ field: "", message: "" }]);
  if (type === "signin") {
    if (phone.lengh < 5) {
      setMessage(...message, { field: "phone", message: "invalid phone" });
    }
    if (password.lengh < 5) {
    }
  }
  return (
    <>
      <Text></Text>
    </>
  );
};

export default formValidation;
