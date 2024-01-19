import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

const ErrorCard = ({ errorTitle, errorMessage }) => {
  return (
    <Card bg="danger" className="error-card-container">
      <Card.Body>
        <Card.Title>{errorTitle}</Card.Title>
        <Card.Text>{errorMessage}</Card.Text>
      </Card.Body>
    </Card>
  );
};

ErrorCard.propTypes = {
  errorTitle: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorCard;
