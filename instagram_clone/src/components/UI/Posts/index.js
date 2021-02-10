import React, { useEffect, useState } from 'react';
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
import { addCommentAction } from '../../../actions/postsActions/commentActions';
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
  SaveButton,
  PostFooterCommentSection,
  PostFooterCommentContainer,
  PostFooterCommentForm,
  PostFooterCommentTextArea,
  PostFooterCommentSubmit
} from './styles';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    authenticateToken();
    dispatch(getAllPosts());
  }, []);

  const handleCommentOnChange = (event, postId) => {
    setComment({
      ...comment,
      [postId]: event.target.value
    });
  };

  const handleInputAutoResize = (element, defaultHeight) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = defaultHeight;
      target.style.height = `${target.scrollHeight}px`;
    }
  };

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
                  post.comments.length > 0 ?
                    post.comments.length > 2 ?
                      <>
                        <PostFooterSeeComments><Link to="/">Ver los {post.comments.length} comentarios</Link></PostFooterSeeComments>
                        {post.comments.slice(-2).map(comment => (
                          <PostFooterComments key={comment.commentId}>
                            <span><Link to={`/${comment.owner}`}>{comment.owner}</Link></span>
                            <span>&nbsp;{comment.commentText}</span>
                          </PostFooterComments>
                        ))}
                      </>
                      :
                      post.comments.map(comment => (
                        <PostFooterComments key={comment.commentId}>
                          <span><Link to={`/${comment.owner}`}>{comment.owner}</Link></span>
                          <span>&nbsp;{comment.commentText}</span>
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

                <PostFooterCommentSection>
                  <PostFooterCommentContainer>
                    <PostFooterCommentForm onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(addCommentAction(post.postInfo.id, comment[post.postInfo.id]));
                    }}>
                      <PostFooterCommentTextArea
                        placeholder="Añade un comentario..."
                        autoComplete="off"
                        maxLength={255}
                        onChange={(event) => {
                          handleCommentOnChange(event, post.postInfo.id);
                          handleInputAutoResize(event, '18px');
                        }}
                        value={comment[post.postInfo.id]}
                      />
                      <PostFooterCommentSubmit type="submit">Publicar</PostFooterCommentSubmit>
                    </PostFooterCommentForm>
                  </PostFooterCommentContainer>
                </PostFooterCommentSection>
              </PostFooter>
            </Post>
          ))}

        </PostsContainer>
      </PostsWrapper>
    </MainContainer>
  );
};

export default Posts;