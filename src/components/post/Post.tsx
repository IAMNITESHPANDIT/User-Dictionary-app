import React, { useState } from "react";
import Popup from "../popup/Popup";
import "./post.style.scss";

interface PostProps {
  post: {
    title: string;
    body: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const togglePopupVisibility = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  return (
    <>
      <div onClick={togglePopupVisibility} className="post"> 
        <div className="title">{post.title}</div> 
        <div>{post.body}</div>
      </div>
      {isPopupVisible && (
        <Popup onClose={togglePopupVisibility}>{post.body}</Popup>
      )}
    </>
  );
};

export default Post;
