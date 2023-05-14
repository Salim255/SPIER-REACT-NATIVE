import { useState } from "react";
import ImagePicker from "./ImagePicker";
import { Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import LocationPicker from "./LocationPicker";
import Button from "./UI/Button";
function PlaceForm() {
  const [entredTitle, setEntredTitle] = useState("");
  function changeTitleHandler(entredText) {
    setEntredTitle(entredText);
  }

  function sendAlertHandler() {}
  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        onChangeText={changeTitleHandler}
        value={entredTitle}
        style={styles.input}
      />
      <ImagePicker />
      <LocationPicker />
      <Button onPress={sendAlertHandler}>Send alert</Button>
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
