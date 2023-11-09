import React, { useState, useEffect } from 'react';
import { app } from '../firebase';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

export const BreweryDetails = ({ brewery }) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user] = useAuthState(auth);

const reviewRef = collection(db, "reviews");

const breweryReviewsQuery = query(
    reviewRef,
    where('breweryId', '==', brewery.id) // Assuming 'brewery' contains the details of the selected brewery
  );

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(breweryReviewsQuery);
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push(doc.data());
      });
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [brewery.id]);


const addReview = async () => {
    const reviewData = {
        rating: reviewRating,
        description: reviewDescription,
        userId: user.uid, // Replace with the user's actual ID (obtained after login)
        timestamp: new Date(),
        breweryId: brewery.id, // Assuming 'brewery' contains the details of the selected brewery
      };
  
    try {
        await addDoc(reviewRef, reviewData); 
      // Update the reviews state to display the new review immediately
      setReviews([...reviews, reviewData]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
};
  

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            Rating:{user.displayName} {review.rating} - {review.description}
          </li>
        ))}
      </ul>
      <h2>Add a Review</h2>
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={reviewRating}
        onChange={(e) => setReviewRating(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={reviewDescription}
        onChange={(e) => setReviewDescription(e.target.value)}
      />
      <button onClick={addReview}>Submit Review</button>
    </div>
  );
};
