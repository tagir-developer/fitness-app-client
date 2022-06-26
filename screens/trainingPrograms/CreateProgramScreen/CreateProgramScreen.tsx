import { useEffect, useState } from 'react';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { cutLongString } from '../../../common/helpers/cutLongString';
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
import { useProgramContext } from '../../../context/trainingProgram/programContext';
import { TypeTrainingDay } from '../../../context/trainingProgram/types';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeCreateProgramScreenProps } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function CreateProgramScreen({
  route,
  navigation,
}: TypeCreateProgramScreenProps) {
  const { programName } = route.params;

  const {
    trainingProgram,
    setNewProgramData,
    changeDaysOrder,
    deleteDay,
    copyDay,
    renameDay,
    setActiveDay,
    addTrainingDay,
  } = useProgramContext();

  const [dayName, setDayName] = useState('');

  const [isAddDayModalOpen, setIsAddDayModalOpen] = useState(false);
  const [isChangeDayNameModalOpen, setIsChangeDayNameModalOpen] =
    useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [activeDayId, setActiveDayId] = useState('');

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  const addDay = (): void => {
    if (!dayName.length) {
      // ! Добавить уведомление что поле не может быть пустым
      return console.log('7777777777');
    }
    addTrainingDay(dayName);
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

  const cardPressHandler = (id: string, name: string): void => {
    setActiveDay(id);
    navigation.navigate(PageTypes.ADD_EXERCISE_TO_PROGRAM, {
      dayName: name,
    });
  };

  const openChangeProgramNameModal = (dayId: string): void => {
    setActiveDayId(dayId);
    setIsChangeDayNameModalOpen(true);
  };

  const changeDayName = (): void => {
    renameDay(activeDayId, dayName);
    setIsChangeDayNameModalOpen(false);
    setDayName('');
  };

  const createMuscleGroupsDescription = (day: TypeTrainingDay): string => {
    const muscleGroups: string[] = [];

    for (const exercise of day.exercises) {
      for (const muscleGroup of exercise.muscleGroups) {
        if (!muscleGroups.includes(muscleGroup)) {
          muscleGroups.push(muscleGroup);
        }
      }
    }

    return cutLongString(muscleGroups.join(', '), 40);
  };

  useEffect(() => {
    setNewProgramData(programName);
  }, []);

  // console.log('PROGRAM', trainingProgram);

  const renderItem = ({
    item: day,
    drag,
  }: RenderItemParams<TypeTrainingDay>) => {
    return (
      <ScaleDecorator>
        <SimpleCard
          onLongPress={drag}
          title={day.name}
          // description={day.muscleGroups.join(', ')}
          description={createMuscleGroupsDescription(day)}
          onPress={() => cardPressHandler(day.id, day.name)}
          deleteHandler={() => deleteDay(day.id)}
          copyHandler={() => copyDay(day.id)}
          editHandler={() => openChangeProgramNameModal(day.id)}
        />
      </ScaleDecorator>
    );
  };

  return (
    <MainLayout loading={loading}>
      <AppHeader
        title={programName}
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
          data={trainingProgram.days}
          onDragEnd={({ data }) => changeDaysOrder(data)}
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
        title='Добавить новый день'
        onPressOk={addDay}
        onPressCancel={cancelAddDay}
        message='Введите название дня'
      >
        <AppStyledTextInput
          value={dayName}
          onChangeText={setDayName}
          placeholder='Название дня'
          mt='10px'
        />
      </ConfirmModal>

      <ConfirmModal
        isOpen={isChangeDayNameModalOpen}
        title='Изменить название дня'
        onPressOk={changeDayName}
        onPressCancel={() => setIsChangeDayNameModalOpen(false)}
        message='Введите название дня'
      >
        <AppStyledTextInput
          value={dayName}
          onChangeText={setDayName}
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
