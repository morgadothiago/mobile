import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.btnTextColorBlack,
    justifyContent: 'space-around',
    width: '100%',
    height: 516,
  },

  form: {
    paddingHorizontal: 20,

    backgroundColor: theme.colors.primary,
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-evenly',
  },
  formContent: {
    gap: 20,
  },
  formTitle: {
    color: theme.colors.btnTextColorBlack,
    fontSize: 18,
    fontFamily: theme.fontsRoboto.Regular,

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
    marginBottom: 50,
  },
  error: {
    color: theme.colors.btnBackground,
    fontSize: 12,
    fontFamily: theme.fontsRoboto.Regular,
  }
});

export default styles;