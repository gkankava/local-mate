import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

const categories = ({
  categories,
  selectedCategory,
  selectCategory,
  setFetchedPosts,
}) => {
  let categoriesList = categories.map((item, key) => (
    <View style={styles.item} key={key}>
      <TouchableOpacity
        onPress={() => {
          selectCategory(item);
          setFetchedPosts([]);
        }}
      >
        <Text
          style={
            selectedCategory.categoryName === item.categoryName
              ? styles.selectedText
              : styles.itemText
          }
        >
          {item.categoryName}
        </Text>
      </TouchableOpacity>
      {selectedCategory.categoryName === item.categoryName ? (
        <View style={styles.mark} />
      ) : null}
    </View>
  ));

  return (
    <View style={styles.categoryTabContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categoriesList}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTabContainer: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    marginBottom: 30,
  },
  item: { marginRight: 25, alignItems: "center" },
  itemText: { fontSize: 14, color: "#A5A5A5", fontWeight: "bold" },
  selectedText: { fontSize: 14, color: "#85C8D5", fontWeight: "bold" },
  mark: {
    height: 6,
    width: 6,
    borderRadius: 50,
    backgroundColor: "#85C8D5",
    marginTop: 8,
  },
});

export default categories;
