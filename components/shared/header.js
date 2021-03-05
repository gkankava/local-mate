import React, { useContext, useState } from "react";
import { Dimensions, View, Platform, Text } from "react-native";

import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import env from "expo-constants";
import { userContext } from "../../store/contextApi";

import Forground from "./forground";
import FixedForground from "./fixedForground";
import { TouchableOpacity } from "react-native-gesture-handler";

const image = require("../../assets/bg2.jpg");

const height = Dimensions.get("screen").height;

const header = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { name, profilePicture } = useContext(userContext).user;
  let pp = env.manifest.extra.proxy + profilePicture;

  const [scrollY, setScrollY] = useState(0);

  return (
    <>
      <HeaderImageScrollView
        // style={{ backgroundColor: "white", borderTopRightRadius: 50 }}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        maxHeight={height * 0.4}
        minHeight={height * 0.18}
        headerImage={image}
        maxOverlayOpacity={0.5}
        minOverlayOpacity={0.1}
        // renderHeader={() => <Image source={image} />}
        renderForeground={() => (
          <>
            <Forground
              opacity={
                scrollY < 100 && scrollY > 0
                  ? (100 - scrollY) / 100
                  : scrollY < 0
                  ? (scrollY + 100) / 100
                  : 1
              }
              display={scrollY < 100 ? "flex" : "none"}
              menuVisible={menuVisible}
              setMenuVisible={setMenuVisible}
              h={height}
              name={name}
              pp={pp}
            />
          </>
        )}
        renderTouchableFixedForeground={() => (
          <FixedForground
            display={scrollY >= 100 ? "flex" : "none"}
            menuVisible={menuVisible}
            setMenuVisible={setMenuVisible}
            h={height}
            name={name}
            pp={pp}
          />
        )}
      >
        <View
          style={{
            height: 1000,
            top: Platform.OS === "ios" ? -50 : 0,
            // top: -50,
            borderTopRightRadius: 50,
            backgroundColor: "white",
            paddingBottom: 100,
            height: "100%",
          }}
        >
          {props.children ? props.children : null}
        </View>
      </HeaderImageScrollView>
    </>
  );
};

export default header;
