import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const SearchBar = ({ handleSubmit }) => {
  return (
    <Form className="search-bar-container" onSubmit={handleSubmit}>
      <InputGroup>
        <FloatingLabel controlId="city-label" label="City">
          <Form.Control
            className="search-bar-input"
            name="city"
            placeholder="City"
          />
        </FloatingLabel>
        <FloatingLabel controlId="country-label" label="Country">
          <Form.Control
            className="search-bar-input"
            name="country"
            placeholder="Country"
          />
        </FloatingLabel>
      </InputGroup>
      <Button className="search-bar-button" type="submit">
        <FaSearch className="search-bar-button-icon" />
      </Button>
      <Button className="search-bar-button" type="reset">
        <FaDeleteLeft className="search-bar-button-icon" />
      </Button>
    </Form>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
