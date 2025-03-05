import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  header: {

    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',

  },
  headerWarpper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66324B'
  },
  menuItems: {
    padding: 20
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 10
  },
  menuText: {
    fontSize: 16,
    color: '#66324B'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  logoutText: {
    fontSize: 16,
    color: '#FF0000'
  }
}); 