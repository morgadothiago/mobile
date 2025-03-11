import { StyleSheet } from "react-native";
import { theme } from "../../global/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f4f6',
    width: 54,
    height: 54,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFilter: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: theme.colors.btnBackground,
    width: 21,
    height: 21,
    borderRadius: 6,
    color: '#fff',
    textAlign: 'center',
  }
});
