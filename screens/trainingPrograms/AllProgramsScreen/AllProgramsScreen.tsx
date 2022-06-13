import { useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ImageSourcePropType, Text, View } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import GearIcon from '../../../common/icons/gearIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { CardWithImage } from '../../../components/cards/CardWithImage';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppStyledTextInput } from '../../../components/formControls/AppStyledTextInput';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeHomeScreenProps } from './types';
// const headerImage = require('../assets/images/ui/header-bg.png');

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function AllProgramsScreen({ navigation }: TypeHomeScreenProps) {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const [activeProgramId, setActiveProgramId] = useState<string | null>('1');
  const [programName, setProgramName] = useState('');

  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  const addProgram = (): void => {
    console.log('Новая программа - ', programName);
    setIsAddProgramModalOpen(false);
    setProgramName('');

    navigation.navigate(PageTypes.CREATE_PROGRAM, { programName });
  };

  const cancelAddProgram = (): void => {
    setIsAddProgramModalOpen(false);
    setProgramName('');
  };

  // if (loading) return <StyledText>Loading...</StyledText>;

  const programs = [
    { id: '1', title: 'Базовая программа' },
    { id: '2', title: 'Мощные ноги' },
    { id: '3', title: 'Чудовищный пресс и программа тренировок ха-ха' },
    { id: '4', title: 'Очень до жопы длинное название программы' },
    { id: '5', title: 'Чудовищный пресс' },
    { id: '6', title: 'Чудовищный пресс' },
    { id: '7', title: 'Чудовищный пресс' },
    { id: '8', title: 'Чудовищный пресс' },
    { id: '9', title: 'Чудовищный пресс' },
    { id: '10', title: 'Чудовищный пресс' },
    { id: '11', title: 'Чудовищный пресс' },
    { id: '12', title: 'Чудовищный пресс' },
  ];

  return (
    <MainLayout loading={loading}>
      <AppHeader
        title='Программы тренировок'
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<GearIcon />}
        onPressRightButton={() =>
          // ! Временно переходим по новым экранам отсюда
          // navigation.navigate(PageTypes.CREATE_PROGRAM, { programName })
          navigation.navigate(PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM)
        }
        // headerImage={headerImage}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Создать свою программу'
          onPress={() => setIsAddProgramModalOpen(true)}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%' }}
          data={programs}
          renderItem={({ item }) => (
            <CardWithImage
              title={item.title}
              isActive={item.id === activeProgramId}
              onCheckHandler={() => setActiveProgramId(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />

      <ConfirmModal
        isOpen={isAddProgramModalOpen}
        title='Новая программа'
        onPressOk={addProgram}
        onPressCancel={cancelAddProgram}
        message='Введите название программы'
      >
        <AppStyledTextInput
          value={programName}
          onChangeText={(value) => setProgramName(value)}
          placeholder='Название программы'
          mt='10px'
        />
      </ConfirmModal>
    </MainLayout>
  );
}
