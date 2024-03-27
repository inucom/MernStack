import styled from '@emotion/styled';

const UploadDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 1200px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const UploadForm = styled.form`
  width: 80%;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  #title{
    border-radius:10px;
    border :1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  textarea{
    min-height: 100px;
    resize:none;
    border-radius:10px;
    border :1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  label{
    font-weight: bold;
    margin-top:10px;
  }
`;

const UploadButtonDiv = styled.div`
  margin-top:1rem;
  display: flex;
  justify-content: flex-end;
  button{
    border-radius: 15px;
    padding: 10px;
    background: black;
    color:white;
    border: none;
    cursor: pointer;
    &:hover{
      background-color:white;
      color:black;
      border:1px solid black;
    }
    &.cancel{
      margin-right: 10px;
      border-radius: 15px;
      padding: 10px;
      background: white;
      color:black;
      border: none;
      cursor: pointer;
      &:hover{
        background-color:black;
        color:white;
        border:1px solid black;
      }
    }
    &:disabled {
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
      border: none;
    }
  }
`;

export { UploadButtonDiv, UploadDiv, UploadForm };
