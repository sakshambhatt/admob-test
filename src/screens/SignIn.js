import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { expoClientId, googleOAuthApi } from "../configs/config.js";

// WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
  });
  const { userDispatch } = useUser();

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      (async function () {
        try {
          const user = await axios.get(
            `${googleOAuthApi}/userinfo?access_token=${authentication.accessToken}`
          );
          userDispatch({
            type: "logIn",
            value: {
              userId: user.data.id,
              userName: user.data.name,
              email: user.data.email,
              userToken: authentication.accessToken,
            },
          });
        } catch (err) {
          console.log("user: ", err);
        }
      })();
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>sign in with google</Text>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
        style={styles.button}
      >
        <Text>google sign-in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
