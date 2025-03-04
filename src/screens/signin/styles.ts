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
  header: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  form: {
    padding: 20,
    gap: 10,
    backgroundColor: theme.colors.primary,
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
  },
  formContent: {

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
    marginBottom: 50,
    gap: 15,

  },
  error: {
    color: theme.colors.btnBackground,

    fontFamily: theme.fontsRoboto.Regular,
  },
  forgotPasswordArea: {
    marginTop: 50,
  }
});

export default styles;