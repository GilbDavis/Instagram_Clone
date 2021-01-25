import React, { useState, useEffect } from 'react';
import { closeModal } from '../../../actions/modalActions/modalActions';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { isImage, isVideo } from '../../../utils/fileExtension';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-family: 'Grand Hotel',cursive;
  font-size: 2.9rem;
`;

const ModalContent = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const TextAreaContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .TextCounter {
    align-self: flex-end;
  }
`;

const ImagePreview = styled.img`
  width: 50%;
  max-height: 300px;
  height: 100%;
  margin-bottom: 1rem;
`;

const VideoPreview = styled.video`
  width:  70%;
  max-height: 500px;
  height: 100%;
  margin-bottom: 1rem;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;

  &:hover + label, 
  &:focus + label {
    transform: scale(1.02);
  }

  &:focus + label {
    outline: 1px solid #000;
    outline: -webkit-focus-ring-color auto 2px;
  }
`;

const FileLabel = styled.label`
  display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #555555;
  background: #fff;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555555;
  font-weight: bold;
  cursor: pointer;
  transition: transform .2s ease-out;
  text-align: center;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #ff6ec4;
  font-size: 14px;
  padding: 0.75rem;
  margin-top: 2.5rem;

  &:focus {
    outline: none;
    border-color: #7873f5;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  padding: 1rem 4rem;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  border: none;
  background: linear-gradient(40deg,#ff6ec4,#7873f5);
  color: #fff;
  transition: transform 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Modal = () => {

  const dispatch = useDispatch();
  const showModal = useSelector(state => state.modal.showModal);
  const [formData, setFormData] = useState({
    title: '',
    file: '',
    extension: ''
  });
  const [fileName, setFileName] = useState('Seleccionar Archivo');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleFileOnChange = event => {
    setFormData({
      ...formData,
      file: event.target.files[0],
      extension: event.target.files[0].name.split('.').pop()
    });
    setFileName(event.target.files[0].name);
  };

  const handleTextAreaOnChange = event => {
    setFormData({
      ...formData,
      title: event.target.value
    });
  };

  const handleOnSubmit = event => {
    event.preventDefault();
  };

  return (
    <Rodal
      customStyles={{ width: windowWidth < 630 ? '90%' : '614px', height: windowWidth < 630 ? '70%' : '800px' }}
      visible={showModal} 
      closeOnEsc={true}
      onClose={() => dispatch(closeModal())}
      // showCloseButton={false}
    >
      <ModalHeader>
        <Title>Clonstagram</Title>
      </ModalHeader>

      <ModalContent>
        {isImage(formData.extension) ? <ImagePreview src={URL.createObjectURL(formData.file)} alt="preview" /> : null}
        {isVideo(formData.extension) ? <VideoPreview autoPlay controls><source src={URL.createObjectURL(formData.file)} type={`video/${formData.extension}`} /></VideoPreview> : null}
        <Form onSubmit={handleOnSubmit}>
          <div className="file-input">
            <FileInput type="file"
              id="file"
              onChange={handleFileOnChange}
              accept="image/jpeg, image/png, image/bmp, image/gif, video/mp4, video/mov"
            />
            <FileLabel htmlFor="file">{fileName.toString().length > 20 ? `${fileName.substring(0, 15)}.${formData.extension}` : fileName}</FileLabel>
          </div>
          <TextAreaContainer>
            <TextArea
              id="textarea"
              onChange={handleTextAreaOnChange}
              value={formData.title}
              maxLength={200}
              placeholder="Escribe un pie de foto o video..."
              style={{ borderColor: formData.title.length > 0 ? 'green' : '' }}
            />
            <div className="TextCounter" style={{ color: formData.title.length === 200 ? 'red' : '' }}>
              <span id="current">{formData.title.length}</span>
              <span id="maximunLength"> / 200</span>
            </div>
          </TextAreaContainer>
          <div>
            <SubmitButton type="submit">
              <span>Publicar</span>
              &nbsp;<AiOutlineCloudUpload size="24 " />
            </SubmitButton>
          </div>
        </Form>
      </ModalContent>
    </Rodal>
  );
};

export default Modal;