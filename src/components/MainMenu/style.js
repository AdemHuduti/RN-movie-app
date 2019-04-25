export default {
  mainMenuContainer: {
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  mainMenu: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    alignSelf: 'flex-end',
    right: 4
  },
  menuItem: {
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderTopColor: '#f3f3f4',
    borderTopWidth: 1,
    borderBottomColor: '#f3f3f4',
    borderBottomWidth: 1,
    marginTop: -1
  },
  menuItemText: {
    fontSize: 20,
    color: '#333'
  },
  disabledMenuItem: {
    backgroundColor: '#f1f1f1',
    borderTopColor: '#dfdfe0',
    borderBottomColor: '#dfdfe0',
    zIndex: 1
  },
  disabledMenuItemText: {
    color: '#cecece'
  },
}