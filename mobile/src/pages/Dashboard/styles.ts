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

  totalCasos: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
    color: '#737380',
  },

  title: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 25,
    color: '#13131A',
    marginTop: 18,
    marginBottom: 4,
  },

  subtitle: {
    maxWidth: 240,
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
    color: '#737380',
    lineHeight: 30,
    marginBottom: 15,
  },

  filterContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },

  form: {
    width: Dimensions.get('window').width - 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1AC92C',
    alignItems: 'center',
  },

  formTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },

  filterButton: {
    width: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },

  textFilterButton: {
    color: '#1AC92C',
  },
});

export default styles;
