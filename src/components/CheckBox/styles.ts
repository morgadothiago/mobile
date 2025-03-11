import { StyleSheet } from "react-native";
import { theme } from "../../global/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',

    alignItems: 'flex-start', // Align items to the start
    flexDirection: 'column',
    justifyContent: 'center', // Center items vertically
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',


  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.cardTextColor,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.cardTextColor,
    marginLeft: 8,
  },
  checkboxActiveContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.btnBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    width: 15,
    height: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.btnBackground,
    backgroundColor: theme.colors.btnBackground,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.cardTextColor,
  },
  radioButtonChecked: {
    width: 15,
    height: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.btnBackground,
  },
  radioButtonUnchecked: {
    width: 15,
    height: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.cardTextColor,
  },

});