import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  AsyncStorage,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SpotList from "../components/SpotList";

import logo from "../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(", ");

      setTechs(techsArray);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20
  }
});
