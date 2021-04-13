import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import ApiService from "./api";
import Post from "./components/post";

function App() {
  const api = new ApiService();
  const [post, setPosts] = useState([]);
  useEffect(async () => {
    const response = await api.getInitialPostIds();
    setPosts(response.data.filter((v, i) => i < 10));
  }, []);
  const getPosts = () => {
    return post.map((v) => {
      return (
        <Col span={24} className="pad-20" key={v}>
          <Post postId={v} />
        </Col>
      );
    });
  };
  return <Row>{getPosts()}</Row>;
}

export default App;
