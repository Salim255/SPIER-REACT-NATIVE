import { Pressable, StyleSheet, Text } from "react-native";
import Iconicons from "@expo/vector-icons/Ionicons";

import { Colors } from "../constants/colors";
function OutlineBtn({ icon, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={(pressed) => [styles.button, pressed & styles.pressed]}
    >
      <Iconicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
export default OutlineBtn;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
