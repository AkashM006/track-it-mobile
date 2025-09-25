import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import homeStyles from './home.styles';
import REM from '../../styles/size';
import COLORS from '../../styles/colors';
import { Check } from 'lucide-react-native';

type FilterOptionsSheetProps = {
  ref: React.RefObject<TrueSheet | null>;
  onSelectCategory: (text: string) => void;
  selectedCategory: string;
};

type FilterOptionProps = {
  text: string;
  selected: boolean;
  onSelect: (text: string) => void;
};

const FilterOption = ({ text, onSelect, selected }: FilterOptionProps) => {
  return (
    <TouchableOpacity onPress={() => onSelect(text)} style={styles.option}>
      <Text style={styles.optionText}>{text}</Text>
      {selected && <Check color={COLORS.primaryColor} />}
    </TouchableOpacity>
  );
};

const FilterOptionsSheet = ({
  ref,
  onSelectCategory,
  selectedCategory,
}: FilterOptionsSheetProps) => {
  const onOptionSelect = (text: string) => {
    console.log({ text });
    onSelectCategory(text);
  };

  const options = ['all', 'food', 'travel', 'others'];

  return (
    <TrueSheet style={styles.trueSheet} ref={ref}>
      <View style={{ ...homeStyles.container, ...styles.sheetContainer }}>
        <Text style={styles.categoryTitle}>Select a Category</Text>
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <FilterOption
              onSelect={onOptionSelect}
              selected={option === selectedCategory}
              text={option}
              key={option}
            />
          ))}
        </View>
      </View>
    </TrueSheet>
  );
};

const styles = StyleSheet.create({
  trueSheet: {
    backgroundColor: COLORS.surface,
  },
  sheetContainer: {
    paddingBlock: REM,
  },
  categoryTitle: {
    fontSize: 1.5 * REM,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 0.5 * REM,
    gap: REM,
  },
  option: {
    padding: REM,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 0.5 * REM,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: REM,
    textTransform: 'capitalize',
  },
});

export default FilterOptionsSheet;
