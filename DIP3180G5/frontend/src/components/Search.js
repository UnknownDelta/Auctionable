import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions

  const handleChange = async (e) => {
    const newSearchTerm = e.target.value;
    console.log("newSearchTerm = " + newSearchTerm);
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);
    // Fetch autocomplete suggestions here and update 'suggestions' state
    // if (newSearchTerm.trim() === '') {
    //   setSuggestions([]); // Clear suggestions when the input is empty
    // } else {
    //   await fetchAutocompleteSuggestions(newSearchTerm);
    // }
  };
  // Search button
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  // whether comment or uncomment this part makes no difference
  // Fetch autocomplete suggestions based on the current search term
  // const fetchAutocompleteSuggestions = async (term) => {
  //   // You can send an API request to your backend to fetch autocomplete suggestions'
  //   console.log("this is term in Search.js: ", term);
  //   try {
  //     const response = await fetch(`/api/items/search?q=${term}`);
  //     const data = await response.json();
  //     console.log("response data:", data); // Log the response data
  //     console.log("response data results:", data.results); // Log the response data results

  //     if (response.ok) {
  //       console.log('data: ',data.results)
  //       setSuggestions(data.results); // Update 'suggestions' state with the fetched suggestions
  //     }
  //   } catch (error) {
  //     console.error('Error fetching autocomplete suggestions:', error);
  //   }
  // };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {/* Display autocomplete suggestions in a dropdown */}
      <div className="autocomplete-dropdown">
        {suggestions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(suggestion);
                  setSuggestions([]); // Clear suggestions and set the selected suggestion as the search term
                  handleSearch(suggestion); // Trigger a search with the selected suggestion
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;