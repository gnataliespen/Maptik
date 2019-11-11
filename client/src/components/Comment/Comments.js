import React from "react";
import { List, CommentAvatar, Comment } from "semantic-ui-react";

const Comments = ({ comments }) => {
  return (
    <Comment.Group>
      {comments.map((comment, i) => (
        <Comment key={i}>
          <CommentAvatar
            src={comment.author.picture}
            alt={comment.author.name}
          />
          <Comment.Content>
            <Comment.Author as="h4">{comment.author.name}</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
};

export default Comments;
