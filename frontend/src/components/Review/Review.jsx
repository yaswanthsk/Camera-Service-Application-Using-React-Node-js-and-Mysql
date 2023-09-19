import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Review.css';
const ReviewPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thankyou');
  };

  return (
    <div className="review-page vh-100">
      <h1>Camera Service Center Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Stars<span className="star-symbol" />
        </label>
        <select>
            <option value={0}>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        <br />
        <label>
          Comment:
        </label>
        <textarea placeholder="Please share your experience..." />
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewPage;






















/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Review.css';

const MAX_RATING = 5;

const StarRating = ({ rating, onRatingChange }) => {
  const stars = Array.from({ length: MAX_RATING }, (_, index) => index + 1);

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'active' : ''}`}
          onClick={() => onRatingChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const ReviewPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thankyou');
  };

  return (
    <div className="review-page vh-100">
      <h1>Camera Service Center Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rating: <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            placeholder="Please share your experience..."
            value={comment}
            onChange={handleCommentChange}
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewPage;
*/
