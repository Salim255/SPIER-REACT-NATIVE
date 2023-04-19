import { View, StyleSheet, Text } from "react-native";
import PlaceItem from "./PlaceItem";

function Place({ place }) {
  if (!place) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No place Added Yet - Start Adding some!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <PlaceItem />
    </View>
  );
}

export default Place;
const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
