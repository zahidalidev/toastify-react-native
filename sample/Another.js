import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Toast } from "toastify-react-native";

const Another = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => Toast.info("Lorem ipsum info", "bottom")} style={styles.buttonStyle}>
      <Text>SHOW SOME AWESOMENESS!</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
  },
});

export default Another;
