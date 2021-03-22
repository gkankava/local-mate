import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";

const width = Dimensions.get("screen").width * 0.85;

const Main = () => {
  const nav = useNavigation();

  const shareAsync = async () => {
    try {
      const result = await Share.share({
        message: "Local Mate | Url for App Store / Play Store",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 30,
        paddingTop: 50,
        paddingBottom: 120,
        paddingRight: 30,
      }}
    >
      <TouchableOpacity
        style={styles.item}
        onPress={() => nav.navigate("Notifications")}
      >
        <View style={styles.innerWrapper}>
          <View style={{ ...styles.iconWrapper, backgroundColor: "#BB85D5" }}>
            <Ionicons name="ios-chatbox-outline" size={20} color="white" />
          </View>
          <Text style={styles.btnText}>Notifications</Text>
        </View>
        <Entypo name="chevron-thin-right" size={26} color="#E5E5E5" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => nav.navigate("Membership")}
      >
        <View style={styles.innerWrapper}>
          <View style={{ ...styles.iconWrapper, backgroundColor: "#D5859B" }}>
            <Ionicons name="ios-shirt-outline" size={20} color="white" />
          </View>
          <Text style={styles.btnText}>Become a Pro Member</Text>
        </View>
        <Entypo name="chevron-thin-right" size={26} color="#E5E5E5" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => nav.navigate("Favorites")}
      >
        <View style={styles.innerWrapper}>
          <View style={{ ...styles.iconWrapper, backgroundColor: "#85C8D5" }}>
            <Ionicons name="bookmark-outline" size={20} color="white" />
          </View>
          <Text style={styles.btnText}>Favorites</Text>
        </View>
        <Entypo name="chevron-thin-right" size={26} color="#E5E5E5" />
      </TouchableOpacity>
      <View style={styles.hr} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => shareAsync()}
        //open modal
      >
        <View style={styles.innerWrapper}>
          <View style={{ ...styles.iconWrapper, backgroundColor: "#636382" }}>
            <AntDesign name="link" size={18} color="white" />
          </View>
          <Text style={styles.btnText}>Invite a Friend</Text>
        </View>
        <Entypo name="chevron-thin-right" size={26} color="#E5E5E5" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.item, marginBottom: 0 }}
        onPress={() => nav.navigate("Help")}
      >
        <View style={styles.innerWrapper}>
          <View style={{ ...styles.iconWrapper, backgroundColor: "#CBB130" }}>
            <MaterialCommunityIcons
              name="umbrella-outline"
              size={20}
              color="white"
            />
          </View>
          <Text style={styles.btnText}>Help</Text>
        </View>
        <Entypo name="chevron-thin-right" size={26} color="#E5E5E5" />
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {},
  item: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  innerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    height: 34,
    width: 34,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontSize: 14, color: "#3A3A3C", marginLeft: 16 },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#EFEFF4",
    marginBottom: 16,
  },
});
export default Main;
