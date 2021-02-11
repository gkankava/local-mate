import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../shared/assets/modal";
import env from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const header = ({ img, title, subTitle }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  let prox = env.manifest.extra.proxy;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: img }} style={styles.image}>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 50,
            // height: "100%",
          }}
        >
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <Menu
            vis={menuVisible}
            setVis={setMenuVisible}
            nav={navigation}
            height={height}
          />
          <TouchableOpacity
            onPress={() => {
              setMenuVisible(!menuVisible);
            }}
          >
            <Image source={require("../../../assets/hmb.png")} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.profileContainer}>
            <View style={styles.profileText}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {title}
              </Text>
              <Text style={{ color: "white", fontSize: 14, fontWeight: "200" }}>
                {subTitle}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat");
            }}
          >
            <LinearGradient
              start={[0, 0]}
              end={[1, 1]}
              style={{
                height: 40,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
              colors={["#61E5FF", "#06F877"]}
            >
              <Text
                style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
              >
                Ask Mate
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: height * 0.38,
  },
  image: {
    height: height * 0.38,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    // position: "absolute",
    // top: 100,
    // left: 25,
  },

  profileText: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  menuWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 20,
    padding: 25,
  },
});

export default header;
