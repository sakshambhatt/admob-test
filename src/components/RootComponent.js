import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";

export default function RootComponent() {
  const { userId } = useUser();

  return (
    <View style={styles.container}>
      {userId !== null ? <Home /> : <SignIn />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
