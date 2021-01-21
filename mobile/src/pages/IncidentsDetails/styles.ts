import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  caseContainer: {
    padding: 15,
    minHeight: 233,
    backgroundColor: '#ffffff',
    borderRadius: 10,
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

  imagesContainer: {
    marginTop: 10,
  },

  image: {
    width: Dimensions.get('window').width - 70,
    height: 210,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  contactContainer: {
    minHeight: 210,
    padding: 15,
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },

  title: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    lineHeight: 30,
    color: '#13131A',
  },

  contactText: {
    marginVertical: 20,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#737380',
  },

  groupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  contactButton: {
    width: 138,
    backgroundColor: '#1AC92C',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },

  textButton: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    color: '#F0F0F5',
  },
});

export default styles;
