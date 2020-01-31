import React, {Component} from 'react'
import {Form} from 'react-bootstrap';
import {api} from '../API';

class Review extends Component {

    handleTrashClick = (e) => {
        var {
            refreshData
        } = this.props

        var reviewId = e
            .target
            .dataset
            .reviewid
            api
            .deleteReview(reviewId)
            .then(res => refreshData())
    }

    render() {

        var {
            review,
        } = this.props
        return (

	    <Form className="reviewForm">
			<h3>Product Review</h3>

			<Form.Group controlId="formGridFile">
				<Form.Label>Comment: {review.comment }
				</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGridFile">
				<Form.Label>
                    Rating:
                        {(() => {
                        switch (review.rating) {
                        case 1:   return "★";
                        case 2: return "★★";
                        case 3:  return "★★★";
                        case 4:  return "★★★★";
                        case 5:  return "★★★★★";
                        default:      return "";
                        }
                    })()}
				</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGridFile">
                <Form.Label>Review by: {review.user ? review.user.name : null}</Form.Label>
			</Form.Group>
		</Form>
        )
    }
}

export default Review;