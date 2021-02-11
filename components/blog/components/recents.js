import React from "react";
import { View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const recents = ({ data }) => {
  const [list, setList] = React.useState();
  React.useEffect(() => {
    if (data.list) {
      setList(
        data.list.map((item, key) => (
          <View
            key={key}
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
              source={{ uri: item.postImage }}
            />
            <View style={{}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="user" size={12} color="#85C8D5" />
                <Text style={{ color: "#85C8D5", fontSize: 12 }}>
                  {item.status}
                </Text>
              </View>
              <Text
                style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
              >
                {item.postName}
              </Text>
            </View>
          </View>
        ))
      );
    }
  }, [data]);
  return (
    <View
      style={{
        alignItems: "flex-start",
        padding: 16,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 30,
      }}
    >
      <Text
        style={{
          marginBottom: 15,
          fontSize: 16,
          fontWeight: "bold",
          color: "#3A3A3C",
        }}
      >
        Recents
      </Text>
      {list}
    </View>
  );
};

export default recents;
