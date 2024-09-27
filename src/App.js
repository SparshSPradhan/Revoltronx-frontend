import React, { useState , useEffect } from 'react';
import axios from 'axios';

const SearchApp = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');  // State to store the current filter
  const [results, setResults] = useState({ youtube: [], articles: [], papers: [] });

  useEffect(() => {
    if (query === '') return; // Do not make API call if query is empty

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/search', {
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

    fetchData();
  }, [filter]); 


  // Function to handle search and apply filters
  const handleSearch = async () => {
    console.log("SEARCH called with filter: ", filter)
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: {
          q: query,
          filter: filter,  // Send filter to the backend
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  return (
    <div style={{ margin: '20px' }}>
      <h1>Search Application</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for videos, articles, or papers"
        style={{ padding: '10px', width: '80%' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px', marginLeft: '10px' }}>
        Search
      </button>

      {/* Filter Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => { setFilter('youtube');  }}>YouTube</button>
        <button onClick={() => { setFilter('articles');  }}>Articles</button>
        <button onClick={() => { setFilter('papers');  }}>Papers</button>
        <button onClick={() => { setFilter(''); }}>All</button> {/* Reset Filter */}
      </div>

      {/* Display YouTube Results */}
      <div>
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
      </div>

      {/* Display Articles Results */}
      <div>
        {filter === 'articles' || filter === '' ? (
          <div>
            <h3>Articles & Blogs</h3>
            {results.articles.map((article) => (
              <div key={article.link}>
                <a href={article.link} target="_blank" rel="noreferrer">{article.title}</a>
                <p>{article.snippet}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Display Academic Papers */}
      <div>
        {filter === 'papers' || filter === '' ? (
          <div>
            <h3>Academic Papers</h3>
            {results.papers.map((paper) => (
              <div key={paper.link}>
                <a href={paper.link} target="_blank" rel="noreferrer">{paper.title}</a>
                <p>{paper.authors}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchApp;
