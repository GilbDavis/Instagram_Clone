import styled from '@emotion/styled';
import { Separator } from '../../components/UI/Form';
import { Link } from 'react-router-dom';

export const SeparatorExtended = styled(Separator)`
  margin: 1.5rem 0;
`;

export const HomeContainer = styled.div`
  width: 100%;
  padding-top: 0rem;
  display: flex;
  justify-content: center;
  padding-bottom: 12rem;

  @media (max-width: 875px) {
    padding-top: 0;
    padding-bottom: 2rem;
  }
`;

export const FormSectionContainer = styled.div`
  margin-right: 3rem;
  width: 350px;
  margin-top: 3.5rem;

  @media (max-width: 875px) {
    margin-right: 0;
    margin-top: 0;
  }
`;

export const FormContainer = styled.div`
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  @media (max-width: 875px) {
    border: none;
    background-color: #fafafa;
  }
`;

export const FacebookLoginLink = styled(Link)`
  width: 74%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  border-radius: 4px;

  font-weight: 700;
  background-color: #0095f6;

  span {
    font-size: 1.4rem;
    margin-left: .4rem;
  }
`;

export const ResetPasswordContainer = styled.div`
  width: 75%;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #385185;
  margin: 1rem 0 3rem 0;

  p {
    text-align: center;
    font-size: 1.2rem;
    color: #8e8e8e;

    a {
      text-decoration: none;
      color: #8e8e8e;
      font-weight: 700;

      &:visited {
        color: #00376b;
      }
    }
  }
`;

export const NoAccountContainer = styled.div`
  height: 6.2rem;
  border: 1px solid #e1e1e1;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  @media (max-width: 875px) {
    border: none;
    background-color: #fafafa;
    margin-top: 2rem;
  }

  p {
    font-size: 1.35rem;

    a {
      text-decoration: none;
      color: #0095f6;
      font-weight: bold;
    }
  }
`;

export const Title = styled.h3`
  font-size: 5rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: #262626;
  font-family: 'Grand Hotel', cursive;
`;

export const Description = styled.h3`
  font-size: 1.7rem;
  text-align: center;
  padding:0 3rem;
  margin-top: 0;
  color: #8e8e8e;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DownloadSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 875px) {
    margin-top: 1rem;
  }

  p {
    font-size: 1.4rem;
    padding: 1rem;
  }

  div {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 40%;
      text-decoration: none;
      color: #fff;
      background-color: black;
      border-radius: 5px;
      font-size: 1rem;
      margin-right: 1rem;

      span {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1rem;
        color: silver;

        span {
          font-size: 1.6rem;
          color: #fff;
        }
      }
    }
  }
`;

export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(250, 250, 250);

  @media (max-width: 875px) {
    flex-direction: column;
  }
    
  ul {
      display: flex;
      flex-wrap: wrap;

      @media (max-width: 875px) {
      margin-bottom: 0;
    }

      li {
        list-style-type: none;
        font-size: 1.2rem;
        text-transform: uppercase;
        margin-left: 2rem;

        @media (max-width: 875px) {
          margin-top: .7rem;
        }

        &:nth-of-type(1) {
          margin-left: 0;
        }
        
        a { 
          text-decoration: none;
          color: #00376b;
        }
      }
  }

  h3 {
    font-size: 1.2rem;
    color: #8e8e8e;
    text-transform: uppercase;
    margin-left: 9rem;

    @media (max-width: 875px) {
      margin-left: 0;
    }
  }
`;