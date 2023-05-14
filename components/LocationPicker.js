//Here we offering two ways of picking a location.
//Locating the user through GPS, or allowing the user to pick a location on a map.

import { Alert, View, StyleSheet, Text, Image } from "react-native";
import OutlineBtn from "./UI/OutlineBtn";
import { Colors } from "../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapPreview } from "../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      //We will have a route params if we coming backe from pick map screen
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      if (mapPickedLocation) {
        setPickedLocation(mapPickedLocation);
      }
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);
  //We need this permison to allow get to  the user location
  async function verifyPermissions() {
    //In here we will check if we already have permission to use camera

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      //Case there is no permission yet
      const permissionResponse = await requestPermission();

      return permissionResponse.granted; //This will return true or false, depend on user action
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      //In case we dont have permission
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    //We return true if we have the permission to use the camera

    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      lat: location.coords.altitude,
      lng: location.coords.longitude,
    });
  }
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  console.log("====================================");
  console.log(pickedLocation);
  console.log("====================================");
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
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
  image: {
    width: "100%",
    height: "100%",
  },
});
