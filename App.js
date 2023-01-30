import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const loadData = useCallback(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((response) => response.json())
      .then((json) => {
        setCharacters(json.results);
        setNextPageUrl(json.info.next);
        setRefreshing(false);
      })
      .catch((error) => console.error(error));
  }, [setCharacters, setRefreshing, setNextPageUrl]);


  const handleLoadMore = useCallback(() => {
    if (!nextPageUrl) {
      return;
    }
    setLoadingMore(true);
    fetch(nextPageUrl)
      .then((response) => response.json())
      .then((json) => {
        setNextPageUrl(json.info.next);
        setCharacters([...characters, ...json.results]);
      })
      .catch((error) => console.error(error));
    setLoadingMore(false);
  }, [setCharacters, setNextPageUrl, setLoadingMore, nextPageUrl, characters]);
  const onResetTap = useCallback(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData, setRefreshing]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.rowContainer}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <Text style={styles.rowText}>{item.name}</Text>
        <Text style={styles.rowText}>{item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Rick and Morty Characters</Text>
      <TouchableOpacity style={styles.resetButton} onPress={onResetTap}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Image</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(character) => character.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        ListEmptyComponent={
          <View style={{ alignItems: "center", padding: 20 }}>
            <Text>Pull to load data</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loadingMore && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )
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
    marginBottom: 10,
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
  image: {
    height: 50,
    width: 50,
  },
});
