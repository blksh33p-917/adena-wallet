import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '@components/text';
import WarningBox from '@components/warning/warning-box';
import SeedBox from '@components/seed-box';
import Button, { ButtonHierarchy } from '@components/buttons/button';
import SeedViewAndCopy from '@components/buttons/seed-view-and-copy';

const seeds = [
  'chimney',
  'anchor',
  'abuse',
  'inhale',
  'wide',
  'virus',
  'filter',
  'heart',
  'kingdom',
  'need',
  'open',
  'dumb',
];

const blurScreenText = 'Make sure no one is watching your screen';

export const RevealPrivatePhrase = () => {
  const [showBlurScreen, setShowBlurScreen] = useState(true);
  const doneButtonClick = () => {
    // TODO
  };

  return (
    <Wrapper>
      <Text type='header4'>Reveal Seed Phrase</Text>
      <WarningBox type='revealPrivate' margin='12px 0px 20px' padding='14px 16px' />
      <SeedBox
        seeds={seeds}
        scroll={false}
        hasBlurScreen={showBlurScreen}
        hasBlurText
        blurScreenText={blurScreenText}
      />
      <SeedViewAndCopy
        showBlurScreen={showBlurScreen}
        setShowBlurScreen={setShowBlurScreen}
        copyStr={seeds.join(' ')}
      />
      <Button fullWidth hierarchy={ButtonHierarchy.Primary} onClick={doneButtonClick}>
        <Text type='body1Bold'>Done</Text>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  ${({ theme }) => theme.mixins.flexbox('column', 'flex-start', 'flex-start')};
  width: 100%;
  height: 100%;
  padding-top: 24px;
  overflow-y: auto;
`;
