import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moduleName from "../../../assets/bg2.jpg";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("screen").height;

const Header = ({
  header = "",
  rightContainer = () => <View style={{ width: 55 }}></View>,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={moduleName} style={styles.image} />
      <View style={styles.headContainer}>
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
          <Text style={styles.arrText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{header}</Text>
        {rightContainer()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: height * 0.22,
    width: "100%",
    overflow: "hidden",
  },
  image: {
    height: height * 0.35,
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  headContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    paddingTop: 65,
    paddingBottom: height * 0.1,
    alignItems: "center",
    flex: 1,
  },
  leftContainer: { flexDirection: "row", alignItems: "center", width: 55 },
  arrow: {},
  arrText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  rightContainer: {
    alignSelf: "flex-end",
  },
});

export default Header;
