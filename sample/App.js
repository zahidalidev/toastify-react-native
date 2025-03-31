// App.js
import React from "react";
import { View, Button, Text } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

// Custom toast configuration (optional)
const toastConfig = {
  success: (props) => (
    <View style={{ backgroundColor: "green", padding: 20, borderRadius: 10 }}>
      <Text style={{ color: "white" }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: "white" }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
};

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Show Success Toast"
        onPress={() => {
          Toast.success("Success message!");
        }}
      />

      <Button
        title="Show Error Toast"
        onPress={() => {
          Toast.show({
            type: "error",
            text1: "Main message",
            text2: "Secondary message",
            progressBarColor: "green",
          });
        }}
      />

      <Button
        title="Show Info Toast"
        onPress={() => {
          Toast.info("Info message!");
        }}
      />

      <Button
        title="Show Custom Toast"
        onPress={() => {
          Toast.show({
            type: "success",
            text1: "Main message",
            text2: "Secondary message",
            position: "bottom",
            visibilityTime: 4000,
            autoHide: true,
            onPress: () => console.log("Toast pressed"),
            onShow: () => console.log("Toast shown"),
            onHide: () => console.log("Toast hidden"),
          });
        }}
      />

      {/* Toast provider should be at the root level */}
      <ToastManager animationStyle="fade" position="center" config={toastConfig} />
    </View>
  );
}
