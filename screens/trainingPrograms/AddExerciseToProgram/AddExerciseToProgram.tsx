import { useMutation } from '@apollo/client';
import isEqual from 'lodash.isequal';
import { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
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
import {
  TypeExercise,
  TypeTrainingProgram,
} from '../../../context/trainingProgram/types';
import {
  CREATE_PROGRAM,
  UPDATE_PROGRAM,
} from '../../../graphql/programs/programMutations';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import {
  PageTypes,
  TypeCreateExercisePageTypes,
} from '../../../navigation/types';
import { TypeAddExerciseToProgram, TypeExercises } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function AddExerciseToProgram({
  route,
  navigation,
}: TypeAddExerciseToProgram) {
  const { dayName, pageType } = route.params;

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  const [createProgram] = useMutation(CREATE_PROGRAM);
  const [updateProgram] = useMutation(UPDATE_PROGRAM);

  const {
    activeDay,
    changeExercisesOrder,
    deleteExercise,
    trainingProgram,
    initialProgramData,
  } = useProgramContext();

  const saveProgram = async (): Promise<void> => {
    setIsSaveModalOpen(false);

    if (pageType === TypeCreateExercisePageTypes.CREATE) {
      // const data: TypeTrainingProgram = { ...trainingProgram };
      try {
        const program = await createProgram({
          variables: {
            program: trainingProgram,
          },
        }).then(({ data: result }) => result.createProgram);

        console.log('СОЗДАННАЯ ПРОГРАММА', program);

        Alert.alert('Программа создана');
      } catch (e) {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка создания программы', errorMessage);
      }
    }

    if (pageType === TypeCreateExercisePageTypes.EDIT) {
      try {
        const program = await updateProgram({
          variables: {
            programId: trainingProgram.id,
            trainingDays: trainingProgram.days,
          },
        }).then(({ data: result }) => result.updateProgram);

        console.log('ОБНОВЛЕННАЯ ПРОГРАММА', program);

        Alert.alert('Программа обновлена');
      } catch (e) {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка обновления программы', errorMessage);
      }
    }

    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const exercises = useMemo(
    () =>
      trainingProgram.days.find((day) => day.id === activeDay?.id)?.exercises ??
      [],
    [trainingProgram]
  );

  const saveProgramHandler = (): void => {
    const isProgramChanged = !isEqual(trainingProgram, initialProgramData);
    if (isProgramChanged) {
      return setIsSaveModalOpen(true);
    }
    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  console.log('EXERCISES', exercises);

  if (!activeDay) return null;

  const renderItem = ({ item, drag }: RenderItemParams<TypeExercise>) => {
    return (
      <ScaleDecorator>
        <InfoCard
          onLongPress={drag}
          title={item.name}
          description={item.muscleGroups}
          onPress={() => console.log('Нажали на карточку', item.id)}
          deleteHandler={() => deleteExercise(activeDay.id, item.id)}
          infoPressHandler={() => console.log('Нажали инфо', item.id)}
        />
      </ScaleDecorator>
    );
  };

  // const headerTitle = useMemo(() => {
  //   if (dayName && pageType === TypeCreateExercisePageTypes.CREATE)
  //     return dayName;

  //   if (pageType === TypeCreateExercisePageTypes.EDIT)
  //     return data.getProgramById.name;

  //   return '';
  // }, []);

  console.log('ACTIVE DAY', activeDay.exercises);

  return (
    <MainLayout loading={sourcesLoading}>
      <AppHeader
        title={dayName}
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<CheckIcon />}
        onPressRightButton={saveProgramHandler}
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
        onPressOk={async () => await saveProgram}
        onPressCancel={() => setIsSaveModalOpen(false)}
        message='Сохранить программу тренировок?'
      />
    </MainLayout>
  );
}
