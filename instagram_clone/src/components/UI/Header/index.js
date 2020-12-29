import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HeaderContainer,
  Logo,
  NavigationContainer,
  NavLinksContainer,
  NavLink,
  ProfileImage,
  SearchBarContainer,
  SearchBar,
  NavigationWrapper,
  SearchingContainer,
  SearchIcon,
  SearchText,
  SearchIconTextContainer,
  SearchIconFocus,
  SearchCancelFocus
} from './styles';

import { BiHomeAlt, BiSearch } from 'react-icons/bi';
import { RiMessengerLine } from 'react-icons/ri';
import { FaRegCompass } from 'react-icons/fa';
import { VscHeart } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { MdCancel } from 'react-icons/md';

const Header = () => {

  const searchInput = useRef(null);
  const user = useSelector(state => state.user);

  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    searchInput.current.focus();
  }

  return (
    <HeaderContainer>
      <NavigationContainer>
        <NavigationWrapper>
          <Logo to="/">Clonstagram</Logo>
          <SearchBarContainer>
            <SearchBar ref={searchInput} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} type="text" name='search' id="search" placeholder="Busca" />
            {focus ?
              (
                <>
                  <SearchIconFocus><BiSearch /></SearchIconFocus>
                  <SearchCancelFocus><MdCancel /></SearchCancelFocus>
                </>
              )
              :
              (<SearchingContainer onClick={handleFocus}>
                <SearchIconTextContainer>
                  <SearchIcon><BiSearch /></SearchIcon>
                  <SearchText>Busca</SearchText>
                </SearchIconTextContainer>
              </SearchingContainer>)
            }
          </SearchBarContainer>
          <NavLinksContainer>
            <NavLink to="/"><BiHomeAlt /></NavLink>
            <NavLink marginleft='2.2rem' to="/direct/inbox"><RiMessengerLine /></NavLink>
            <NavLink marginleft="2.2rem" to="/explore"><FaRegCompass size="23px" /></NavLink>
            <NavLink marginleft="2.2rem" to="/activity"><VscHeart strokeWidth="0.35" /></NavLink>
            <NavLink marginleft='2.2rem' to="">
              {(user.userData.profileImage) ?
                <ProfileImage src={user.userData.profileImage} alt="User Image" /> :
                <CgProfile />
              }</NavLink>
          </NavLinksContainer>
        </NavigationWrapper>
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;