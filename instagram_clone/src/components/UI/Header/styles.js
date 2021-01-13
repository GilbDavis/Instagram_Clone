import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 54px;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 9999;
`;

export const NavigationContainer = styled.nav`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgba(var(--b6a,219,219,219),1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavigationWrapper = styled.div`
  max-width: 975px;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  font-size: 2.9rem;
  font-family: 'Grand Hotel',cursive;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
`;

export const NavLinksContainer = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 26px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`;

export const NavLink = styled(Link)`
  height: 100%;
  font-weight: normal;
  font-size: 2.6rem;
  text-decoration: none;
  color: inherit;
  margin-left: ${props => props.marginleft ? props.marginleft : 0};
`;

export const ProfileImage = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

export const SearchBarContainer = styled.div`
  height: 28px;
  display: flex;
  align-items: stretch;
  position: relative;
`;

export const SearchBar = styled.input`
  width: 100%;
  font-size: 1.4rem;
  align-self: stretch;
  border: solid 1px rgba(var(--b6a,219,219,219),1);
  border-radius: 3px;
  background: #fafafa;
  padding: 3px 10px 3px 26px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: transparent;
    font-size: 1.4rem;
  }

  &:focus::placeholder {
    color: #8e8e8e;
  }

  &:focus::placeholder-shown{
    font-size: 1.4rem;
  }
`;

export const SearchingContainer = styled.div`
  position: absolute;
  text-align: center;
  padding: 7px;
  width: 100%;
  height: 100%;
  left: 0;
  justify-content: center;
  align-self: center;
  border-radius: 3px;
  z-index: 2;
  cursor: text;
`;

export const SearchIconTextContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchIcon = styled.span`
  margin-top: .25rem;
  font-size: 1.2rem;
  margin-right: .4rem;
  color: #8e8e8e;
`;

export const SearchText = styled.span`
  font-size: 1.4rem;
  color: #8e8e8e;
`;

export const SearchIconFocus = styled(SearchIcon)`
  position: absolute;
  left: 1.1rem;
  margin-top: 0.8rem;
  z-index: 100;
`;

export const SearchCancelFocus = styled.div`
  margin-top: .25rem;
  font-size: 1.2rem;
  margin-right: .4rem;
  color: #8e8e8e;
  position: absolute;
  z-index: 100;
  right: 5px;
  top: .35rem;
  font-size: 1.6rem;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
  }
`;