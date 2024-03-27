import { StyleSheet, Text, View } from 'react-native';
import AppClima from './AppClima';

export default function App() {
  return (
    <View style={styles.container}>
      <AppClima />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CA4ED',
    paddingTop: 90,
  },
  
});
