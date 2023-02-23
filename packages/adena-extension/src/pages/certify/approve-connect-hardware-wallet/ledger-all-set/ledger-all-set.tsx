import React from 'react';
import styled from 'styled-components';
import Button, { ButtonHierarchy } from '@components/buttons/button';
import TitleWithDesc from '@components/title-with-desc';
import Text from '@components/text';

const text = {
  title: 'You’re all set!',
  desc: 'Click on the Start button to\nlaunch Adena.',
};

const Wrapper = styled.main`
  ${({ theme }) => theme.mixins.flexbox('column', 'center', 'space-between')};
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

export const ApproveHardwareWalletLedgerAllSet = () => {
  const handleNextButtonClick = () => {
    window.close();
  };

  return (
    <Wrapper>
      <TitleWithDesc title={text.title} desc={text.desc} />
      <Button
        fullWidth
        hierarchy={ButtonHierarchy.Primary}
        onClick={handleNextButtonClick}
        margin='auto 0px 0px'
      >
        <Text type='body1Bold'>Start</Text>
      </Button>
    </Wrapper>
  );
};
