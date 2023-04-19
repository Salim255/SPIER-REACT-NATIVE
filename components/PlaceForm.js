import { useState } from "react";
import ImagePicker from "./ImagePicker";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
function PlaceForm() {
  const [entredTitle, setEntredTitle] = useState("");
  function changeTitleHandler(entredText) {
    setEntredTitle(entredText);
  }
  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        onChangeText={changeTitleHandler}
        value={entredTitle}
        style={styles.input}
      />
      <ImagePicker />
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary700,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
