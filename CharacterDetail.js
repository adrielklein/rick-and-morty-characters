import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";

import { calculateSeasonBreakdown } from "./seasonsCalculations";

export function CharacterDetail({ route }) {
  const character = route.params;
  console.log("lala", character.image);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: character.image,
        }}
      />
      <Text style={styles.titleText}>{character.name}</Text>
      <Text>({character.status})</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Season Appearances</Text>
        <Text>{calculateSeasonBreakdown(character.episode)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    width: 200,
  },
  section: {
    marginTop: 20,
    alignItems: 'center'
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
