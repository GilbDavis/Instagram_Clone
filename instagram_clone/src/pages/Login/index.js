import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AiFillFacebook, AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

import Spinner from '../../components/Spinner/spinner';
import { Form, Field, Input, Label, SubmitButton, Separator } from '../../components/UI/Form';
import {
  HomeContainer,
  Titulo,
  PhoneImage,
  ImagesAnimationContainer,
  FooterContainer,
  ImageContainer,
  FormSectionContainer,
  FormWrapper,
  FacebookLinkContainer,
  ResetPasswordLink,
  NoAccountContainer,
  DownloadSectionContainer
} from './LoginElements';

import { useDispatch, useSelector } from 'react-redux';
import { startSessionAction } from '../../actions/userActions/loginAction';
import { authenticateUser } from '../../actions/userActions/authenticateAction';

import Phones from '../../images/phones-background.png';
import image_1 from '../../images/image-1.jpg';
import image_2 from '../../images/image-2.jpg';
import image_3 from '../../images/image-3.jpg';
import image_4 from '../../images/image-4.jpg';
import image_5 from '../../images/image-5.jpg';

const images = [
  { id: '1', src: image_1 },
  { id: '2', src: image_2 },
  { id: '3', src: image_3 },
  { id: '4', src: image_4 },
  { id: '5', src: image_5 }
];


const Login = (props) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    isValid: false
  });

  const [animation, setAnimation] = useState({
    activeImage: 1
  });

  const { email, password } = userInput;

  const handleOnChange = event => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
      dispatch(authenticateUser());
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.history, user.isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prevState => ({
        ...animation,
        activeImage: prevState.activeImage + 1
      }));

      if (animation.activeImage >= 4) {
        return setAnimation({
          activeImage: 1
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [animation]);

  useEffect(() => {
    if (email.trim() !== "" && password.trim().length > 5) {
      return setUserInput(state => ({
        ...state,
        isValid: true
      }));
    }

    return setUserInput(state => ({
      ...state,
      isValid: false
    }));
  }, [email, password]);

  if (user.loading) {
    return <Spinner />;
  }

  const handleOnSubmit = event => {
    event.preventDefault();

    if (userInput.isValid === false) {
      return;
    }

    return dispatch(startSessionAction(email, password));
  };

  return (
    <>
      <HomeContainer>
        <ImageContainer>
          <ImagesAnimationContainer>
            {images.map((image) =>
              <img
                key={image.id}
                className={`AnimatedImage${Number(image.id) === animation.activeImage ? ' showImage' : ''}`}
                alt="crossfading-images"
                src={image.src}
              />
            )}
          </ImagesAnimationContainer>

          <PhoneImage src={Phones} />
        </ImageContainer>

        <FormSectionContainer>
          <FormWrapper>
            <div>
              <Titulo>ClonStagram</Titulo>
            </div>

            <Form onSubmit={handleOnSubmit}>
              <Field>
                <Input
                  type="text"
                  name="email"
                  onChange={handleOnChange}
                  value={email}
                  required
                />
                <Label htmlFor="email">Teléfono, usuario o correo electrónico</Label>
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
                value="Iniciar Sesión"
                valid={userInput.isValid}
              />

              <Separator>
                <div></div>
                <div>o</div>
                <div></div>
              </Separator>

              <FacebookLinkContainer to="/">
                <AiFillFacebook size="2rem" />
                <span>Iniciar Sesión con Facebook</span>
              </FacebookLinkContainer>

              <ResetPasswordLink to="/accounts/password/reset">¿Has olvidado la contraseña?</ResetPasswordLink>
            </Form>
          </FormWrapper>

          <NoAccountContainer>
            <p>¿No tienes una cuenta? <Link to="/signup">Regístrate</Link></p>
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

export default Login;