import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AiFillFacebook, AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

import { Form, Field, Input, Label, SubmitButton } from '../../components/UI/Form';
import {
  SeparatorExtended,
  HomeContainer,
  TitleContainer,
  Title,
  Description,
  FooterContainer,
  FormSectionContainer,
  FormContainer,
  FacebookLoginLink,
  ResetPasswordContainer,
  NoAccountContainer,
  DownloadSectionContainer
} from './signUpElements';

import { useDispatch, useSelector } from 'react-redux';
import { startSignUpAction } from '../../actions/userActions/signUpAction';
import { authenticateUser } from '../../actions/userActions/authenticateAction';

const Register = (props) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [userInput, setUserInput] = useState({
    email: '',
    name: '',
    userName: '',
    password: '',
    isValid: false
  });

  const { email, name, userName, password } = userInput;

  const handleOnChange = event => setUserInput({ ...userInput, [event.target.name]: event.target.value });

  const handleOnSubmit = event => {
    event.preventDefault();

    if (userInput.isValid === false) {
      return;
    }

    return dispatch(startSignUpAction({ email, fullName: name, userName, password }));
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      dispatch(authenticateUser());
    }
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      props.history.push("/");
    }
  }, [user.isAuthenticated, props.history]);

  useEffect(() => {
    if (email.trim() !== "" && name !== "" && userName !== "" && password.trim().length > 7) {
      return setUserInput(state => ({
        ...state,
        isValid: true
      }));
    }

    return setUserInput(state => ({
      ...state,
      isValid: false
    }));
  }, [email, name, userName, password]);

  return (
    <>
      <HomeContainer>
        <FormSectionContainer>
          <FormContainer>
            <TitleContainer>
              <Title>ClonStagram</Title>
              <Description>Regístrate para ver fotos y vídeos de tus amigos.</Description>

              <FacebookLoginLink to="/">
                <AiFillFacebook size="2rem" />
                <span>Iniciar Sesión con Facebook</span>
              </FacebookLoginLink>
            </TitleContainer>

            <SeparatorExtended>
              <div></div>
              <div>o</div>
              <div></div>
            </SeparatorExtended>

            <Form onSubmit={handleOnSubmit}>
              <Field>
                <Input
                  type="text"
                  name="email"
                  required
                  onChange={handleOnChange}
                  value={email}
                />
                <Label htmlFor="email">Numero de móvil o Correo electrónico</Label>
              </Field>
              <Field>
                <Input
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  value={name}
                  required
                />
                <Label htmlFor="name">Nombre completo</Label>
              </Field>
              <Field>
                <Input
                  type="text"
                  name="userName"
                  onChange={handleOnChange}
                  required
                  value={userName}
                />
                <Label htmlFor="userName">Nombre de usuario</Label>
              </Field>
              <Field>
                <Input
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  value={password}
                  required
                />
                <Label htmlFor="password">Contraseña</Label>
              </Field>

              <SubmitButton
                type="submit"
                value="Registrarte"
                valid={userInput.isValid}
              />

              <ResetPasswordContainer>
                <p>
                  Al registrarte, aceptas nuestras <Link to="/accounts/signup">Condiciones</Link>,
                  la <Link to="/accounts/signup">Política de datos</Link> y la <Link to="/accounts/signup">Política de cookies</Link>.
                </p>
              </ResetPasswordContainer>
            </Form>
          </FormContainer>

          <NoAccountContainer>
            <p>¿Tienes una cuenta? <Link to="/">Entrar</Link></p>
          </NoAccountContainer>

          <DownloadSectionContainer>
            <p>Descarga la aplicación.</p>

            <div>
              <a href="https://www.apple.com/la/ios/app-store/" rel="noreferrer noopener" target="_blank">
                <AiFillApple size="3.5rem" />
                <span>Consiguelo en el <span>APP Store</span></span>
              </a>
              <a href="https://play.google.com/store" rel="noreferrer noopener" target="_blank">
                <FaGooglePlay size="2.5rem" />
                <span>Disponible en <span>Google Play</span></span>
              </a>
            </div>
          </DownloadSectionContainer>
        </FormSectionContainer>
      </HomeContainer>

      <FooterContainer>
        <ul>
          <li><Link to="/">Información</Link></li>
          <li><Link to="/">Ayuda</Link></li>
          <li><Link to="/">Prensa</Link></li>
          <li><Link to="/">API</Link></li>
          <li><Link to="/">Empleo</Link></li>
          <li><Link to="/">Privacidad</Link></li>
          <li><Link to="/">Condiciones</Link></li>
          <li><Link to="/">Ubicaciones</Link></li>
          <li><Link to="/">Cuentas Destacadas</Link></li>
          <li><Link to="/">Hashtags</Link></li>
          <li><Link to="/">Idioma</Link></li>
        </ul>

        <h3>&copy; 2020 Instagram from Facebook</h3>
      </FooterContainer>
    </>
  );
};

export default Register;