import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import env from "expo-constants";

const InputContainer = ({
  icon,
  name,
  content,
  curRef,
  state,
  setState,
  username,
}) => {
  const [value, setValue] = useState(content);
  const [editable, setEdiable] = useState(false);
  const inputRef = useRef();

  const handleUpdate = () => {
    if (state[curRef] !== value && value !== "") {
      axios
        .post(`${env.manifest.extra.proxy}/api/user/profile/${username}`, {
          ...state,
          [curRef]: value,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {icon}
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={(c) => setValue(c)}
          editable={true}
          onFocus={() => {
            if (value === "-") {
              setValue("");
            }
            setEdiable(true);
          }}
          onEndEditing={() => {
            if (value === "") {
              setValue("-");
            }
            setEdiable(false);
            handleUpdate();
          }}
        />

        {editable ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setEdiable(!editable);
              setState({ ...state, name: value });
            }}
          >
            <SimpleLineIcons name="check" size={16} color="#85C8D5" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setEdiable(!editable);
              inputRef.current.focus();
            }}
          >
            <SimpleLineIcons name="pencil" size={16} color="#85C8D5" />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          ...styles.hr,
          backgroundColor: editable ? "#85C8D5" : "#C8C7CC",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingLeft: 25 },
  topContainer: { flexDirection: "row", marginBottom: 5 },
  name: { color: "#A5A5A5", fontSize: 12, marginLeft: 10 },
  inputContainer: { paddingLeft: 24 },
  input: { fontSize: 17, paddingRight: 80 },
  icon: { position: "absolute", right: 25 },
  hr: {
    height: 1,
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 24,
  },
});

export default InputContainer;
