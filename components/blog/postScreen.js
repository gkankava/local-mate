import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import env from "expo-constants";
import axios from "axios";

import Header from "./components/postHeader";
import TabNavigation from "../shared/btn-component/botTabNavigator";

const postScreen = (props) => {
  let { postID } = props.route.params;
  const [fetchedPost, setFetchedPost] = useState();

  useEffect(() => {
    if (postID) {
      axios
        .get(`${env.manifest.extra.proxy}/api/blog/posts/${postID}`)
        .then((res) => {
          setFetchedPost(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      {fetchedPost ? (
        <>
          <Header
            img={fetchedPost.postImage}
            title={fetchedPost.postName}
            subTitle={fetchedPost.status}
          />
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: "white",
              padding: 16,
              paddingTop: 30,
              paddingBottom: 0,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#3A3A3C" }}
            >
              About
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                marginTop: 15,
                color: "#3A3A3C",
              }}
            >
              {fetchedPost.info}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#3A3A3C",
                marginTop: 30,
              }}
            >
              Gallery
            </Text>
            <View style={{ marginBottom: 30, flexDirection: "row" }}></View>
          </ScrollView>
        </>
      ) : null}
      <TabNavigation />
    </>
  );
};

export default postScreen;
