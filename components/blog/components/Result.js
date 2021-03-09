import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ListCard from "./ListCard";

const Result = ({ list }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Search Results</Text>
        <Text style={styles.count}>found {list.length} result</Text>
      </View>
      <View style={styles.listContainer}>
        {list.length > 0 ? (
          list.map((item, key) => {
            return (
              <ListCard
                key={key}
                _id={item._id}
                postImage={item.postImage}
                status={item.status}
                postName={item.postName}
              />
            );
          })
        ) : (
          <Text>nothing</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, paddingBottom: 0 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: { fontSize: 16, fontWeight: "500", color: "#3A3A3C" },
  count: { color: "#85C8D5", fontSize: 12 },
  listContainer: {},
});

export default Result;
