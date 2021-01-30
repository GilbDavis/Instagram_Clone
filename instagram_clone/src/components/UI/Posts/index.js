import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BsThreeDots, BsChatDots } from 'react-icons/bs';
import { VscBookmark } from 'react-icons/vsc';
import { IoIosHeartEmpty } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';

import {
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
  PostsWrapper
} from './styles';

const Posts = () => {
  const posts = useSelector(state => state.post.posts);

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
                <PostImage src={post.postInfo.image_url} />
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
                  {(post.likes && post.likes.total > 0) ?
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
                  post.comments ?
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