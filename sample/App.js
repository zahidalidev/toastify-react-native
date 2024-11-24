import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

import Another from "./Another";

const App = () => {
  const showToasts = () => {
    Toast.success("Promised is resolved", "top");
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <Another />
      <TouchableOpacity
        onPress={showToasts}
        style={{
          backgroundColor: "white",
          borderColor: "green",
          borderWidth: 1,
          padding: 10,
        }}
      >
        <Text>SHOW SOME AWESOMENESS!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
