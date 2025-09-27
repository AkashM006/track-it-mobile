import { FlatList, StyleSheet, View } from 'react-native';
import PageHeaderComponent from '../components/home/PageHeader.component';
import ListHeaderComponent from '../components/home/ListHeader.component';
import ExpenseCardComponent from '../components/home/ExpenseCard.component';
import homeStyles from '../components/home/home.styles';
import REM from '../styles/size';
import FloatingAddButtonComponent from '../components/home/FloatingAddButton.component';
import ExpenseFormComponent from '../components/home/ExpenseForm.component';
import { useRef } from 'react';
import { CustomModalRef } from '../components/common/CustomModal.component';

const Separator = () => <View style={styles.separator} />;

const HomePage = () => {
  const formRef = useRef<CustomModalRef>(null);
  const data: string[] = Array.from({ length: 20 }, (_, i) => i.toString());

  const onOpenExpenseForm = () => {
    formRef.current?.open();
  };

  return (
    <View style={styles.container}>
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
      <FloatingAddButtonComponent onOpenExpenseForm={onOpenExpenseForm} />
      <ExpenseFormComponent ref={formRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  separator: {
    height: REM,
  },
  listContainer: {
    paddingBottom: 2 * REM,
  },
});

export default HomePage;
