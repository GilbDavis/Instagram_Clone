import React, { useState } from 'react';
import {
  ExploreContainer,
  ExploreSection,
  ImageContainer,
  PostContainer,
  PostImage,
  PostInfoContainer,
  PostInfoItem,
  PostInfoList,
  PostInfoSpan,
  PostsWrapper,
  SinglePost
} from './styles';
import { AiFillHeart } from 'react-icons/ai';
import { RiMessage3Fill } from 'react-icons/ri';

const ExplorePosts = ({ explorePosts }) => {

  const [isHover, setHover] = useState([]);

  const handleHoverState = (postId) => {
    setHover({
      ...isHover,
      [postId]: !isHover[postId]
    });
  };

  return (
    <ExploreContainer>
      <ExploreSection>
        <PostsWrapper>
          <PostContainer>
            {explorePosts.map(post => (
              <SinglePost key={post.postInfo.id}
                onMouseEnter={() => handleHoverState(post.postInfo.id)}
                onMouseLeave={() => handleHoverState(post.postInfo.id)}
              >
                <ImageContainer>
                  <PostImage src={post.postInfo.image_url} alt="thumbnail" />
                </ImageContainer>

                {isHover[post.postInfo.id] === true ? (
                  <PostInfoContainer className="Post_Information" style={{ backgroundColor: 'rgb(0, 0, 0, 0.3)' }}>
                    <PostInfoList>
                      <PostInfoItem>
                        <AiFillHeart style={{ marginRight: '7px' }} 
                        color="white" 
                        size="20px" />
                        <PostInfoSpan>{post.likes.total}</PostInfoSpan>
                      </PostInfoItem>
                      <PostInfoItem>
                        <RiMessage3Fill style={{ marginRight: '7px' }}
                          color="white"
                          size="20px" />
                        <PostInfoSpan>{post.comments.length}</PostInfoSpan>
                      </PostInfoItem>
                    </PostInfoList>
                  </PostInfoContainer>
                )
                  :
                  null}

              </SinglePost>
            ))}
          </PostContainer>
        </PostsWrapper>
      </ExploreSection>
    </ExploreContainer>
  );
};

export default ExplorePosts;