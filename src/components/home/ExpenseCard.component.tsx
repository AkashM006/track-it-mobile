import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../styles/colors';
import REM from '../../styles/size';
import { Trash } from 'lucide-react-native';

type ExpenseCardProps = {
  title: string;
};

const ExpenseCardComponent = ({ title }: ExpenseCardProps) => {
  const onDeleteExpense = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.line}>
          <Text numberOfLines={1} style={styles.title}>
            ExpenseCardComponent: {title}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            {'\u20B9'} 90.00
          </Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.subtitle} numberOfLines={1}>
            Food
          </Text>
          <Text style={styles.subtitle}>23/09/2025</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onDeleteExpense}
        style={styles.deleteContainer}
      >
        <Trash color={COLORS.errorAccent} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceLight,
    padding: REM,
    borderRadius: REM,
    flexDirection: 'row',
    alignItems: 'center',
    gap: REM,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    maxWidth: '40%',
    fontSize: REM,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 0.75 * REM,
    color: COLORS.onSurfaceDark,
  },
  infoContainer: {
    flex: 1,
  },
  deleteContainer: {},
});

export default ExpenseCardComponent;
