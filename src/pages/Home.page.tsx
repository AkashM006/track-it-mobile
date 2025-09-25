import { View } from 'react-native';
import HeaderComponent from '../components/home/Header.component';
import ListComponent from '../components/home/List.component';

const HomePage = () => {
  return (
    <View>
      <HeaderComponent />
      <ListComponent />
    </View>
  );
};

export default HomePage;
