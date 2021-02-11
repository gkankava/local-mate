import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const recPosts = ({ fetchedPosts, navigation }) => {
  let list = fetchedPosts.map((item, key) => (
    <TouchableOpacity
      activeOpacity={0.8}
      key={key}
      onPress={() => {
        navigation.navigate("PostScreen", { postID: item._id });
      }}
    >
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: item.postImage,
          }}
          style={styles.bg}
          imageStyle={{ borderRadius: 15 }}
        >
          <Text style={styles.title}>{item.postName}</Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // disableScrollViewPanResponder
        // pagingEnabled
        // decelerationRate={0}
        // snapToInterval={width * 0.7 + width * 0.065}
        // snapToAlignment={"end"}
      >
        {list}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 15,
    height: height * 0.3 + 30,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    height: height * 0.3,
    width: width * 0.7,
    borderRadius: 15,
    marginRight: 30,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    padding: 30,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "white" },
  subTitle: { fontSize: 12, fontWeight: "300", color: "white" },
});

export default recPosts;
