import React, { useState } from 'react'
import styled from 'styled-components';
import {GrClose} from 'react-icons/gr'

const ModalContainer = styled.div`
  top: 50%;
  background-color: #fff;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  padding: 50px 25px !important;
  width: 40% !important;
  z-index: 1000;
  /* display: ${({ show }) => (show ? "block" : "none")}; */
  box-shadow: 0 50px 100px -20px rgb(50 50 93 / 25%),
    0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%);
`;
const ModalImg = styled.img`
  width: 25%;
  height: 200px;
  margin-left: auto;
  object-fit: contain;
  float: left;
  margin-right: auto;
`;
const ModalTextContainer = styled.div`
  width: 70%;
  float: left;
  margin: 10px, 0px;
  box-sizing: border-box;
  padding: 5px, 15px;
`;
const ModalTitle = styled.h4`
  padding: 10px, 15px;
  text-align: center;
  margin: 0px;
`;
const ModalAuthor = styled.h5`
  margin: 2px;
  display: inline-block;
  background-color: rgba(220, 220, 220, 0.4);
  padding: 6px;
  border-radius: 20px;
  color: black;
`;
const ModalText = styled.p`
  max-height: 250px;
  overflow: auto;
  word-spacing: 1px;
  letter-spacing: 0.2px;
  font-size: 14px;
  line-height: 22px;
`;
const ModalCloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: rgb(255, 40, 0);
`;

function İndex({show, book, close}) {
    if (!show) {
        return null;
    }
  return (
    <ModalContainer>
        
        <ModalImg src={`${book.volumeInfo?.imageLinks?.thumbnail}`}></ModalImg>
        <ModalTextContainer>
          <ModalTitle>{book.volumeInfo.title}</ModalTitle>
          <ModalAuthor>{book.volumeInfo.publisher}</ModalAuthor>
          <ModalText>{book.volumeInfo.description}</ModalText>
          <ModalCloseIcon onClick={close}><GrClose/></ModalCloseIcon>
        </ModalTextContainer>
      </ModalContainer>
  )
}

export default İndex