import { Alert, View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import OutlineBtn from "./OutlineBtn";

//Which launch the camera and wait us to take an image

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  //For ios
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    //In here we will check if we already have permission to use camera
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      //Case there is no permission yet
      const permissionResponse = await requestPermission();

      return permissionResponse.granted; //This will return true or false, depend on user action
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      //In case we dont have permission
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }
    //We return true if we have the permission to use the camera

    return true;
  }

  async function takeImageHandler() {
    //Needed for IOS permission
    /*  const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    } */
    //

    const image = await launchCameraAsync({
      allowsEditing: true,
      //To the user to edit the photo befor confirming it
      aspect: [16, 9],
      //To the ratio of the photo
      quality: 0.5,
      //To avoid getting super large images
    });
    setPickedImage(image.assets[0].uri);
  }
  let imagePreview = <Text>No Image Taken Yet</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  console.log("====================================");
  console.log(pickedImage, "hello 🍎");
  console.log("====================================");
  return (
    <View>
      <View style={styles.impagePreview}>{imagePreview}</View>
      <OutlineBtn onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlineBtn>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  impagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
