import { StyleSheet } from "react-native";
import { SCALE } from "../utils/helpers";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },

  mainContainer: {
    borderRadius: 6,
    position: "absolute",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  hideButton: {
    position: "absolute",
    top: SCALE(3.2),
    right: SCALE(3.2),
  },

  textStyle: {
    fontSize: SCALE(16),
    fontWeight: "400",
  },

  progressBarContainer: {
    flexDirection: "row",
    position: "absolute",
    height: 4,
    width: "100%",
    bottom: 0,
  },

  content: {
    width: "100%",
    padding: SCALE(9.6),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  iconWrapper: {
    marginRight: SCALE(4.48),
  },
});

export default styles;
