import { TextInputProps } from 'react-native';
import styled, { DefaultTheme, css } from 'styled-components/native';
import { CssSize, MarginProps } from '../../common/types';

type Props = TextInputProps &
  MarginProps & {
    width?: CssSize;
    color?: string;
    error?: boolean;
    isPassword?: boolean;
  };

type TypeTextInputProps = Props & {
  theme: DefaultTheme;
};

const StyledTextInput = styled.TextInput.attrs((props: Props) => ({
  secureTextEntry: props.isPassword ? true : false,
  autoCorrect: props.autoCorrect ?? false,
  autoCapitalize: props.autoCapitalize ?? 'none',
}))<TypeTextInputProps>`
  width: ${(props) => props.width ?? '80%'};
  height: 50px;

  border-radius: 10px;
  background: #7686a96f;

  font-weight: 400;
  font-size: 20px;
  color: ${(props) => props.color ?? 'white'};

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? props.theme.marginBottom};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};

  padding: 0 20px;

  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${(props) => props.theme.colors.danger ?? 'red'};
    `}
`;

export const AppTextInput: React.FC<Props> = (props) => (
  <StyledTextInput {...props} />
);
