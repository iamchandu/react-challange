import { Comment, Tooltip } from "antd";
import moment from "moment";
import ApiService from "../api";
import { useState, useEffect } from "react";

export default function CommentComponent({ id }) {
  const api = new ApiService();
  const [comment, setComment] = useState(null);

  useEffect(async () => {
    try {
      const response = await api.getData(id);
      setComment(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getCommentText = (c) => {
    return { __html: c };
  };

  const getComm = () => {
    return (
      <Comment
        author={comment.by}
        content={<div dangerouslySetInnerHTML={getCommentText(comment.text)} />}
        datetime={api.timeStamp(comment.time)}
      />
    );
  };

  return <li>{comment ? getComm() : null}</li>;
}
