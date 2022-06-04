import { useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ImageSourcePropType, Text, View } from 'react-native';
import GearIcon from '../../../common/icons/gearIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { CardWithImage } from '../../../components/cards/CardWithImage';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppStyledTextInput } from '../../../components/formControls/AppStyledTextInput';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useAppContext } from '../../../context/appContext';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { TypeHomeScreenProps } from './types';
// const headerImage = require('../assets/images/ui/header-bg.png');

const LIST_TOP_SPACE = '250px';
const LIST_BOTTOM_SPACE = '150px';

const SCREEN_SOURCES_COUNT = 2;

export default function AllProgramsScreen({ navigation }: TypeHomeScreenProps) {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const [activeProgramId, setActiveProgramId] = useState<string | null>('1');
  const [programName, setProgramName] = useState('');

  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

  const loading = useGetSourcesLoadingState(SCREEN_SOURCES_COUNT);

  const addProgram = (): void => {
    console.log('Новая программа - ', programName);
    setIsAddProgramModalOpen(false);
    setProgramName('');
  };

  const cancelAddProgram = (): void => {
    setIsAddProgramModalOpen(false);
    setProgramName('');
  };

  // if (loading) return <StyledText>Loading...</StyledText>;

  const programs = [
    { id: '1', title: 'Базовая программа' },
    { id: '2', title: 'Мощные ноги' },
    { id: '3', title: 'Чудовищный пресс' },
    { id: '4', title: 'Чудовищный пресс' },
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
        onPressRightButton={() => {}}
        // headerImage={headerImage}
      />

      <OpacityDarkness top='0px' h={LIST_TOP_SPACE} reverse={true}>
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
            <View style={{ width: '100%', height: parseInt(LIST_TOP_SPACE) }} />
          }
          ListFooterComponent={
            <View
              style={{ width: '100%', height: parseInt(LIST_BOTTOM_SPACE) }}
            />
          }
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={LIST_BOTTOM_SPACE} />

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
