import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("screen").height;

const MenuModal = ({ menuModalVisible, setMenuModalVisible }) => {
  const nav = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={menuModalVisible}
      onRequestClose={() => {
        setMenuModalVisible(false);
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: "transperant" }}
        onStartShouldSetResponder={() => {
          setMenuModalVisible(false);
        }}
      >
        <View
          style={styles.modalView}
          onStartShouldSetResponder={() => {
            setMenuModalVisible(false);
          }}
        >
          <Text style={{ fontSize: 14, color: "#85C8D5", marginBottom: 16 }}>
            My Stats
          </Text>
          <Text
            style={{ fontSize: 14, marginBottom: 16 }}
            onPress={() => {
              setMenuModalVisible(false);
              nav.navigate("SettingsBilling");
            }}
          >
            Billing
          </Text>
          <Text
            style={{ fontSize: 14, marginBottom: 16 }}
            onPress={() => {
              setMenuModalVisible(false);
              nav.navigate("SettingsProfile");
            }}
          >
            Profile
          </Text>
          <Text
            style={{ fontSize: 14, marginBottom: 16 }}
            onPress={() => {
              setMenuModalVisible(false);
              nav.navigate("Settings");
            }}
          >
            Settings
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  backdrop: {},
  modal: {},
  modalView: {
    alignSelf: "flex-end",
    right: 35,
    // marginTop: (height * 0.09) / 2,
    top: 60,
    width: 164,
    height: 164,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 20,
    alignItems: "flex-start",
  },
});

export default MenuModal;
