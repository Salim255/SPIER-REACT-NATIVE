import { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import { Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import LocationPicker from "./LocationPicker";
import Button from "./UI/Button";
function PlaceForm() {
  const [entredTitle, setEntredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [address, setAddress] = useState();
  function changeTitleHandler(entredText) {
    setEntredTitle(entredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function sendAlertHandler() {
    console.log(pickedLocation, selectedImage);
  }

  const geocodeHandler = async (mapPickedLocation, reverseGeocodeAsync) => {
    const geocodedLocation = await reverseGeocodeAsync({
      longitude: mapPickedLocation.lng,
      latitude: mapPickedLocation.lat,
    });

    console.log("====================================");
    console.log(geocodedLocation, "result", mapPickedLocation);
    console.log("====================================");
  };
  /*   const geocodeHandler = async (location, Location) => {
    console.log("====================================");
    console.log(location, "🆎🆎");
    console.log("====================================");
    //const geocodedLocation = await Location.geocodeAsync(location);
    console.log("====================================");
    console.log("Geocoded Addres: ");
    console.log("====================================");
    console.log("====================================");
    //console.log(geocodedLocation);
    console.log("====================================");
  }; */
  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        onChangeText={changeTitleHandler}
        value={entredTitle}
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput aria-label="t1" numberOfLines={4} style={styles.input} />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        onChangeText={changeTitleHandler}
        value={entredTitle}
        style={styles.input}
      />
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} />
      <ImagePicker onTakenImage={takeImageHandler} />
      <LocationPicker
        onPickLocation={pickLocationHandler}
        geocodeHandler={geocodeHandler}
        setAddress={setAddress}
      />
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
