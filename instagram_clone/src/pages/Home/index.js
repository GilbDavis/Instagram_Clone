import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AiFillFacebook, AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

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
} from './homeElements';

import Phones from '../../images/phones-background.png';
import image_1 from '../../images/image-1.jpg';
import image_2 from '../../images/image-2.jpg';
import image_3 from '../../images/image-3.jpg';
import image_4 from '../../images/image-4.jpg';
import image_5 from '../../images/image-5.jpg';

const Home = () => {

  const images = [
    { id: '1', src: image_1 },
    { id: '2', src: image_2 },
    { id: '3', src: image_3 },
    { id: '4', src: image_4 },
    { id: '5', src: image_5 }
  ];

  const [animation, setAnimation] = useState({
    activeImage: 1
  });

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

            <Form>
              <Field>
                <Input
                  type="text"
                  name="correo"
                  required
                />
                <Label htmlFor="correo">Teléfono, usuario o correo electrónico</Label>
              </Field>
              <Field>
                <Input
                  type="password"
                  name="password"
                  required
                />
                <Label htmlFor="password">Contraseña</Label>
              </Field>

              <SubmitButton
                type="submit"
                value="Iniciar Sesión"
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
            <p>¿No tienes una cuenta? <Link to="/accounts/signup">Regístrate</Link></p>
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

export default Home;