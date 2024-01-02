import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Details from "./Details/Details";
import { card, img, btn, text, link, bookmark } from "./index";
import "./style.css";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkItem, unBookmarkItem } from "../../store/action/bookmarks";
import { IoBookmarkSharp } from "react-icons/io5";

function NewsItem(props) {
  const {
    element,
    imageUrl,
    alt,
    description,
    title,
    channel,
    published,
    urlNews,
  } = props;

  const [isButtonClicked, setIsButtonClicked] = useState();
  const dispatch = useDispatch();
  const { bookmarkItems } = useSelector((state) => state?.bookmarks);

  const bookmarkHandle = (element) => {
    if (!isButtonClicked && element.title != bookmarkItems.title) {
      setIsButtonClicked(true);
      dispatch(bookmarkItem(element));
      localStorage.setItem("isButtonClicked", isButtonClicked);
    } else {
      setIsButtonClicked(false);
      dispatch(unBookmarkItem(element));
      localStorage.setItem("isButtonClicked", isButtonClicked);
    }
  };

  useEffect(() => {
    localStorage.getItem("isButtonClicked");
  }, []);

  return (
    <>
      <Card style={card}>
        <Card.Img style={img} variant="top" src={imageUrl} alt={alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={text}>{description}</Card.Text>
          <Details channel={channel} published={published} />
          <Card.Link style={link}>
            <Button href={urlNews} target="_blank" style={btn}>
              Read more →
            </Button>
            {isButtonClicked ?(
              <IoBookmarkSharp
                size={35}
                style={bookmark}
                enableBackgroundcolor="blue"
                onClick={() => bookmarkHandle(element)}
              />
            ):(
              <PiBookmarkSimpleBold
                onClick={() => bookmarkHandle(element)}
                style={bookmark}
                size={35}
              />
            )}
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
};

export default NewsItem;
