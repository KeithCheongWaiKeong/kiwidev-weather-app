import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { formatDate } from "../utils/StringFormatUtils";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SearchHistory = ({ searchHistory, searchWeather, removeHistory }) => {
  return (
    <div className="search-history-container">
      <div className="search-history-title-container">
        <h6 className="search-history-title">Search History</h6>
        <Button
          className="history-button"
          variant="light"
          type="button"
          onClick={() => removeHistory(-1)}
        >
          <MdDelete className="history-button-icon" />
        </Button>
      </div>
      {searchHistory && (
        <div className="search-history-list">
          {searchHistory.map((history, index) => (
            <div className="history-container" key={index}>
              <h6>{`${history.country.name}, ${history.country.code}`}</h6>
              <div className="history-date-button-container">
                <h6>{formatDate(history.time)}</h6>
                <Button
                  className="history-button"
                  variant="light"
                  type="button"
                  onClick={() =>
                    searchWeather([history.country.name, history.country.code])
                  }
                >
                  <FaSearch className="history-button-icon" />
                </Button>
                <Button
                  className="history-button"
                  variant="light"
                  type="button"
                  onClick={() => removeHistory(index)}
                >
                  <MdDelete className="history-button-icon" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchHistory.propTypes = {
  searchHistory: PropTypes.object.isRequired,
  searchWeather: PropTypes.func.isRequired,
  removeHistory: PropTypes.func.isRequired,
};

export default SearchHistory;
