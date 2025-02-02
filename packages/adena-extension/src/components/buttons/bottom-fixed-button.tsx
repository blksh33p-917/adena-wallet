import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button, { ButtonHierarchy } from './button';
import Text from '@components/text';

interface BottomFixedButtonProps {
  hierarchy?: ButtonHierarchy;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
  text?: string;
}

const BottomFixedButton = ({
  hierarchy = ButtonHierarchy.Dark,
  onClick,
  text = 'Close',
}: BottomFixedButtonProps) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <ButtonWrap>
      <Button fullWidth hierarchy={hierarchy} onClick={onClick ? onClick : goBack}>
        <Text type='body1Bold'>{text}</Text>
      </Button>
    </ButtonWrap>
  );
};

const ButtonWrap = styled.div`
  ${({ theme }) => theme.mixins.flexbox('row', 'center', 'center')};
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 96px;
  padding: 0px 20px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.4);
  background-color: ${({ theme }) => theme.color.neutral[7]};
  z-index: 1;
`;

export default BottomFixedButton;
