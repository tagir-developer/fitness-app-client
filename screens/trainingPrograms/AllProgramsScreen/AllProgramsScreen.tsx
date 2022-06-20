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
import { TypeHomeScreenProps, TypeTrainingProgram } from './types';
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

  const initialPrograms: TypeTrainingProgram[] = [
    {
      id: '01',
      title: 'Моя программа',
      isUserProgram: true,
      imgUrl: '../../../assets/images/ui/card-icons/programs/userProgram.jpg',
      img: require('../../../assets/images/ui/card-icons/programs/userProgram.jpg'),
    },
    {
      id: '102',
      title: 'Еще одна программа',
      isUserProgram: true,
      imgUrl: '../../../assets/images/ui/card-icons/programs/userProgram.jpg',
      img: require('../../../assets/images/ui/card-icons/programs/userProgram.jpg'),
    },
    {
      id: '1',
      title: 'Базовая программа',
      isUserProgram: false,
      imgUrl: '../../../assets/images/ui/card-icons/programs/basic.jpg',
      img: require('../../../assets/images/ui/card-icons/programs/basic.jpg'),
    },
    {
      id: '2',
      title: 'Мощные ноги',
      isUserProgram: false,
      imgUrl: '../../../assets/images/ui/card-icons/programs/basic.jpg',
      img: require('../../../assets/images/ui/card-icons/programs/basic.jpg'),
    },
    {
      id: '3',
      title: 'Рельефный пресс',
      isUserProgram: false,
      imgUrl: '../../../assets/images/ui/card-icons/programs/basic.jpg',
      img: require('../../../assets/images/ui/card-icons/programs/basic.jpg'),
    },
    {
      id: '4',
      title: 'Крепкие руки',
      isUserProgram: false,
      imgUrl: '../../../assets/images/ui/card-icons/programs/basic.jpg',
      img: require('../../../assets/images/ui/card-icons/programs/basic.jpg'),
    },
  ];

  const [programs, setPrograms] =
    useState<TypeTrainingProgram[]>(initialPrograms);

  return (
    <MainLayout loading={loading}>
      <AppHeader
        title='Программы тренировок'
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<GearIcon />}
        onPressRightButton={
          () =>
            // ! Временно переходим по новым экранам отсюда
            navigation.navigate(PageTypes.CREATE_PROGRAM, { programName })
          // navigation.navigate(PageTypes.ADD_EXERCISE_TO_PROGRAM, {
          //   dayName: 'День 1',
          // })
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
              imgSource={item.img}
              onPress={
                item.isUserProgram
                  ? () =>
                      navigation.navigate(PageTypes.EDIT_PROGRAM, {
                        programId: item.id,
                      })
                  : () =>
                      console.log(
                        'Открыть информацию о дефолтной программе',
                        item.id
                      )
              }
              deleteHandler={
                item.isUserProgram
                  ? () => console.log('Удалить карточку', item.id)
                  : undefined
              }
              copyHandler={
                item.isUserProgram
                  ? () => console.log('Скопировать карточку', item.id)
                  : undefined
              }
              editHandler={
                item.isUserProgram
                  ? () => console.log('Редактировать карточку', item.id)
                  : undefined
              }
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          alwaysBounceVertical={false}
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
