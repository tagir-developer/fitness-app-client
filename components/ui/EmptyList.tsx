import styled from 'styled-components/native';

type Props = {
  message: string;
};

const StyledView = styled.View`
  width: 100%;
  padding: 30px 40px;
`;

const Message = styled.Text`
  font-family: ${(props) => props.theme.fonts.normal};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #c7c7c7;
  text-align: center;
`;

export const EmptyList: React.FC<Props> = (props) => (
  <StyledView>
    <Message>{props.message}</Message>
  </StyledView>
);
