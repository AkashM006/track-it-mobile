import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomModalComponent, { CustomModalRef } from './CustomModal.component';
import { RefObject } from 'react';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import REM from '../../styles/size';
import { Check } from 'lucide-react-native';
import COLORS from '../../styles/colors';
import DateUtils from '../../utils/date.utils';

type DatePickerProps = {
  ref: RefObject<CustomModalRef | null>;
  selectedDate: string;
  onChange: (newDate: string) => void;
};

const DatePickerComponent = ({
  ref,
  selectedDate,
  onChange,
}: DatePickerProps) => {
  const datePickerStyles = useDefaultStyles();

  return (
    <CustomModalComponent ref={ref}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Select Date</Text>
          <TouchableOpacity onPress={() => ref.current?.close()}>
            <Check color={COLORS.primaryColor} />
          </TouchableOpacity>
        </View>
        <DateTimePicker
          styles={datePickerStyles}
          date={new Date(selectedDate)}
          mode="single"
          onChange={({ date }) => {
            if (!date) return;
            const stringDate = date.toString();
            const dateObj = new Date(stringDate);
            const result = DateUtils.dateToString(dateObj);
            onChange(result);
          }}
          timeZone="UTC"
        />
      </View>
    </CustomModalComponent>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 1.25 * REM,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: REM,
    marginInline: 'auto',
  },
});

export default DatePickerComponent;
