import { FlatList, StyleSheet, View } from 'react-native';
import PageHeaderComponent from '../components/home/PageHeader.component';
import ListHeaderComponent from '../components/home/ListHeader.component';
import ExpenseCardComponent from '../components/home/ExpenseCard.component';
import homeStyles from '../components/home/home.styles';
import REM from '../styles/size';

const Separator = () => <View style={styles.separator} />;

const HomePage = () => {
  const data: string[] = Array.from({ length: 20 }, (_, i) => i.toString());
  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <PageHeaderComponent />
          <ListHeaderComponent />
        </View>
      }
      data={data}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={homeStyles.container}>
          <ExpenseCardComponent title={item} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: REM,
  },
  listContainer: {
    paddingBottom: 2 * REM,
  },
});

export default HomePage;
