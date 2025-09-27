import { RefObject, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../styles/colors';
import REM from '../../styles/size';
import { Calendar, X } from 'lucide-react-native';
import commonStyles from '../../styles/common.styles';
import useFormState from '../../hooks/form/useFormState';
import CustomModalComponent, {
  CustomModalRef,
} from '../common/CustomModal.component';
import DatePickerComponent from '../common/DatePicker.component';
import { DateType } from 'react-native-ui-datepicker';
import DateUtils from '../../utils/date.utils';
import CategoryOptionComponent from '../common/CategoryOption.component';

type ExpenseFormProps = {
  ref: RefObject<CustomModalRef | null>;
};

type ExpenseForm = {
  name: string;
  date: DateType;
  amount: string;
  category: string;
};

const CATEGORIES = ['food', 'travel', 'shopping', 'bills', 'others'];

const initForm: ExpenseForm = {
  name: '',
  date: DateUtils.dateToString(new Date()),
  amount: '',
  category: CATEGORIES[0],
};

const ExpenseFormComponent = ({ ref }: ExpenseFormProps) => {
  const { formState, onChange, resetFormState } =
    useFormState<ExpenseForm>(initForm);

  const datePickerModalRef = useRef<CustomModalRef>(null);

  const onClose = () => {
    resetFormState();
    ref.current?.close();
  };

  const onOpenDatePicker = () => {
    datePickerModalRef.current?.open();
  };

  const onSubmit = () => {};

  return (
    <CustomModalComponent dismissible={false} ref={ref}>
      <ScrollView>
        <X onPress={onClose} style={styles.closeIcon} />
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={commonStyles.formStyles.formGroup}>
            <Text style={commonStyles.formStyles.label}>Expense Name:</Text>
            <TextInput
              value={formState.name.value}
              onChangeText={value => onChange('name', value)}
              placeholder="Coffee, lunch, gas..."
              style={commonStyles.formStyles.input}
            />
            {formState.name.error ? (
              <Text style={commonStyles.formStyles.errorText}>
                {formState.name.error}
              </Text>
            ) : null}
          </View>
          {/* Date Field */}
          <View style={commonStyles.formStyles.formGroup}>
            <Text style={commonStyles.formStyles.label}>Date:</Text>
            <DatePickerComponent
              onChange={value => onChange('date', value)}
              selectedDate={formState.date.value}
              ref={datePickerModalRef}
            />
            <Pressable
              onPress={onOpenDatePicker}
              style={commonStyles.formStyles.datePickerInput}
            >
              <Text>{DateUtils.formatDate(formState.date.value)}</Text>
              <Calendar color={COLORS.gray} />
            </Pressable>
            {formState.name.error ? (
              <Text style={commonStyles.formStyles.errorText}>
                {formState.name.error}
              </Text>
            ) : null}
          </View>
          {/* Amount Field */}
          <View style={commonStyles.formStyles.formGroup}>
            <Text style={commonStyles.formStyles.label}>Amount:</Text>
            <TextInput
              value={formState.amount.value}
              onChangeText={value => {
                if (value !== '' && isNaN(+value)) return;
                onChange('amount', value);
              }}
              placeholder="100.00"
              keyboardType="decimal-pad"
              style={commonStyles.formStyles.input}
            />
            {formState.amount.error ? (
              <Text style={commonStyles.formStyles.errorText}>
                {formState.amount.error}
              </Text>
            ) : null}
          </View>
          {/* Category Field */}
          <View style={commonStyles.formStyles.formGroup}>
            <Text style={commonStyles.formStyles.label}>Category:</Text>
            <View style={styles.optionsContainer}>
              {CATEGORIES.map(category => (
                <CategoryOptionComponent
                  key={category}
                  categoryName={category}
                  onPress={value => onChange('category', value)}
                  selected={formState.category.value === category}
                />
              ))}
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={{
                ...commonStyles.buttonStyles.tertiary,
                ...styles.action,
              }}
              onPress={onClose}
            >
              <Text style={commonStyles.buttonStyles.tertiaryText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...commonStyles.buttonStyles.primary, ...styles.action }}
              onPress={onSubmit}
            >
              <Text style={commonStyles.buttonStyles.primaryText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </CustomModalComponent>
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
    width: '95%',
    minWidth: 20 * REM,
    maxWidth: 25 * REM,
    marginInline: 'auto',
    borderRadius: REM,
    padding: REM,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
  formContainer: {
    marginTop: REM,
    gap: REM,
  },
  optionsContainer: {
    gap: REM,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: REM,
  },
  action: {
    flex: 1,
  },
});

export default ExpenseFormComponent;
