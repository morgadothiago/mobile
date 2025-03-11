import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10
  },
  label: {
    fontSize: 16,
    color: theme.colors.cardTextColor,
    fontFamily: theme.fontsRoboto.Regular
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  }
});