import { LinearGradient } from 'expo-linear-gradient';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import { TextInputProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import { CssSize, MarginProps } from '../../common/types';

const INPUT_WRAPPER_PROPS_LIST = ['mt', 'mb', 'ml', 'mr', 'w', 'h'];

type Props = TextInputProps &
  MarginProps & {
    w?: CssSize;
    h?: CssSize;
    color?: string;
    error?: boolean;
    isSecure?: boolean;
  };

type TypeInputWrapperProps = MarginProps & {
  w?: CssSize;
  h?: CssSize;
};

type TypeStyledTextInputProps = TextInputProps & {
  color?: string;
  error?: boolean;
  isSecure?: boolean;
};

const InputWrapper = styled.View<TypeInputWrapperProps>`
  width: ${(props) => props.w ?? '100%'};
  height: ${(props) => props.h ?? '40px'};

  border-radius: 10px;

  overflow: hidden;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const InnerView = styled.View`
  height: auto;
  overflow: hidden;

  border-radius: 10px;

  margin: 2px;
`;

const StyledTextInput = styled.TextInput.attrs(
  (props: TypeStyledTextInputProps) => ({
    secureTextEntry: props.isSecure ? true : false,
    autoCorrect: props.autoCorrect ?? false,
  })
)<TypeStyledTextInputProps>`
  width: 100%;
  height: 100%;

  background: #ffffffb1;

  font-weight: 400;
  font-size: 20px;
  color: ${(props) => props.color ?? props.theme.colors.primaryText};

  padding: 0 10px;

  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${(props) => props.theme.colors.danger ?? 'red'};
    `}
`;

export const AppStyledTextInput: React.FC<Props> = (props) => {
  const wrapperProps: TypeInputWrapperProps = pick(
    props,
    INPUT_WRAPPER_PROPS_LIST
  );

  const textInputProps: TypeStyledTextInputProps = omit(
    props,
    INPUT_WRAPPER_PROPS_LIST
  );

  return (
    <InputWrapper {...wrapperProps}>
      <LinearGradient colors={['#3C3C3C', '#F8F8F8']}>
        <InnerView>
          <StyledTextInput
            {...textInputProps}
            placeholderTextColor={'#b0b0b0'}
          />
        </InnerView>
      </LinearGradient>
    </InputWrapper>
  );
};
