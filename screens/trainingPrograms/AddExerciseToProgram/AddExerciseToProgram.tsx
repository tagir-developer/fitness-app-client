import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import CheckIcon from '../../../common/icons/checkIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { InfoCard } from '../../../components/cards/InfoCard';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import { EmptyList } from '../../../components/ui/EmptyList';
import MainLayout from '../../../components/ui/MainLayout';
import { useProgramContext } from '../../../context/trainingProgram/programContext';
import { TypeExercise } from '../../../context/trainingProgram/types';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeAddExerciseToProgram, TypeExercises } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function AddExerciseToProgram({
  route,
  navigation,
}: TypeAddExerciseToProgram) {
  const { dayName } = route.params;

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  const { activeDay, changeExercisesOrder, deleteExercise, trainingProgram } =
    useProgramContext();

  const saveProgram = (): void => {
    setIsSaveModalOpen(false);

    // ! Здесь будет запрос на сохранение программы в базе
    console.log('Сохранить программу и выйти');
    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const exercises = useMemo(
    () =>
      trainingProgram.days.find((day) => day.id === activeDay?.id)?.exercises ??
      [],
    [trainingProgram]
  );

  console.log('EXERCISES', exercises);

  if (!activeDay) return <Text>День не найден</Text>;

  const renderItem = ({ item, drag }: RenderItemParams<TypeExercise>) => {
    return (
      <ScaleDecorator>
        <InfoCard
          onLongPress={drag}
          title={item.name}
          description={item.muscleGroups.join(', ')}
          onPress={() => console.log('Нажали на карточку', item.id)}
          deleteHandler={() => deleteExercise(activeDay.id, item.id)}
          infoPressHandler={() => console.log('Нажали инфо', item.id)}
        />
      </ScaleDecorator>
    );
  };

  console.log('ACTIVE DAY', activeDay.exercises);

  return (
    <MainLayout loading={loading}>
      <AppHeader
        title={dayName}
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<CheckIcon />}
        onPressRightButton={() => {
          console.log('Сохранить и выйти');
        }}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Добавить упражнение'
          onPress={() =>
            navigation.navigate(PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM)
          }
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' align='stretch' justify='flex-start'>
        <DraggableFlatList
          data={exercises}
          onDragEnd={({ data }) => changeExercisesOrder(activeDay.id, data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={
            <EmptyList message='Нет упражнений. Добавьте первое упражнение.' />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        title='Сохранение'
        onPressOk={saveProgram}
        onPressCancel={() => setIsSaveModalOpen(false)}
        message='Сохранить программу тренировок?'
      />
    </MainLayout>
  );
}
