import { TextInputProps } from 'react-native';
import styled, { DefaultTheme, css } from 'styled-components/native';
import SearchInputIcon from '../../common/icons/SearchInputIcon';
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

const InputContainer = styled.View<Props>`
  position: relative;

  width: ${(props) => props.width ?? '90%'};

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const SearchIconContainer = styled.View<Props>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 100%;
`;

const StyledTextInput = styled.TextInput.attrs((props: Props) => ({
  secureTextEntry: props.isPassword ? true : false,
  autoCorrect: props.autoCorrect ?? false,
  autoCapitalize: props.autoCapitalize ?? 'none',
}))<TypeTextInputProps>`
  width: 100%;
  height: 40px;

  border-radius: 10px;
  background: #5656566d;

  font-weight: 400;
  font-size: 18px;
  color: ${(props) => props.color ?? '#cecece'};

  padding-right: 20px;
  padding-left: 35px;

  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.danger ?? 'red'};
    `}
`;

export const AppSearchInput: React.FC<Props> = (props) => (
  <InputContainer {...props}>
    <SearchIconContainer>
      <SearchInputIcon />
    </SearchIconContainer>
    <StyledTextInput {...props} />
  </InputContainer>
);
