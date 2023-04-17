import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PlaceForm from "./components/PlaceForm";
export default function App() {
  return <PlaceForm />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
