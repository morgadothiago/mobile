import { StyleSheet } from "react-native";
import { theme } from "../../../global/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  content: {
    width: '85%',
    gap: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  totalRecipes: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66324B',
  },
  totalRecipesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66324B',
  },
  totalRecipesTextNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.btnBackground,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  emptyListTextContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '70%',
  },
  emptyListText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#66324B',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    marginTop: 34

  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',

  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66324B',
  },
  modalDescription: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#66324B',
    marginTop: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  filterTitle: {
    fontSize: 20,
    color: theme.colors.cardTextColor,
    fontFamily: theme.fontsRoboto.Bold,
    marginBottom: 10,
    marginTop: 10
  },
  filterFavoriteAresContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    gap: 10
  },
  filterFavoriteAresTitle: {
    fontSize: 16,
    color: theme.colors.cardTextColor,
    fontFamily: theme.fontsRoboto.Bold,

  },
  filterButtonContainer: {

    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    width: '100%'
  }
})