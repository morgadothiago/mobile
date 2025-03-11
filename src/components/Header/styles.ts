import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.cardTextColor,
    fontFamily: theme.fontsRoboto.Bold,
  }
});

export default styles; 