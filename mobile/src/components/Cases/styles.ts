import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  caseContainer: {
    position: 'relative',
    padding: 15,
    minHeight: 233,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
  },

  buttonFavoriteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },

  properties: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 14,
    color: '#41414D',
    marginBottom: 2,
  },

  propertiesName: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#737380',
    marginBottom: 20,
  },

  separator: {
    position: 'absolute',
    bottom: 55,
    width: 500,
    height: 1,
    backgroundColor: '#F0F0F5',
  },

  detailsButton: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailsText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    color: '#1AC92C',
  },
});

export default styles;
