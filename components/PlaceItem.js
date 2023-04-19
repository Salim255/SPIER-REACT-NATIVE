import { Pressable, View, StyleSheet, Text } from "react-native";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>Hello Place</Text>
        <Text>Address</Text>
      </View>
    </Pressable>
  );
}
export default PlaceItem;

const styles = StyleSheet.create({});
