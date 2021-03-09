import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("screen").height;

const modal = ({ vis, setVis, profileStack }) => {
  React.useEffect(() => {}, []);
  const nav = useNavigation();

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(false);
        }}
      >
        <View
          onStartShouldSetResponder={() => {
            setVis(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 14, color: "#85C8D5", marginBottom: 16 }}>
              My Stats
            </Text>
            <Text
              style={{ fontSize: 14, marginBottom: 16 }}
              onPress={() => {
                setVis(false);
                {
                  profileStack
                    ? nav.navigate("SettingsBilling")
                    : nav.navigate("Profile", { screen: "SettingsBilling" });
                }
              }}
            >
              Billing
            </Text>
            <Text
              style={{ fontSize: 14, marginBottom: 16 }}
              onPress={() => {
                setVis(false);
                {
                  profileStack
                    ? nav.navigate("SettingsProfile")
                    : nav.navigate("Profile", { screen: "SettingsProfile" });
                }
              }}
            >
              Profile
            </Text>
            <Text
              style={{ fontSize: 14, marginBottom: 16 }}
              onPress={() => {
                setVis(false);
                {
                  profileStack
                    ? nav.navigate("Settings")
                    : nav.navigate("Profile", { screen: "Settings" });
                }
              }}
            >
              Settings
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    alignSelf: "flex-end",
    right: 16,
    marginTop: (height * 0.18) / 2,
    width: 164,
    height: 164,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 20,
    alignItems: "flex-start",
  },
});

export default modal;
