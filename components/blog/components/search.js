import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import env from "expo-constants";

const search = ({ focused, setList }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length >= 3) {
      focused(true);
      search();
    } else {
      focused(false);
    }
  }, [query]);

  const search = () => {
    axios
      .get(`${env.manifest.extra.proxy}/api/search?search=${query}`)
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.searchBoxContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Places, Categories, etc. "
        value={query}
        onChangeText={(t) => {
          setQuery(t);
        }}
      />
      {query.length >= 3 ? (
        <TouchableOpacity style={styles.icon} onPress={() => setQuery("")}>
          <Ionicons name="close-circle" size={24} color="#888888" />
        </TouchableOpacity>
      ) : (
        <Ionicons
          style={styles.icon}
          name="search-sharp"
          size={24}
          color="black"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  textInput: {
    height: 43,
    backgroundColor: "#F8F8F8",
    width: "85%",
    borderRadius: 18,
    padding: 20,
    paddingTop: 13,
    paddingBottom: 13,
  },
  icon: { color: "#E5E5E5", position: "absolute", right: "12%", fontSize: 12 },
});

export default search;
