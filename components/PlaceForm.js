import { useCallback, useEffect, useState, useRef } from "react";
import ImagePicker from "./ImagePicker";
import { Text, ScrollView, TextInput, StyleSheet } from "react-native";

import { Colors } from "../constants/colors";
import LocationPicker from "./LocationPicker";
import Button from "./UI/Button";
import Address from "./Address";

import * as MailComposer from "expo-mail-composer";

function PlaceForm() {
  const [entredTitle, setEntredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState({
    city: "",
    country: "",
    postalCode: "",
    region: "",
    street: "",
    streetNumber: "",
    subregion: "",
    isoCountryCode: "",
  });
  const [getedAddress, setGetedAddress] = useState(false);
  const [isAvailabel, setIsAvaulable] = useState(false);
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userAddress, setUserAddress] = useState();
  function changeTitleHandler(entredText) {
    setEntredTitle(entredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const geocodeHandler = async (mapPickedLocation, reverseGeocodeAsync) => {
    const geocodedLocation = await reverseGeocodeAsync({
      longitude: mapPickedLocation.lng,
      latitude: mapPickedLocation.lat,
    });

    if (geocodedLocation.length > 0) {
      setAddress({
        city: geocodedLocation[0].city,
        country: geocodedLocation[0].country,
        postalCode: geocodedLocation[0].postalCode,
        region: geocodedLocation[0].region,
        street: geocodedLocation[0].street,
        streetNumber: geocodedLocation[0].streetNumber,
        subregion: geocodedLocation[0].subregion,
        isoCountryCode: geocodedLocation[0].isoCountryCode,
      });
      setGetedAddress(!getedAddress);
    }
  };

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvaulable(isMailAvailable);
    }
    checkAvailability();
  }, []);
  const html = `<div>
  <p> ${subject}</p>
  <p>At the address: ${address.postalCode} ${address.city},  ${address.streetNumber} ${address.street}  </p>
  Region: ${address.region}</p>
  <p>Reported by: </p>
  <p>${lastName} ${firstName}</p>
  <p>Phone number: ${phone}</p>
  <p>Address: ${userAddress}</p>
  <p>Email: ${email}</p>
  </div>`;
  function sendAlertHandler() {
    MailComposer.composeAsync({
      subject: entredTitle,
      body: html,
      recipients: ["doshka23@gmail.com"],
      isHtml: true,
      attachments: [selectedImage],
    });
  }

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        onChangeText={changeTitleHandler}
        value={entredTitle}
        style={styles.input}
        placeholder="Subject"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        aria-label="t1"
        numberOfLines={4}
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Description"
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        onChangeText={setlastName}
        value={lastName}
        style={styles.input}
        placeholder="Last name"
      />
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First name"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={userAddress}
        onChangeText={setUserAddress}
        placeholder="Your address"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Your email"
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Your phone number"
      />
      <ImagePicker onTakenImage={takeImageHandler} />
      <LocationPicker
        onPickLocation={pickLocationHandler}
        geocodeHandler={geocodeHandler}
        setAddress={setAddress}
      />
      <Address address={address}></Address>
      {isAvailabel && <Button onPress={sendAlertHandler}>Send alert</Button>}
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
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.gray700,
    backgroundColor: Colors.primary700,
    placeholderTextColor: Colors.gray700,
  },
});
