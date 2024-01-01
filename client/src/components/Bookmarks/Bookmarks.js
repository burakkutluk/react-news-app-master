import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Col, Container, Row } from "react-bootstrap";
import { card} from "../Search/index";
import Loading from "../Loading/Loading";
import { Header } from "../Search";
import NewsItem from "../NewsItem/NewsItem";
import { noFound } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import nullImage from "../Images/nullImage.png";
import { getBookmarkItems, unBookmarkItem } from "../../store/action/bookmarks";

const Bookmarks = () => {
  
  const { bookmarkItems } = useSelector((state) => state?.bookmarks);
  const { articles, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getBookmarkItems())
  },[loading])

  const unBookmarkHandler = () => {
    dispatch(unBookmarkItem());
  }

  document.title =
    bookmarkItems === 0
      ? noFound
      : loading;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            BOOKMARKS
          </Header>
          <Container>
            <Row>
              {bookmarkItems.map((element) => {
                return (
                  <Col sm={12} md={6} lg={5} xl={4} style={card} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source.name}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.imageUrl === null
                          ? nullImage
                          : element.urlToImage
                      }
                      urlNews={element.url}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Bookmarks;
