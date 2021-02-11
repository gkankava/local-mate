import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const search = () => {
  return (
    <View style={styles.searchBoxContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Places, Categories, etc. "
      />
      <Ionicons
        style={styles.icon}
        name="search-sharp"
        size={24}
        color="black"
      />
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
