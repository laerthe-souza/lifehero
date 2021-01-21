import { StyleSheet } from 'react-native';

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
    marginBottom: 10,
  },
});

export default styles;
