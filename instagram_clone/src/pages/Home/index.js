import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';

import Posts from '../../components/UI/Posts/index';
import Header from '../../components/UI/Header/index';
import Modal from '../../components/UI/Modal/index';

import authenticateToken from '../../utils/authenticateToken';
import { getAllPosts } from '../../actions/postsActions/postsActions';


const HomePageContainer = styled.div`
  width: 100%;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);

  useEffect(() => {
    authenticateToken();
    dispatch(getAllPosts());
  }, []);

  return (
    <HomePageContainer>
      <Header />
      <Posts
        posts={posts}
      />

      <Modal />
    </HomePageContainer>
  );
};

export default HomePage;