import { StyleSheet } from "react-native";
import { theme } from "../../global/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F5F6',
  },
  headerTitle: {
    color: theme.colors.btnTextColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f3f5f7',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    color: theme.colors.cardTextColor,
  }
});

export default styles;
