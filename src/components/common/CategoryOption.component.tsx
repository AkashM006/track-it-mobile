import { Text, Pressable, StyleSheet } from 'react-native';
import REM from '../../styles/size';
import COLORS from '../../styles/colors';

type CategoryOptionProps = {
  categoryName: string;
  onPress: (name: string) => void;
  selected: boolean;
};

const CategoryOptionComponent = ({
  categoryName,
  onPress,
  selected,
}: CategoryOptionProps) => {
  let containerStyles = {
    ...styles.container,
  };

  if (selected) {
    containerStyles = {
      ...containerStyles,
      ...styles.selected,
    };
  }

  return (
    <Pressable style={containerStyles} onPress={() => onPress(categoryName)}>
      <Text style={styles.text}>{categoryName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 0.5 * REM,
    borderRadius: 0.5 * REM,
    borderColor: COLORS.surfaceDark,
  },
  selected: {
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  text: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: COLORS.onSurfaceDark,
  },
});

export default CategoryOptionComponent;
