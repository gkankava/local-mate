import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ListCard = ({ key, _id, postImage, status, postName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={key}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("PostScreen", { postID: _id });
      }}
    >
      <View
        style={{
          width: "100%",
          height: 86,
          marginBottom: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 70,
            width: 70,
            borderRadius: 15,
            marginRight: 10,
          }}
          source={{ uri: postImage }}
        />
        <View style={{}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="user" size={12} color="#85C8D5" />
            <Text style={{ color: "#85C8D5", fontSize: 12 }}>{status}</Text>
          </View>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            {postName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
