import { View, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";

function Place() {
  if (!place) {
    return (
      <View style={style.fallbackContainer}>
        <Text style={style.fallbackText}>
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
