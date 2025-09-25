import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import homeStyles from './home.styles';
import REM from '../../styles/size';
import { ChevronDown } from 'lucide-react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import FilterOptionsSheet from './FilterSheet.component';
import COLORS from '../../styles/colors';

type FilterContainerProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const FilterContainer = ({
  selectedCategory,
  setSelectedCategory,
}: FilterContainerProps) => {
  const onShowCategoryBottomSheet = async () => {
    await sheetRef.current?.present();
  };

  const sheetRef = useRef<TrueSheet>(null);

  const onSelectCategory = async (text: string) => {
    setSelectedCategory(text);
    await sheetRef.current?.dismiss();
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>Filter a category</Text>
      <Pressable onPress={onShowCategoryBottomSheet}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownContainerText}>{selectedCategory}</Text>
          <ChevronDown />
        </View>
      </Pressable>
      <FilterOptionsSheet
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        ref={sheetRef}
      />
    </View>
  );
};

const ListComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <View style={{ ...homeStyles.container, ...styles.container }}>
      <View>
        <Text style={styles.title}>Recent Expenses</Text>
      </View>
      <FilterContainer
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBlock: REM,
  },
  title: {
    fontSize: 1.5 * REM,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginTop: 0.5 * REM,
  },
  filterText: {
    fontSize: 0.75 * REM,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 0.5 * REM,
    paddingBlock: 0.25 * REM,
    paddingInline: 0.5 * REM,
    marginTop: 0.5 * REM,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    maxWidth: 10 * REM,
  },
  dropdownContainerText: {
    textTransform: 'capitalize',
  },
});

export default ListComponent;
