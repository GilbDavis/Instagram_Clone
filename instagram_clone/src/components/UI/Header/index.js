import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../../actions/modalActions/modalActions';

import {
  HeaderContainer,
  Logo,
  NavigationContainer,
  NavLinksContainer,
  NavigationLink,
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

import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FaFacebookMessenger } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdCancel, MdExplore } from 'react-icons/md';
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
            <NavigationLink to="/" activeClassName="is-active"
              exact>
              <AiFillHome className="Icon" title="Inicio" />
            </NavigationLink>
            <NavigationLink activeClassName="is-active"
              marginleft='2.2rem' to="/direct/inbox">
              <FaFacebookMessenger size="24px" className="Icon" />
            </NavigationLink>
            <NavigationLink activeClassName="is-active"
              marginleft="2.2rem" to="/explore">
              <MdExplore className="Icon" size="26px" />
            </NavigationLink>
            <NavigationLink activeClassName="is-active"
              marginleft="2.2rem" to="/activity">
              <AiFillHeart className="Icon" />
            </NavigationLink>
            <CreatePostButton marginleft="2.2rem" onClick={() => dispatch(openModal())}><GrAddCircle /></CreatePostButton>
            <NavigationLink marginleft='2.2rem' to={`/${user.userData.userName}`}>
              {(user.userData.profileImage) ?
                <ProfileImage src={user.userData.profileImage} alt="User Image" /> :
                <CgProfile />
              }</NavigationLink>
          </NavLinksContainer>
        </NavigationWrapper>
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;