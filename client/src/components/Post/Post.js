import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import PostItem from '../Posts/Post';
import CommentForm from '../Forms/Post/CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/postsActions';

const Post = ({ getPost, posts: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPost })(Post);