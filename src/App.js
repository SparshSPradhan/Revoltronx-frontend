import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import your App.css file here

const SearchApp = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState({ youtube: [], articles: [], papers: [] });

const fetchData = async () => {
  try {
    const response = await axios.get(`https://revoltronx-backend.vercel.app/search`, {
      params: {
        q: query,
        filter: filter,  // Send filter to the backend
      },
    });
    setResults(response.data);  // Update results state
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

  // Effect to handle API call once the filter or query changes
  useEffect(() => {
    if (query === '') return; // Do not make API call if query is empty

    fetchData();
  }, [ filter]);  // Re-run this effect whenever `filter` changes

  const handleSearch = () => {
    // Trigger the search
    fetchData();
  };

  return (
    <div className="search-container">
      <h1>Search Application</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for videos, articles, or papers"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('youtube')}>YouTube</button>
        <button onClick={() => setFilter('articles')}>Articles</button>
        <button onClick={() => setFilter('papers')}>Papers</button>
        <button onClick={() => setFilter('')}>All</button>
      </div>

      {/* Display Results */}
      <div className="results-container">
        {filter === 'youtube' || filter === '' ? (
          <div>
            <h3>YouTube Results</h3>
            {results.youtube.map((video) => (
              <div key={video.url}>
                <a href={video.url} target="_blank" rel="noreferrer">{video.title}</a>
                <p>{video.description}</p>
                <p>{video.views} views | {video.likes} likes</p>
              </div>
            ))}
          </div>
        ) : null}

        {filter === 'articles' || filter === '' ? (
          <div>
            <h3>Article Results</h3>
            {results.articles.map((article) => (
              <div key={article.url}>
                <a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
                <p>{article.snippet}</p>
              </div>
            ))}
          </div>
        ) : null}

        {filter === 'papers' || filter === '' ? (
          <div>
            <h3>Academic Papers</h3>
            {results.papers.map((paper) => (
              <div key={paper.url}>
                <a href={paper.url} target="_blank" rel="noreferrer">{paper.title}</a>
                <p>{paper.snippet}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchApp;
