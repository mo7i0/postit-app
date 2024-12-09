import { Button, Col, Container, Row, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../Features/PostSlice";
import { useState } from "react";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handlePost = async () => {
    // Validate that postMsg is not empty
    if (!postMsg.trim()) {
      alert("Post message is required.");
      return; // Exit the function early if validation fails
    }

    // Ensure user and user.email exist before proceeding
    if (!user || !user.email) {
      alert("User is not logged in or email is missing.");
      return;
    }

    const postData = {
      postMsg: postMsg,
      email: user.email,
    };

    dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
    setpostMsg(""); // Reset the message input after posting
  };

  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={(e) => setpostMsg(e.target.value)}
          />
          <Button onClick={handlePost}>PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
