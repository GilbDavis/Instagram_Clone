import styled from '@emotion/styled';

export const MainContainer = styled.main`
  margin-top: 54px;
  width: 100%;
  background-color: #fafafa;
  background-color: rgba(var(--b3f,250,250,250),1);
`;

export const PostsWrapper = styled.section`
  max-width: 935px;
  width: 100%;
  padding-top: 30px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
`;

export const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;

export const Post = styled.div`
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

export const PostHeader = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.6rem;
  position: relative;
  z-index: 0;
`;

export const PostHeaderImage = styled.div`
  width: 32px;
  height: 32px;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const PostHeaderName = styled.div`
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

export const PostHeaderOptions = styled.div`
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

export const PostImageContainer = styled.div`
  width: 100%;
  max-height: 800px;
  height: 100%;
`;

export const PostImage = styled.img`
  width: 100%;
  max-height: 100%;
  height: 100%;
`;

export const PostFooter = styled.div`
  width: 100%;
`;

export const PostFooterActions = styled.div`
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

export const PostFooterLikes = styled.div`
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

export const PostFooterTitle = styled.div`
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

export const PostFooterSeeComments = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  margin: 4px 0;

  a {
    display: block;
    width: 100%;
    font-size: 1.4rem;
    text-decoration: none;
    color: #8e8e8e;
  }
`;

export const PostFooterComments = styled.div`
  width: 100%;
  padding: 0 1.6rem;

  span {
    font-size: 1.4rem;
    
    &:first-of-type {
      font-weight: bold;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const PostFooterTimer = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  margin: 4px 0;

  a {
    text-decoration: none;
    font-size: 1.4rem;
    color: #8e8e8e;
  }
`;