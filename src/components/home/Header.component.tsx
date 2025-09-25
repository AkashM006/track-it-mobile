import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import COLORS from '../../styles/colors';
import homeStyles from './home.styles';
import REM from '../../styles/size';
import { LogOut, TrendingUp, Wallet } from 'lucide-react-native';
import { useUserDetails } from '../../context/user.context';
import useMutation from '../../hooks/api/useMutation';
import AuthService from '../../services/auth.service';
import PersistUtils from '../../utils/persist.utils';

const HeaderComponent = () => {
  const {
    state: { user, sessionId },
    logout,
  } = useUserDetails();

  const onLogoutSuccess = async () => {
    logout();
    await PersistUtils.resetSessionId();
  };

  const onLogoutError = (error: string) => {
    Alert.alert('Whoops!', error);
  };

  const logoutMutation = useMutation(AuthService.logout, {
    onSuccess: onLogoutSuccess,
    onError: onLogoutError,
  });

  const onLogout = async () => {
    logoutMutation.mutate(sessionId);
  };

  return (
    <View style={{ ...styles.container, ...homeStyles.container }}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <Wallet size={REM * 2} color={COLORS.onPrimary} />
          </View>
          <View>
            <Text style={{ ...styles.title, ...styles.text }}>TrackIt</Text>
            <Text style={styles.text}>Welcome, {user!.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.iconContainer}>
          <LogOut color={COLORS.onPrimary} size={1.5 * REM} />
        </TouchableOpacity>
      </View>
      <View style={styles.expensesDetailContainer}>
        <Text style={{ ...styles.text, ...styles.expensesTitle }}>
          Total Expenses
        </Text>
        <Text style={{ ...styles.text, ...styles.amount }}>{'\u20B9'} 500</Text>
        <View style={styles.transactionsCountContainer}>
          <TrendingUp color={COLORS.onPrimary} />
          <Text style={styles.text}>2 Transactions</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    paddingBlock: 2 * REM,
    borderEndEndRadius: 0.5 * REM,
    borderStartEndRadius: 0.5 * REM,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 0.5 * REM,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 0.5 * REM,
  },
  iconContainer: {
    borderRadius: 0.5 * REM,
    backgroundColor: COLORS.onPrimaryContainer,
    padding: 0.5 * REM,
    width: 'auto',
  },
  title: {
    fontSize: 1.25 * REM,
    fontWeight: 'bold',
  },
  text: {
    color: COLORS.onPrimary,
  },
  expensesDetailContainer: {
    marginTop: REM,
    gap: 0.25 * REM,
  },
  expensesTitle: {
    fontSize: REM,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 1.5 * REM,
  },
  transactionsCountContainer: {
    flexDirection: 'row',
    gap: 0.5 * REM,
  },
});

export default HeaderComponent;
