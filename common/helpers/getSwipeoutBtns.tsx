import { SwipeoutButtonProperties } from 'react-native-swipeout';
import { AppFlex } from '../../components/ui/AppFlex';
import CopyCardIcon from '../icons/CopyCardIcon';
import DeleteCardIcon from '../icons/DeleteCardIcon';
import EditCardIcon from '../icons/EditCardIcon';

export const getRightSwipeoutButtons = (
  copyHandler: (() => void) | undefined,
  deleteHandler: (() => void) | undefined
): SwipeoutButtonProperties[] => {
  const buttons: SwipeoutButtonProperties[] = [];

  if (copyHandler) {
    buttons.push({
      backgroundColor: '#545454',
      underlayColor: '#464646',
      component: (
        <AppFlex flex='1'>
          <CopyCardIcon />
        </AppFlex>
      ),
      onPress: copyHandler,
    });
  }

  if (deleteHandler) {
    buttons.push({
      backgroundColor: '#DA0E0E',
      underlayColor: '#8d2525',
      component: (
        <AppFlex flex='1'>
          <DeleteCardIcon />
        </AppFlex>
      ),
      onPress: deleteHandler,
    });
  }

  return buttons;
};

export const getLeftSwipeoutButtons = (
  editHandler: (() => void) | undefined
): SwipeoutButtonProperties[] => {
  const buttons: SwipeoutButtonProperties[] = [];

  if (editHandler) {
    buttons.push({
      backgroundColor: '#2A5C96',
      underlayColor: '#245184',
      component: (
        <AppFlex flex='1'>
          <EditCardIcon />
        </AppFlex>
      ),
      onPress: editHandler,
    });
  }

  return buttons;
};
