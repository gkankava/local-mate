import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import env from "expo-constants";
import { DotIndicator } from "react-native-indicators";

//components
import Header from "../shared/header";
import TabNavigation from "../shared/btn-component/botTabNavigator";

import Search from "./components/search";
import Categories from "./components/categories";
import CategoriesPosts from "./components/categoriesPosts";
import Popular from "./components/popular";
import Recents from "./components/recents";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function blogScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, selectCategory] = useState();
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [dummy, setDummy] = useState([]);

  //fetch categories
  useEffect(() => {
    axios
      .get(`${env.manifest.extra.proxy}/api/blog/categories`)
      .then((res) => {
        setCategories(res.data);
        selectCategory(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch posts from categories

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${env.manifest.extra.proxy}/api/blog/${selectedCategory._id}`)
        .then((res) => {
          setFetchedPosts(res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get(`${env.manifest.extra.proxy}/api/dummy`)
      .then((res) => setDummy(res.data))
      .catch((err) => console.log(err));
  }, []);

  const renderContent = () => (
    <>
      <Search />
      {categories.length > 0 && selectedCategory ? (
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          selectCategory={selectCategory}
          setFetchedPosts={setFetchedPosts}
        />
      ) : (
        <View style={styles.categoryTabContainer}>
          <DotIndicator color="#85C8D5" size={5} />
        </View>
      )}

      {fetchedPosts.length > 0 ? (
        <CategoriesPosts fetchedPosts={fetchedPosts} navigation={navigation} />
      ) : (
        <View style={styles.catPostsContainer}>
          <DotIndicator color="#85C8D5" size={7} />
        </View>
      )}
      {dummy ? (
        <Popular data={dummy} />
      ) : (
        <View style={styles.catPostsContainer}>
          <DotIndicator color="#85C8D5" size={7} />
        </View>
      )}
      {dummy ? (
        <Recents data={dummy} />
      ) : (
        <View style={styles.catPostsContainer}>
          <DotIndicator color="#85C8D5" size={7} />
        </View>
      )}
    </>
  );

  return (
    <>
      <Header>{renderContent()}</Header>
      <TabNavigation />
    </>
  );
}
const styles = StyleSheet.create({
  categoryTabContainer: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    marginBottom: 30,
    alignItems: "flex-start",
  },
  catPostsContainer: {
    width: "100%",
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 15,
    height: height * 0.3 + 30,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default blogScreen;

//fetch categories, select first in flatlist, fetch post under that category,
//fetch populars,
//  usefocuseffect -- fetch recents
