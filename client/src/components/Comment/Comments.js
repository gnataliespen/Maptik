import React, { Fragment, useContext } from "react";
import {
  CommentAvatar,
  Comment,
  Divider,
  Image,
  Icon
} from "semantic-ui-react";
import { format } from "date-fns";

import Context from "../../state/Context";

const Comments = ({ comments, openModal, deleteComment }) => {
  const {
    state: { currentUser, currentPin }
  } = useContext(Context);

  const handleDelete = comment => {
    deleteComment({ comment, pinId: currentPin._id });
  };

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
              <Comment.Author as="h4" className="comment-author">
                {console.log(comment.author)}

                {comment.author ? comment.author.name : "Anonymous"}
                {comment.author &&
                  currentUser &&
                  comment.author._id === currentUser._id && (
                    <Icon
                      name="trash"
                      color="red"
                      onClick={() => handleDelete(comment)}
                    />
                  )}
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
