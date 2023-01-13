import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Index.css";
import Modal from '../../Components/Modal/İndex'
import {BsSearch} from 'react-icons/bs'
import { getData } from "../../Service/getData";
const Wrapper = styled.div`
  background-image: url(https://dadabooksearch.netlify.app/images/headerbg.jpg);
  background-color: rgb(204, 204, 204);
  height: 350px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 55%;
`;
const Title = styled.h1`
  margin: 0px, 0px, 20px;
  display: block;
  color: white;
  text-align: center;
  font-size: 2rem;
  font-family: "Roboto Serif", sans-serif;
  font-weight: bold;
`;
const Search = styled.div`
  width: 100%;
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  box-shadow: rgb(255 255 255 / 85%) 0px 6px 12px -2px,
    rgb(255 255 255 / 90%) 0px 3px 7px -3px; ;
`;
const InputIcon = styled.span`
    position: absolute;
    font-size: 20px;
    top: 14px;
    right: 8px;
`

const HomeWrapper = styled.div`
  width: 98%;
  margin: 20px auto auto;
  min-height: 55vh;
  display: flex;
  flex-wrap: wrap;
`;
const Card = styled.div`
  width: 280px;
  margin: 15px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  padding: 15px 10px;
  border-radius: 5px;
  box-shadow: rgb(90 90 90 / 54%) 0px 3px 8px;
`;
const Img = styled.img`
  height: 200px;
  width: 95%;
  margin-left: auto;
  object-fit: contain;
  margin-right: auto;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(220, 220, 220);
`;
const Name = styled.h5`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const Author = styled.h6`
  margin-top: 0px;
  margin-bottom: 15px;
  border-top: 1px solid rgb(220, 220, 220);
  padding: 20px 5px 5px;
  font-size: 16px;
  opacity: 0.7;
`;

function Index() {
  let [show, setShow] = useState(false);
  let [books, setBooks] = useState([]);
  let [search, setSearch] = useState("");
  const [bookDetail, setBookDetail] = useState()

  const open = () => {
    setShow(!show);
  };
  const close =()=>{
    setShow(false)
  }
  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
      .then((res) => {
        setBooks(res.data.items);
      });
  }, []);

  const searchBook=()=>{
    getData(search).then((res)=>setBooks(res.data.items))
  }
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Title>
            Abbasov's <br /> Book Searching App
          </Title>
          <Search>
            <form onSubmit={(e)=>{
                e.preventDefault()
                searchBook()
            }}>
            <Input placeholder="Find book" type='text' value={search} onChange={(e)=>setSearch(e.target.value)
              } ></Input>
              <InputIcon onClick={searchBook}><BsSearch/></InputIcon>
            </form>
              
          </Search>
        </ContentWrapper>
      </Wrapper>

{
    <div style={{display:'flex', flexWrap:'wrap', marginLeft:"auto", marginRight:'auto'}}>
{books.map((book, index) => {
        return (
          <>
            <Card>
              <Img src={`${book.volumeInfo?.imageLinks?.thumbnail}`}></Img>
              <Name>{book.volumeInfo.title}</Name>
              <Author>{book.volumeInfo.publisher}</Author>
              <div className="btns">
                <a
                  href={`${book.volumeInfo.previewLink}`}
                  style={{
                    textDecoration: "none",
                    color: "rgb(120, 120, 120)",
                    margin: "10px",
                    fontSize: "16px",
                    curson: "pointer",
                  }}
                >
                  Preview
                </a>
                <button
                show={show}
                setShow={setShow}
                  onClick={()=>{
                    setShow(true);setBookDetail(book)
                  }}
                  style={{
                    textDecoration: "none",
                    color: "rgb(120, 120, 120)",
                    margin: "10px",
                    fontSize: "16px",
                    curson: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Details
                </button>
              </div>
            </Card>
          </>
        );
    })}
    <Modal show={show} book={bookDetail} close={close}/>
    </div>
}
      
    </>
  );
}

export default Index;
