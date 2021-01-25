import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../../actions/modalActions/modalActions';

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
  SearchCancelFocus,
  CreatePostButton
} from './styles';

import { BiHomeAlt, BiSearch } from 'react-icons/bi';
import { RiMessengerLine } from 'react-icons/ri';
import { FaRegCompass } from 'react-icons/fa';
import { VscHeart } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { MdCancel } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';

const Header = () => {

  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const user = useSelector(state => state.user);

  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState({
    search: '',
    isFocused: false
  });

  const handleSetFocus = () => {
    searchInput.current.focus();
  };

  const handleOnChangeInput = event => {
    setInput({
      ...input,
      search: event.target.value
    });
  };

  const handleInputOnFocus = () => {
    setFocus(true);
    setInput({
      ...input,
      isFocused: true
    });
  };

  const handleInputOnBlur = () => {
    setInput({
      ...input,
      isFocused: false
    });
    setFocus(false);
  };

  const handleSearchCancelBtn = () => {
    setInput({
      ...input,
      search: ''
    });
  };

  return (
    <HeaderContainer>
      <NavigationContainer>
        <NavigationWrapper>
          <Logo to="/">Clonstagram</Logo>
          <SearchBarContainer>
            <SearchBar ref={searchInput} onChange={handleOnChangeInput} value={input.isFocused === true ? input.search : ''} onFocus={handleInputOnFocus} onBlur={handleInputOnBlur} type="text" name='search' id="search" placeholder="Busca" />
            {focus ?
              (
                <>
                  <SearchIconFocus><BiSearch /></SearchIconFocus>
                  <SearchCancelFocus ><MdCancel onMouseDown={() => handleSearchCancelBtn()} /></SearchCancelFocus>
                </>
              )
              :
              (<SearchingContainer onClick={handleSetFocus}>
                <SearchIconTextContainer>
                  <SearchIcon><BiSearch /></SearchIcon>
                  <SearchText>{input.search !== '' ? input.search : "Busca"}</SearchText>
                </SearchIconTextContainer>
              </SearchingContainer>)
            }
          </SearchBarContainer>
          <NavLinksContainer>
            <NavLink to="/"><BiHomeAlt /></NavLink>
            <NavLink marginleft='2.2rem' to="/direct/inbox"><RiMessengerLine /></NavLink>
            <NavLink marginleft="2.2rem" to="/explore"><FaRegCompass size="23px" /></NavLink>
            <NavLink marginleft="2.2rem" to="/activity"><VscHeart strokeWidth="0.35" /></NavLink>
            <CreatePostButton marginleft="2.2rem" onClick={() => dispatch(openModal())}><GrAddCircle /></CreatePostButton>
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