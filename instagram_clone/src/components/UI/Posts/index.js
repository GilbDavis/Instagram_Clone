import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { BsThreeDots, BsChatDots } from 'react-icons/bs';
import { VscBookmark } from 'react-icons/vsc';
import { IoIosHeartEmpty } from 'react-icons/io';

const MainContainer = styled.main`
  margin-top: 54px;
  width: 100%;
  background-color: #fafafa;
  background-color: rgba(var(--b3f,250,250,250),1);
`;

const PostsWrapper = styled.section`
  max-width: 935px;
  width: 100%;
  padding-top: 30px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
`;

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;

const Post = styled.div`
  max-width: 614px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 6rem;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
`;

const PostHeader = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.6rem;
  position: relative;
  z-index: 0;
`;

const PostHeaderImage = styled.div`
  width: 32px;
  height: 32px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const PostHeaderName = styled.div`
  margin-left: 1.5rem;

  span {
    font-weight: 600;

    a {
      color: inherit;
      text-decoration: none;
      font-size: 1.4rem;

      &:visited {
        color: #00376b;
        text-decoration: none;
      }
    }
  }
`;

const PostHeaderOptions = styled.div`
  position: absolute;
  height: 100%;
  right: 4px;
  display: flex;
  align-items: center;

  button {
    background: 0 0;
    border: none;
  
    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    div {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const PostImageContainer = styled.div`
  width: 100%;
  max-height: 800px;
  height: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 100%;
  height: 100%;
`;

const PostFooter = styled.div`
  width: 100%;
`;

const PostFooterActions = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;

  .FirstActions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
      display: inline-block;

      &:last-child {
        transform: scaleX(-1);
      }

      button {
        background: 0 0;
        border: none;
      
        &:hover {
          cursor: pointer;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }

  .SecondActions {
    display: flex;
    align-items: center;

    span {
      display: inline-block;

      button {
        background: 0 0;
        border: none;
      
        &:hover {
          cursor: pointer;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const PostFooterLikes = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  margin-bottom: .8rem;

  button {
    background: 0 0;
    border: none;
    padding: 0;
    font-weight: bold;
  
    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }
`;

const PostFooterTitle = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    font-size: 1.4rem;

    &:first-of-type {
      font-weight: bold;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
`;

const Posts = () => {

  const posts = [{ owner: 'Sussan_97', title: 'Exploracion urbana!', profilePhoto: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', photoURL: 'https://images.unsplash.com/photo-1602525962574-3bc829fbed3c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { owner: 'Paula_sofi03', title: 'Enamorados el uno del otro!', profilePhoto: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', photoURL: 'https://images.unsplash.com/photo-1610141095202-4f36dc1e7899?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=645&q=80' }];

  return (
    <MainContainer>
      <PostsWrapper>
        <PostsContainer>
          {posts.map((post, current) => (
            <Post key={current}>
              <PostHeader>
                <PostHeaderImage>
                  <Link to={`/${post.owner}`}>
                    <img src={post.profilePhoto} alt="profile" />
                  </Link>
                </PostHeaderImage>
                <PostHeaderName>
                  <span>
                    <Link to={`/${post.owner}`}>{post.owner}</Link>
                  </span>
                </PostHeaderName>
                <PostHeaderOptions>
                  <button type="button">
                    <div>
                      <BsThreeDots size="16px" />
                    </div>
                  </button>
                </PostHeaderOptions>
              </PostHeader>
              <PostImageContainer>
                <PostImage src={post.photoURL} />
              </PostImageContainer>
              <PostFooter>
                <PostFooterActions>
                  <div className="FirstActions">
                    <span>
                      <button type="button">
                        <IoIosHeartEmpty size="28px" />
                      </button>
                    </span>
                    <span>
                      <button type="button">
                        <BsChatDots size="26px" />
                      </button>
                    </span>
                  </div>
                  <div className="SecondActions">
                    <span>
                      <button type="button">
                        <VscBookmark size="26px" />
                      </button>
                    </span>
                  </div>
                </PostFooterActions>

                <PostFooterLikes>
                  <button type="button">
                    <span>6</span>
                    {' '}Likes
                  </button>
                </PostFooterLikes>

                <PostFooterTitle>
                  <span>
                    <Link to={`/${post.owner}`}>{post.owner}</Link>
                  </span>
                  <span>
                    &nbsp;{post.title}
                  </span>
                </PostFooterTitle>
              </PostFooter>
            </Post>
          ))}

        </PostsContainer>
      </PostsWrapper>
    </MainContainer>
  );
};

export default Posts;