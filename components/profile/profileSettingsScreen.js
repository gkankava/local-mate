import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Content from "./shared/Content";
import Header from "./shared/header";
import InputContainer from "./comp/InputContainer";

import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "../../store/user/user";

import { userContext, setUserContext } from "../../store/contextApi";
import { userInitial } from "../../store/user/user";

const ProfileSettingsScreen = () => {
  const nameIcon = <AntDesign name="user" size={14} color="#A5A5A5" />;
  const mailIcon = <EvilIcons name="envelope" size={14} color="#A5A5A5" />;
  const phoneIcon = (
    <SimpleLineIcons name="screen-smartphone" size={14} color="#A5A5A5" />
  );
  const flagIcon = <AntDesign name="flag" size={14} color="#A5A5A5" />;
  const homeIcon = <AntDesign name="home" size={14} color="#A5A5A5" />;
  const locationIcon = <EvilIcons name="location" size={14} color="#A5A5A5" />;

  const currentUser = useContext(userContext);
  const setCurrentUser = useContext(setUserContext);

  let {
    username,
    name,
    email,
    phone,
    country,
    address,
    postCode,
  } = currentUser.user;

  const [profile, setProfile] = useState({
    name: name ? name : "-",
    email: email ? email : "-",
    phone: phone ? phone : "-",
    country: country ? country : "-",
    address: address ? address : "-",
    postCode: postCode ? postCode : "-",
  });

  const logOut = () => {
    logout();
    setCurrentUser(userInitial);
  };

  return (
    <>
      <Header header={"Profile"} />
      <Content>
        <ScrollView contentContainerStyle={{ paddingBottom: 53 }}>
          <InputContainer
            icon={nameIcon}
            name={"Name"}
            content={profile.name}
            state={profile}
            setState={setProfile}
            curRef={"name"}
            username={username}
          />
          <InputContainer
            icon={mailIcon}
            name={"E-mail"}
            content={profile.email}
            state={profile}
            setState={setProfile}
            curRef={"email"}
            username={username}
          />
          <InputContainer
            icon={phoneIcon}
            name={"Phone Number"}
            content={profile.phone}
            state={profile}
            setState={setProfile}
            curRef={"phone"}
            username={username}
          />
          <InputContainer
            icon={flagIcon}
            name={"Country"}
            content={profile.country}
            state={profile}
            setState={setProfile}
            curRef={"country"}
            username={username}
          />
          <InputContainer
            icon={homeIcon}
            name={"Adress"}
            content={profile.address}
            state={profile}
            setState={setProfile}
            curRef={"address"}
            username={username}
          />
          <InputContainer
            icon={locationIcon}
            name={"Postal Code"}
            content={profile.postCode}
            state={profile}
            setState={setProfile}
            curRef={"postCode"}
            username={username}
          />
        </ScrollView>
      </Content>
      <TouchableOpacity
        style={styles.bottomContainer}
        onPress={() => {
          logOut();
        }}
      >
        <SimpleLineIcons name="logout" size={24} color="#C10000" />
        <Text
          style={{
            color: "#C10000",
            fontSize: 14,
            fontWeight: "600",
            marginTop: 5,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 53,
  },
});

export default ProfileSettingsScreen;
