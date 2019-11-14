import React, { Fragment } from "react";
import { CommentAvatar, Comment, Divider, Image } from "semantic-ui-react";
import { format } from "date-fns";

const Comments = ({ comments, openModal }) => {
  return (
    <Fragment>
      <Comment.Group>
        {comments.map((comment, i) => (
          <Comment key={i}>
            <Divider />

            {comment.author && (
              <CommentAvatar
                src={comment.author.picture}
                alt={comment.author.name}
              />
            )}
            <Comment.Content>
              <Comment.Author as="h4" style={{ margin: 0 }}>
                {comment.author ? comment.author.name : "Anonymous"}
              </Comment.Author>
              <Comment.Metadata>
                <div>
                  {format(new Date(comment.createdAt), "MMM, do, yyyy")}
                </div>
              </Comment.Metadata>
              <Comment.Text>{comment.text}</Comment.Text>
              {comment.image && (
                <Image
                  size="tiny"
                  src={comment.image}
                  rounded
                  onClick={openModal}
                />
              )}
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Fragment>
  );
};

export default Comments;
