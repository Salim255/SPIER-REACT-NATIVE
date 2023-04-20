//Here we offering two ways of picking a location.
//Locating the user through GPS, or allowing the user to pick a location on a map.

import React from "react";
import { View, StyleSheet } from "react-native";
import OutlineBtn from "./UI/OutlineBtn";
import { Colors } from "../constants/colors";
function LocationPicker() {
  function getLocationHandler() {}
  function pickOnMapHandler() {}
  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlineBtn icon="location" onPress={getLocationHandler}>
          Your current location
        </OutlineBtn>
        <OutlineBtn icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineBtn>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
