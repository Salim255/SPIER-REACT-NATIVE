import { Button, View } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
//Which launch the camera and wait us to take an image
function ImagePicker() {
  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      //To the user to edit the photo befor confirming it
      aspect: [16, 9],
      //To the ratio of the photo
      quality: 0.5,
      //To avoid getting super large images
    });
    console.log(image);
  }
  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
