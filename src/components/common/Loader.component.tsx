import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import REM from '../../styles/size';
import { useCommonUI } from '../../context/commonUI.context';
import COLORS from '../../styles/colors';

const Loader = () => {
  const {
    state: { isLoading },
  } = useCommonUI();

  return (
    <Modal
      visible={isLoading}
      animationType="fade"
      statusBarTranslucent={true}
      backdropColor={COLORS.backdropBg}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    backgroundColor: COLORS.surface,
    padding: REM * 0.75,
    borderRadius: REM * 0.5,
  },
});

export default Loader;
