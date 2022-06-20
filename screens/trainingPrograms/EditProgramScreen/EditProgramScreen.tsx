import { useState } from 'react';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import CheckIcon from '../../../common/icons/checkIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppStyledTextInput } from '../../../components/formControls/AppStyledTextInput';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { YesNoModal } from '../../../components/modals/YesNoModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import { EmptyList } from '../../../components/ui/EmptyList';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeCreateProgramScreenProps, TypeTrainingProgram } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function EditProgramScreen({
  route,
  navigation,
}: TypeCreateProgramScreenProps) {
  const { programId } = route.params;

  const [dayName, setDayName] = useState('');

  const [isAddDayModalOpen, setIsAddDayModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  const addDay = (): void => {
    setIsAddDayModalOpen(false);
    setDayName('');
  };

  const cancelAddDay = (): void => {
    setIsAddDayModalOpen(false);
    setDayName('');
  };

  const saveProgram = (): void => {
    setIsSaveModalOpen(false);
    setIsExitModalOpen(false);

    // ! Здесь будет запрос на сохранение программы в базе
    console.log('Сохранить программу и выйти');
    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const saveProgramHandler = (): void => {
    // ! проверяем, была ли изменена программа, если нет, то просто выходим, если да, то открываем конфирм
    const isProgramChanged = true;

    if (isProgramChanged) {
      return setIsSaveModalOpen(true);
    }

    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const exitHandler = (): void => {
    // ! проверяем, была ли изменена программа, если нет, то просто выходим, если да, то открываем конфирм
    const isProgramChanged = true;

    if (isProgramChanged) {
      return setIsExitModalOpen(true);
    }

    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const initialPrograms: TypeTrainingProgram[] = [
    {
      id: '1',
      title: 'День 1',
      muscleGroups: [
        { id: '1', name: 'Бицепс' },
        { id: '2', name: 'Трицепс' },
      ],
    },
    {
      id: '2',
      title: 'День 2',
      muscleGroups: [
        { id: '1', name: 'Ноги' },
        { id: '2', name: 'Грудь' },
        { id: '2', name: 'Плечи' },
      ],
    },
    {
      id: '3',
      title: 'День 3',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
  ];

  const [programs, setPrograms] =
    useState<TypeTrainingProgram[]>(initialPrograms);

  const renderItem = ({
    item,
    drag,
  }: RenderItemParams<TypeTrainingProgram>) => {
    return (
      <ScaleDecorator>
        <SimpleCard
          onLongPress={drag}
          title={item.title}
          description={item.muscleGroups.map((i) => i.name).join(', ')}
          onPress={() => console.log('Нажали на карточку', item.id)}
          deleteHandler={() => console.log('Удалить карточку', item.id)}
          copyHandler={() => console.log('Скопировать карточку', item.id)}
          editHandler={() => console.log('Редактировать карточку', item.id)}
        />
      </ScaleDecorator>
    );
  };

  return (
    <MainLayout loading={loading}>
      <AppHeader
        // title={programName}
        title={'Название программы'}
        onPressLeftButton={exitHandler}
        rightButtonIcon={<CheckIcon />}
        onPressRightButton={saveProgramHandler}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Добавить новый день'
          onPress={() => setIsAddDayModalOpen(true)}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' align='stretch' justify='flex-start'>
        <DraggableFlatList
          data={programs}
          onDragEnd={({ data }) => setPrograms(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={
            <EmptyList message='Нет тренировочных дней. Добавьте первый день.' />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />

      <ConfirmModal
        isOpen={isAddDayModalOpen}
        title='Новый день'
        onPressOk={addDay}
        onPressCancel={cancelAddDay}
        message='Введите название дня'
      >
        <AppStyledTextInput
          value={dayName}
          onChangeText={(value) => setDayName(value)}
          placeholder='Название дня'
          mt='10px'
        />
      </ConfirmModal>

      <ConfirmModal
        isOpen={isSaveModalOpen}
        title='Сохранение'
        onPressOk={saveProgram}
        onPressCancel={() => setIsSaveModalOpen(false)}
        message='Сохранить программу тренировок?'
      />

      <YesNoModal
        isOpen={isExitModalOpen}
        title='Выход'
        message='Сохранить программу тренировок перед тем как выйти?'
        onPressYes={saveProgram}
        onPressNo={() => navigation.navigate(PageTypes.ALL_PROGRAMS)}
        onPressCancel={() => setIsExitModalOpen(false)}
      />
    </MainLayout>
  );
}
