import styled from '@emotion/styled';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Field = styled.div`
  height: 36px;
  width: 74%;
  position: relative;
  margin-bottom: .7rem;
`;

export const Input = styled.input`
  border: 1px solid #e1e1e1;
  font-size: 1.2rem;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border: 1px solid #a8a8a8;
  }

  &:focus ~ label,
  &:valid ~ label{
    transform: translateY(-11.5px);
    font-size: 1rem;
  }
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: #8e8e8e;
  position: absolute;
  bottom: 10px;
  left: 10px;
  pointer-events: none;
  transition: all 0.3s ease;
`;

export const SubmitButton = styled.input`
  width: 74%;
  height: 30px;
  background-color: ${props => (props.valid ? '#0095f6' : 'rgba(var(--d69,0,149,246),.3)')};
  pointer-events: ${props => (props.valid ? 'auto' : 'none')};
  border: none;
  color: #fff;
  font-weight: 700;
  border-radius: 4px;
  margin-top: .7rem;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Separator = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  div:first-of-type {
    border-bottom: 1px solid #e1e1e1;
    width: 30%;
    margin-right: 1.8rem;
  }

  div:nth-of-type(2) {
    color: #8e8e8e;
    font-size: 1.7rem;
  }

  div:last-of-type {
    border-bottom: 1px solid #e1e1e1;
    width: 30%;
    margin-left: 1.8rem;
  }
`;