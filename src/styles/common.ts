import { StyleSheet } from 'react-native';
import REM from './size';
import COLORS from './colors';

const formStyles = StyleSheet.create({
  formGroup: {
    gap: REM * 0.5,
  },
  label: {},
  input: {
    borderRadius: REM * 0.5,
    borderWidth: 1,
    borderColor: `rgba(${COLORS.gray}, 0.4)`,
  },
});

const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primaryColor,
    padding: REM * 0.5,
    borderRadius: REM,
  },
  primaryText: {
    color: COLORS.onPrimary,
    textAlign: 'center',
  },
});

const commonStyles = { formStyles, buttonStyles };

export default commonStyles;
