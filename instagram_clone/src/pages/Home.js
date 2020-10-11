import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import styles from './styles/Home.module.scss';
import { AiFillFacebook, AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

import { Form, Field, Input, Label, SubmitButton, Separator } from '../components/UI/Formulario';

import Phones from '../images/phones-background.png';

const HomeContainer = styled.div`
  width: 100%;
  padding-top: 11rem;
  display: flex;
  justify-content: center;
  padding-bottom: 12rem;
`;

const Titulo = styled.h3`
  font-size: 5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-family: 'Grand Hotel', cursive;
`;

const Image = styled.img`
  width: 100%;
  height: 618px;

  @media (max-width: 875px) {
    display: none;
  }
`;

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
    
  ul {
      display: flex;
      flex-wrap: wrap;

      li {
        list-style-type: none;
        font-size: 1.2rem;
        text-transform: uppercase;
        margin-left: 2rem;

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
  }
`;

const Home = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', height: '100%' }}>
      <HomeContainer>
        <div className={styles.Home_Image_Container}>
          <Image src={Phones} />
        </div>

        <div className={styles.Home_Form_Section_Container}>
          <div className={styles.Home_Form_div}>
            <div>
              <Titulo>Instagram</Titulo>
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
        </ul>

        <h3>&copy; 2020 Instagram from Facebook</h3>
      </FooterContainer>
    </div>
  );
};

export default Home;