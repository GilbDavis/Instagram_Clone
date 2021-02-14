import React from 'react';
import {
  ExploreContainer,
  ExploreSection,
  PostsWrapper
} from './styles';

const ExplorePosts = ({ explorePosts }) => {

  console.log("Explore Posts: ", explorePosts);

  return (
    <ExploreContainer>
      <ExploreSection>
        <PostsWrapper>
          {explorePosts.length > 0 ? 'asdfasdf' : null}
        </PostsWrapper>
      </ExploreSection>
    </ExploreContainer>
  );
};

export default ExplorePosts;