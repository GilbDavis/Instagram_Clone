import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { BsThreeDots, BsChatDots } from 'react-icons/bs';
import { VscBookmark } from 'react-icons/vsc';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';

import { getAllPosts } from '../../../actions/postsActions/postsActions';
import { setLikeAndUnlike } from '../../../actions/postsActions/likesActions';
import authenticateToken from '../../../utils/authenticateToken';

import {
  PostFooterActionWrapper,
  PostFooterActionSpan,
  MainContainer,
  Post,
  PostFooter,
  PostFooterActions,
  PostFooterComments,
  PostFooterLikes,
  PostFooterSeeComments,
  PostFooterTimer,
  PostFooterTitle,
  PostHeader,
  PostHeaderImage,
  PostHeaderName,
  PostHeaderOptions,
  PostImage,
  PostImageContainer,
  PostsContainer,
  PostsWrapper,
  LikeButton,
  CommentButton,
  PostFooterSaveWrapper,
  SaveButton
} from './styles';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);

  useEffect(() => {
    authenticateToken();
    dispatch(getAllPosts());
  }, []);

  return (
    <MainContainer>
      <PostsWrapper>
        <PostsContainer>
          {posts.map(post => (
            <Post key={post.postInfo.id}>
              <PostHeader>
                <PostHeaderImage>
                  <Link to={`/${post.owner.userName}`}>
                    {post.owner.profileImage ? <img src={post.owner.profileImage} alt="profile" />
                      : <CgProfile style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                  </Link>
                </PostHeaderImage>
                <PostHeaderName>
                  <span>
                    <Link to={`/${post.owner.userName}`}>{post.owner.userName}</Link>
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
                <PostImage src={post.postInfo.image_url} alt="thumbnail" />
              </PostImageContainer>
              <PostFooter>
                <PostFooterActions>
                  <PostFooterActionWrapper>
                    <PostFooterActionSpan>
                      <LikeButton type="button" onClick={() => dispatch(setLikeAndUnlike(post.postInfo.id))}>
                        {post.likes.updated ? <IoIosHeart size="28px" color="red" /> :
                          <IoIosHeartEmpty size="28px" />
                        }
                      </LikeButton>
                    </PostFooterActionSpan>
                    <PostFooterActionSpan>
                      <CommentButton type="button">
                        <BsChatDots size="26px" />
                      </CommentButton>
                    </PostFooterActionSpan>
                  </PostFooterActionWrapper>
                  <PostFooterSaveWrapper>
                    <PostFooterActionSpan>
                      <SaveButton type="SaveButton">
                        <VscBookmark size="26px" />
                      </SaveButton>
                    </PostFooterActionSpan>
                  </PostFooterSaveWrapper>
                </PostFooterActions>

                <PostFooterLikes>
                  {post.likes.total > 0 ?
                    <button type="button">
                      <span>{post.likes.total}</span>
                    &nbsp;Me gusta
                  </button>
                    : null}
                </PostFooterLikes>

                <PostFooterTitle>
                  {(post.postInfo && post.postInfo.title.length > 0) ?
                    <>
                      <span>
                        <Link to={`/${post.owner.userName}`}>{post.owner.userName}</Link>
                      </span>
                      <span>
                        &nbsp;{post.postInfo.title}
                      </span>
                    </>
                    :
                    null
                  }
                </PostFooterTitle>

                {
                  post.comments?.length > 0 ?
                    post.comments.length > 2 ?
                      <>
                        <PostFooterSeeComments><Link to="/">Ver los {post.comments.length} comentarios</Link></PostFooterSeeComments>
                        {post.comments.slice(-2).map(comment => (
                          <PostFooterComments key={comment.owner.userId}>
                            <span><Link to={`/${comment.owner.userName}`}>{comment.owner.userName}</Link></span>
                            <span>&nbsp;{comment.commentInfo.comment}</span>
                          </PostFooterComments>
                        ))}
                      </>
                      :
                      post.comments.map(comment => (
                        <PostFooterComments key={comment.owner.userId}>
                          <span><Link to={`/${comment.owner.userName}`}>{comment.owner.userName}</Link></span>
                          <span>&nbsp;{comment.commetInfo.comment}</span>
                        </PostFooterComments>
                      ))
                    :
                    null
                }

                <PostFooterTimer>
                  <Link to='/'>
                    <time dateTime={new Date(post.postInfo.createdAt)} title={format(new Date(post.postInfo.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: es })}>
                      Hace {formatDistance(new Date(), new Date(post.postInfo.createdAt), { locale: es })}
                    </time>
                  </Link>
                </PostFooterTimer>
              </PostFooter>
            </Post>
          ))}

        </PostsContainer>
      </PostsWrapper>
    </MainContainer>
  );
};

export default Posts;