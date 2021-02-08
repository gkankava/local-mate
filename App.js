// react / react-native, def
import React, { useState, useEffect } from "react";
import axios from "axios";
import { StatusBar } from "react-native";
import Constants from "expo-constants";
import jwtDecode from "jwt-decode";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

import { NavigationContainer } from "@react-navigation/native";
import localStorage from "@react-native-async-storage/async-storage";

// contextAPI, store
import { userContext, setUserContext } from "./store/contextApi";
import { userInitial } from "./store/user/user";
import { setTokenHeader } from "./store/tokenHeader";

// navigation stacks / screens
import AuthStack from "./nav-stacks/auth";
import MainStack from "./nav-stacks/main";
import VerifyStack from "./nav-stacks/verify";

// import SplashScreen from "./components/splash/splashScreen";

function App() {
  const [user, setCurrentUser] = useState(userInitial);

  const bootstrapAsync = async () => {
    try {
      let token = await localStorage.getItem("jwtToken");
      if (token !== null) {
        let id = jwtDecode(token).phone;
        // TODO :: server side token validation
        try {
          await axios
            .get(`${Constants.manifest.extra.proxy}/api/get-user-data/${id}`)
            .then((res) => {
              setTokenHeader(token);
              if (res.data.verified) {
                setCurrentUser({
                  isAuthenticated: true,
                  isVerified: true,
                  user: res.data,
                });
              } else {
                setCurrentUser({
                  isAuthenticated: true,
                  isVerified: false,
                  user: res.data,
                });
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // localStorage.clear();
    bootstrapAsync();
  }, []);

  // TODO: Background Picture Style (dark/light) --> status barstyle

  return (
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={user}>
        <setUserContext.Provider value={setCurrentUser}>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              translucent={true}
              backgroundColor="transparent"
            />
            {!user.isAuthenticated ? (
              <AuthStack />
            ) : !user.isVerified ? (
              <VerifyStack />
            ) : (
              <MainStack />
            )}
          </NavigationContainer>
        </setUserContext.Provider>
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
