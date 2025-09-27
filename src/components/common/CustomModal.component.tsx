import { Modal, StyleSheet, Pressable } from 'react-native';
import React, {
  ReactNode,
  RefObject,
  useImperativeHandle,
  useState,
} from 'react';
import COLORS from '../../styles/colors';
import REM from '../../styles/size';

export type CustomModalRef = {
  open: () => void;
  close: () => void;
};

type CustomModalProps = {
  children: ReactNode;
  ref: RefObject<CustomModalRef | null>;
  dismissible?: boolean;
};

const CustomModalComponent = ({
  children,
  ref,
  dismissible = true,
}: CustomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setIsOpen(true);
        },
        close: onClose,
      };
    },
    [],
  );

  const onOverlayClick = () => {
    if (dismissible) onClose();
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={isOpen}
    >
      <Pressable onPress={onOverlayClick} style={styles.overlayContainer}>
        <Pressable
          onPress={e => e.stopPropagation()}
          style={styles.contentContainer}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: COLORS.backdropBg,
    paddingBlock: 4 * REM,
  },
  contentContainer: {
    backgroundColor: COLORS.surface,
    width: '100%',
    minWidth: 20 * REM,
    maxWidth: 25 * REM,
    marginInline: 'auto',
    borderRadius: REM,
    padding: REM,
  },
});

export default CustomModalComponent;
