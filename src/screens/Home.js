import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { useUser } from "../contexts/UserContext";
import { rewardedAdId } from "../configs/config";
import icon from "../../assets/icon.png";

export default function Home() {
  const { userName, userDispatch } = useUser();
  const [toShowAd, setToShowAd] = useState(false);
  const balance = Math.floor(Math.random() * 11);
  useEffect(() => {
    if (toShowAd) {
      (async function () {
        try {
          // Display a rewarded ad
          await AdMobRewarded.setAdUnitID(rewardedAdId);
          await AdMobRewarded.requestAdAsync();
          await AdMobRewarded.showAdAsync();
        } catch (err) {
          console.log("ad: ", err);
        } finally {
          setToShowAd(false);
        }
      })();
    }
  }, [toShowAd]);
  return (
    <View style={styles.container}>
      <View>
        <Image source={icon} style={{ width: 180, height: 180 }}></Image>
      </View>
      <View>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.heading}>
          admob-test
        </Text>
        <Text>welcome, {userName.toLowerCase()}</Text>
        <Text>
          you have {balance} {`coin${balance === 1 ? "" : "s"}`}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setToShowAd(true)}
        >
          <Text>watch ad</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userDispatch({ type: "logOut" })}
        >
          <Text>log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  heading: {
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: "10%",
  },
});
