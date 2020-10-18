import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import styles from './styles/Register.module.scss';

import { AiFillFacebook, AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

import { Form, Field, Input, Label, SubmitButton, Separator } from '../components/UI/Formulario';

const SeparatorExtended = styled(Separator)`
  margin: 1.5rem 0;
`;

const HomeContainer = styled.div`
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

const Titulo = styled.h3`
  font-size: 5rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: #262626;
  font-family: 'Grand Hotel', cursive;
`;

const Description = styled.h3`
  font-size: 1.7rem;
  text-align: center;
  padding:0 3rem;
  margin-top: 0;
  color: #8e8e8e;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContainer = styled.footer`
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

const Register = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', height: '100%' }}>
      <HomeContainer>
        <div className={styles.Form_Section_Container}>
          <div className={styles.Form_div}>
            <TitleContainer>
              <Titulo>ClonStagram</Titulo>
              <Description>Regístrate para ver fotos y vídeos de tus amigos.</Description>

              <Link className={styles.FacebookLink_Container} to="/">
                <AiFillFacebook size="2rem" />
                <span>Iniciar Sesión con Facebook</span>
              </Link>
            </TitleContainer>

            <SeparatorExtended>
              <div></div>
              <div>o</div>
              <div></div>
            </SeparatorExtended>

            <Form>
              <Field>
                <Input
                  type="text"
                  name="correo"
                  required
                />
                <Label htmlFor="correo">Numero de móvil o Correo electrónico</Label>
              </Field>
              <Field>
                <Input
                  type="text"
                  name="name"
                  required
                />
                <Label htmlFor="name">Nombre completo</Label>
              </Field>
              <Field>
                <Input
                  type="text"
                  name="userName"
                  required
                />
                <Label htmlFor="userName">Nombre de usuario</Label>
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
                value="Registrarte"
              />

              <div className={styles.ResetPassLink}>
                <p>
                  Al registrarte, aceptas nuestras <Link to="/accounts/signup">Condiciones</Link>,
                  la <Link to="/accounts/signup">Política de datos</Link> y la <Link to="/accounts/signup">Política de cookies</Link>.
                </p>
              </div>
            </Form>
          </div>

          <div className={styles.NoAccount_Container}>
            <p>¿Tienes una cuenta? <Link to="/">Entrar</Link></p>
          </div>

          <div className={styles.DownloadSection}>
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

export default Register;