import { StyleSheet } from 'react-native';
import COLORS from '../../styles/colors';
import REM from '../../styles/size';

const authStyles = StyleSheet.create({
  formContainer: {
    width: '80%',
    maxWidth: 400,
    marginInline: 'auto',
    marginBlock: REM * 2,
    paddingBlock: REM * 2,
    paddingInline: REM,
    borderRadius: REM * 0.5,
    backgroundColor: COLORS.surfaceLight,
    boxShadow: `0 1px 2px 0 rgba(${COLORS.accentLight}, 1)`,
  },
  input: {},
  form: {
    gap: REM,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: REM * 0.5,
  },
  action: {
    color: COLORS.primaryColor,
  },
});

export default authStyles;
