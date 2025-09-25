import { useState } from 'react';
import AppNavigation from './routes/navigation';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import UserDetailsComponent from './components/user-details/UserDetails.component';
import Loader from './components/common/Loader.component';

const Main = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <UserDetailsComponent setLoading={setLoading} />
        <ActivityIndicator size="large" />
        <Text>Loading user details...</Text>
      </View>
    );
  }

  return (
    <>
      <Loader />
      <AppNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
