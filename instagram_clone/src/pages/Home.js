import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import styles from './styles/Home.module.scss';

import { AiFillFacebook, AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

import { Form, Field, Input, Label, SubmitButton, Separator } from '../components/UI/Formulario';

import Phones from '../images/phones-background.png';
import image_1 from '../images/image-1.jpg';
import image_2 from '../images/image-2.jpg';
import image_3 from '../images/image-3.jpg';
import image_4 from '../images/image-4.jpg';
import image_5 from '../images/image-5.jpg';

const HomeContainer = styled.div`
  width: 100%;
  padding-top: 11rem;
  display: flex;
  justify-content: center;
  padding-bottom: 12rem;

  @media (max-width: 875px) {
    padding-top: 0;
    padding-bottom: 7rem;
  }
`;

const Titulo = styled.h3`
  font-size: 5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #262626;
  font-family: 'Grand Hotel', cursive;
`;

const PhoneImage = styled.img`
  width: 100%;
  height: 618px;

  @media (max-width: 875px) {
    display: none;
  }
`;

const ImagesAnimationContainer = styled.div`
  position: absolute;
  margin: 9.9rem 0 0 15.1rem;

  @media (max-width: 875px) {
    display: none;
  }

  .AnimatedImage {
    position: absolute;
    opacity: 0;
    transition: opacity 2s ease-in-out;
  }

  .showImage {
      opacity: 1;
    }

`;

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

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
    <div style={{ backgroundColor: '#fafafa', height: '100%' }}>
      <HomeContainer>
        <div className={styles.Home_Image_Container}>
          <ImagesAnimationContainer>
            {images.map((image) =>
              <img
                key={image.id}
                className={`AnimatedImage ${Number(image.id) === animation.activeImage ? 'showImage' : ''}`}
                alt="crossfading-images"
                src={image.src}
              />
            )}
          </ImagesAnimationContainer>

          <PhoneImage src={Phones} />
        </div>

        <div className={styles.Home_Form_Section_Container}>
          <div className={styles.Home_Form_div}>
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

              <Link className={styles.Home_FacebookLink_Container} to="/">
                <AiFillFacebook size="2rem" />
                <span>Iniciar Sesión con Facebook</span>
              </Link>

              <Link to="/accounts/password/reset" className={styles.Home_ResetPassLink}>¿Has olvidado la contraseña?</Link>
            </Form>
          </div>

          <div className={styles.Home_NoAccount_Container}>
            <p>¿No tienes una cuenta? <Link to="/accounts/signup">Regístrate</Link></p>
          </div>

          <div className={styles.Home_DownloadSection}>
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
          </div>
        </div>
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
    </div>
  );
};

export default Home;