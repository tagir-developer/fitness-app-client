import { ReactNode, useRef, useState } from 'react';
import { Dimensions, ImageSourcePropType, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import { MarginPaddingProps, TypeArticleSection } from '../../common/types';
import { AppFlex } from '../ui/AppFlex';
import { AppText } from './AppText';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

type Props = MarginPaddingProps & {
  content: TypeArticleSection[];
  images?: ImageSourcePropType[];
  children?: ReactNode;
};

const StyledCardView = styled.View`
  width: ${() => `${ITEM_WIDTH}px`};
  height: 220px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  border-radius: 15px;
  border-color: #ffffff;
  border-width: 4px;

  overflow: hidden;
`;

const StyledImage = styled.Image`
  width: ${() => `${ITEM_WIDTH}px`};
  height: 220;
`;

export const Article: React.FC<Props> = ({
  content,
  images,
  children,
  ...props
}: Props) => {
  const isCarousel = useRef<any>();
  const [index, setIndex] = useState(0);

  const CarouselCardItem = ({ item, index: i }) => {
    return (
      <StyledCardView key={i}>
        <StyledImage source={item} />
      </StyledCardView>
    );
  };

  return (
    <AppFlex flex='1' align='stretch' justify='flex-start'>
      <ScrollView>
        <AppFlex h='150px' />

        {images && (
          <>
            <Carousel
              layout='default'
              layoutCardOffset={0}
              ref={isCarousel}
              data={images}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              useScrollView={true}
              onSnapToItem={(i) => setIndex(i)}
            />

            {images.length > 1 && (
              <Pagination
                dotsLength={images.length}
                activeDotIndex={index}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: '#e6e6e6ea',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                carouselRef={isCarousel.current}
              />
            )}
          </>
        )}

        {content.map((section) => {
          return (
            <>
              {section.title && (
                <AppText
                  size='29px'
                  lineHeight='30px'
                  fontWeight='medium'
                  color='#0085FF'
                  mb='20px'
                  mt='20px'
                  pHorizontal='20px'
                >
                  {section.title}
                </AppText>
              )}

              {section.subTitle && (
                <AppText
                  size='24px'
                  lineHeight='30px'
                  fontWeight='medium'
                  color='#ffffff'
                  mb='20px'
                  mt='20px'
                  pHorizontal='20px'
                >
                  {section.subTitle}
                </AppText>
              )}

              {section.text && (
                <AppText
                  size='17px'
                  color='#ffffff'
                  mb='20px'
                  pHorizontal='20px'
                >
                  {section.text}
                </AppText>
              )}
            </>
          );
        })}

        {children}
      </ScrollView>
    </AppFlex>
  );
};
