import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.btnTextColorBlack,
    justifyContent: 'space-between',
    width: '100%',
    height: 516,


  },
  form: {

    gap: 6,
    backgroundColor: theme.colors.primary,
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
  },
  formContent: {
    gap: 10,
  },
  formTitle: {
    color: theme.colors.btnTextColor,
    fontSize: 24,
    fontFamily: theme.fontsRoboto.Bold,
  },
  headerTitle: {
    color: theme.colors.btnTextColor,
    fontSize: 24,
    fontFamily: theme.fontsRoboto.Bold,
  },
  forgotPassword: {
    color: theme.colors.btnBackground,
    fontSize: 20,
    fontFamily: theme.fontsRaleway.Bold,
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 79,
    borderRadius: 50,
    marginBottom: 100,
    gap: 5,
  },
  error: {
    color: theme.colors.btnBackground,
    fontSize: 12,
    fontFamily: theme.fontsRoboto.Regular,
  }
});

export default styles;
