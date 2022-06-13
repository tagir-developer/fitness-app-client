import { useState } from 'react';
import { FlatList, View } from 'react-native';
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
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { TypeAddExerciseToProgram, TypeExercises } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function AddExerciseToProgram({
  route,
  navigation,
}: TypeAddExerciseToProgram) {
  const { dayName } = route.params;

  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  const exercises: TypeExercises[] = [
    {
      id: '1',
      title: 'Жим лежа',
      muscleGroups: [
        { id: '1', name: 'Бицепс' },
        { id: '2', name: 'Трицепс' },
      ],
    },
    {
      id: '2',
      title: 'Приседания',
      muscleGroups: [
        { id: '1', name: 'Ноги' },
        { id: '2', name: 'Грудь' },
        { id: '2', name: 'Плечи' },
      ],
    },
    {
      id: '3',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
  ];

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
          onPress={() => setIsAddProgramModalOpen(true)}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%' }}
          data={exercises}
          renderItem={({ item }) => (
            <InfoCard
              title={item.title}
              description={item.muscleGroups.map((i) => i.name).join(', ')}
              onPress={() => console.log('Нажали на карточку', item.id)}
              deleteHandler={() => console.log('Удалить карточку', item.id)}
              infoPressHandler={() => console.log('Нажали инфо', item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
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

      {/* <ConfirmModal
        isOpen={isAddProgramModalOpen}
        title='Новый день'
        onPressOk={addProgram}
        onPressCancel={cancelAddProgram}
        message='Введите название дня'
      >
        <AppStyledTextInput
          value={programName}
          onChangeText={(value) => setProgramName(value)}
          placeholder='Название дня'
          mt='10px'
        />
      </ConfirmModal> */}
    </MainLayout>
  );
}
