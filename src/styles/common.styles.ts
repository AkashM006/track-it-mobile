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
    paddingInline: 0.5 * REM,
  },
  datePickerInput: {
    borderRadius: REM * 0.5,
    borderWidth: 1,
    borderColor: `rgba(${COLORS.gray}, 0.4)`,
    paddingBlock: 0.5 * REM,
    paddingInline: 0.5 * REM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    fontSize: REM * 0.75,
    color: COLORS.errorAccent,
  },
});

const baseButton = StyleSheet.create({
  btn: {
    padding: REM * 0.5,
    borderRadius: REM,
  },
  text: {
    textAlign: 'center',
    color: COLORS.accent,
  },
});

const buttonStyles = StyleSheet.create({
  primary: {
    ...baseButton.btn,
    backgroundColor: COLORS.primaryColor,
  },
  primaryText: {
    ...baseButton.text,
    color: COLORS.onPrimary,
  },
  disabled: {
    opacity: 0.4,
  },
  secondary: {
    ...baseButton.btn,
    backgroundColor: COLORS.surfaceLight,
  },
  secondaryText: {
    ...baseButton.text,
  },
  tertiary: {
    ...baseButton.btn,
    backgroundColor: COLORS.surfaceDark,
  },
  tertiaryText: {
    ...baseButton.text,
  },
});

const commonStyles = { formStyles, buttonStyles };

export default commonStyles;
