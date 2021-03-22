import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";

import env from "expo-constants";
import axios from "axios";

import Header from "./components/postHeader";
import TabNavigation from "../shared/btn-component/botTabNavigator";
import Gallery from "./components/gal";

const postScreen = (props) => {
  let { postID } = props.route.params;
  const [fetchedPost, setFetchedPost] = useState();
  const [galleryIsOpen, setGalleryIsOpen] = useState(0);

  useEffect(() => {
    if (postID) {
      axios
        .get(`${env.manifest.extra.proxy}/api/blog/posts/${postID}`)
        .then((res) => {
          setFetchedPost(res.data);
        })
        .catch((err) => console.log(err));
    }
    return () => {
      // setGalleryIsOpen(0);
    };
  }, []);

  let data = [];
  let thumb = [];

  if (fetchedPost) {
    data = fetchedPost.gallery.map((item, key) => ({ source: { uri: item } }));
    if (fetchedPost.gallery.length > 4) {
      for (let i = 0; i < 4; i++) {
        thumb.push(fetchedPost.gallery[i]);
      }
    } else {
      thumb = fetchedPost.gallery;
    }
  }

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
            contentContainerStyle={{ paddingBottom: 150 }}
            showsVerticalScrollIndicator={false}
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
            <View
              style={{
                marginTop: 15,
                marginBottom: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {thumb.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setGalleryIsOpen(key + 1)}
                >
                  <Image
                    source={{ uri: item }}
                    style={{ height: 70, width: 70, borderRadius: 15 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#3A3A3C",
                marginTop: 30,
              }}
            >
              Location
            </Text>
            <MapView
              style={{ height: 300, width: "100%", marginTop: 15 }}
              initialRegion={{
                latitude: 41.693286650098756,
                longitude: 44.80144442893419,
                latitudeDelta: 0.08,
                longitudeDelta: 0.07,
              }}
            />
          </ScrollView>
          {galleryIsOpen > 0 && (
            <Gallery
              vis={galleryIsOpen}
              setVis={setGalleryIsOpen}
              data={data}
              rendNum={data.length}
            />
          )}
        </>
      ) : null}
      <TabNavigation />
    </>
  );
};

export default postScreen;
