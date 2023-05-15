import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Address({
  city,
  country,
  postalCode,
  region,
  street,
  streetNumber,
  subregion,
  isoCountryCode,
}) {
  return (
    <View>
      <Text>{city}</Text>
      <Text>{country}</Text>
    </View>
  );
}

export default Address;

const styles = StyleSheet.create({});
