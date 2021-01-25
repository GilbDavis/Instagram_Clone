import React from 'react';
import styled from '@emotion/styled';

import Posts from '../../components/UI/Posts/index';
import Header from '../../components/UI/Header/index';
import Modal from '../../components/UI/Modal/index';

const HomePageContainer = styled.div`
  width: 100%;
`;

const HomePage = () => {

  return (
    <HomePageContainer>
      <Header />
      <Posts />

      <Modal />
    </HomePageContainer>
  );
};

export default HomePage;