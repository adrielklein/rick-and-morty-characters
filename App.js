import { StatusBar } from "expo-status-bar";
import { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const loadData = useCallback(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((json) => {
        console.log("lala", json.results);
        setCharacters(json.results);
        setRefreshing(false);
      })
      .catch((error) => console.error(error));
  }, [setCharacters, setRefreshing]);
  const onResetTap = useCallback(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform data load here
    loadData();
    setRefreshing(false);
  }, [loadData, setRefreshing]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>{item.name}</Text>
        <Text style={styles.rowText}>{item.status}</Text>
        <Text style={styles.rowText}>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleText}>Rick and Morty Characters</Text> */}
      <TouchableOpacity style={styles.resetButton} onPress={onResetTap}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Height</Text>
      </View>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(character) => character.id}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={{ alignItems: "center", padding: 20 }}>
            <Text>Pull to load data</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <StatusBar style="auto" />
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
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContainer: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    width: "33%",
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  rowText: {
    width: "33%",
    textAlign: "center",
  },

  resetButton: {
    marginBottom: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
