import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authenticateToken from '../../utils/authenticateToken';
import { getAllExplorePosts } from '../../actions/postsActions/postsActions';

import ExplorePosts from '../../components/UI/explorePosts';
import Header from '../../components/UI/Header/index';
import Modal from '../../components/UI/Modal/index';

const Explore = () => {
  const dispatch = useDispatch();
  const explorePosts = useSelector(state => state.post.explorePosts);

  useEffect(() => {
    authenticateToken();
    dispatch(getAllExplorePosts());
  }, []);

  return (
    <>
      <Header />
      <ExplorePosts
        explorePosts={explorePosts}
      />

      <Modal />
    </>
  );
};

export default Explore;