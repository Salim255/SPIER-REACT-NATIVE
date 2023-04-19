import { Alert, Button, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

//Which launch the camera and wait us to take an image

function ImagePicker() {
  //For ios
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    console.log("🍎");
    console.log(
      cameraPermissionInformation.status,
      "🍎",
      PermissionStatus.UNDETERMINED
    );
    //In here we will check if we already have permission to use camera
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      console.log(cameraPermissionInformation.status, "🍎");
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
    console.log("🍎 last", cameraPermissionInformation.status);
    return true;
  }

  async function takeImageHandler() {
    //Needed for IOS permission
    const hasPermission = await verifyPermission();
    console.log("====================================");
    console.log(hasPermission, "🍎 has");
    console.log("====================================");
    if (!hasPermission) {
      return;
    }
    //

    const image = await launchCameraAsync({
      allowsEditing: true,
      //To the user to edit the photo befor confirming it
      aspect: [16, 9],
      //To the ratio of the photo
      quality: 0.5,
      //To avoid getting super large images
    });
    console.log(image, "🍎");
  }
  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
