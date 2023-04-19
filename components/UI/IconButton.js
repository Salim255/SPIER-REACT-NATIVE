import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

function IconButton({ color, size, icon, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Icon name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;
/* function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Iconicons name={icon} size={size} color={color} />
    </Pressable>
  );
}
export default IconButton; */
const styles = StyleSheet.create({
  button: {
    padding: 8,
    margi: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
