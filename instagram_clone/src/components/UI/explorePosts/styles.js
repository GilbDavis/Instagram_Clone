import styled from '@emotion/styled';

export const ExploreContainer = styled.main`
  width: 100%;
  margin-top: 54px;
`;

export const ExploreSection = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding-top: 3rem;
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 40px 20px 0;
`;

export const SinglePost = styled.div`
  width: calc(33.3333% - 28px);
  min-height: 292.98px;
  height: 100%;
  margin: 0 12px 12px 0;
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  display: block;
  overflow: hidden;
`;
export const PostImage = styled.img`
  width: 100%;
  min-height: 292.98px;
  height: 100%;
  max-height: 292.98px;
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const PostInfoList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const PostInfoItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:first-of-type {
    margin-right: 30px;
  }
`;

export const PostInfoSpan = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1.6rem;
`;