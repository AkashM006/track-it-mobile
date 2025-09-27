import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Plus } from 'lucide-react-native';
import COLORS from '../../styles/colors';
import REM from '../../styles/size';

type FloatingAddButtonProps = {
  onOpenExpenseForm: () => void;
};

const FloatingAddButtonComponent = ({
  onOpenExpenseForm,
}: FloatingAddButtonProps) => {
  return (
    <TouchableOpacity onPress={onOpenExpenseForm} style={styles.container}>
      <Plus color={COLORS.onPrimary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: REM,
    right: REM,
    backgroundColor: COLORS.primaryColor,
    borderRadius: REM,
    padding: REM,
  },
});

export default FloatingAddButtonComponent;
