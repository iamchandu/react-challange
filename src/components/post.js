import ApiService from "../api";
import { Card, List } from "antd";
import { useState, useEffect } from "react";
import CommentComponent from "./comment";

export default function Post({ postId }) {
  const api = new ApiService();
  const [post, setPost] = useState({ kids: [] });

  useEffect(async () => {
    try {
      let response = await api.getData(postId);
      response.data.kids = response.data.kids?.filter((v, i) => i < 20) || [];
      setPost(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getCommentsList = () => {
    return (
      <List
        className="comment-list"
        header={`${post.descendants} comments`}
        itemLayout="horizontal"
        dataSource={post.kids}
        renderItem={(item) => <CommentComponent id={item} />}
      />
    );
  };

  return (
    <Card
      type="inner"
      title={post.title}
      extra={
        <span>
          <b>{post.by}</b>, {api.timeStamp(post.time)}
        </span>
      }
    >
      {post.kids.length ? getCommentsList() : null}
    </Card>
  );
}
