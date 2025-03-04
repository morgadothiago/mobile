import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 40
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
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