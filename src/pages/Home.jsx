import { useState, useEffect } from 'react';
import { searchByMediaType, searchByQuery, sortByTitle } from '../controllers/HomeController';
import Media from '../components/Media';
import '../App.css';

function Home() {
  // Local states to store the query, results, and sorting order
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState(null);

  // Asynchronous function to fetch results and update the state
  const fetchData = async () => {
    if (query) {
      let items;

      // Determine if filtering by media type is required
      if (selectedMediaType) {
        items = await searchByMediaType([selectedMediaType]);
      } else {
        // Get results without media type filter
        items = await searchByQuery(query);
      }

      // Sort the results and update the state
      const sortedItems = sortByTitle(items, sortOrder);
      setResult(sortedItems);
      setShowFilters(true);
    }
  };

  // Handle changes in the search input
  const handleQuery = (e) => {
    const queryValue = e.target.value;
    setQuery(queryValue);
  };

  // Handle the search action
  const handleSearch = async (e) => {
    e.preventDefault();
    fetchData();
  };

  // Handle changes in the sorting order selection
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    fetchData();
  };

  // Handle changes in the media type selection
  const handleMediaTypeChange = (mediaType) => {
    if (mediaType === selectedMediaType) {
      // Unselect the media type if already selected
      setSelectedMediaType(null);
    } else {
      // Select the media type
      setSelectedMediaType(mediaType);
    }
  };

  // Fetch results when the query, sorting order, or media type changes
  useEffect(() => {
    fetchData();
  }, [query, sortOrder, selectedMediaType]);


  return (
    <>
      <main>
        <section>
          {/* Search form */}
          <form onSubmit={handleSearch}>
            <input
              type="search"
              value={query}
              placeholder="Search"
              onChange={handleQuery}
            />
            <button type="submit">Search</button>
          </form>
        </section>
        {/* Show filters and results if there are results */}
        {showFilters && result.length > 0 && (
          <aside>
            <section>
              {/* Sort order selection */}
              <label htmlFor="sortOrder">Sort by name </label>
              <select
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </section>
            <section>
              {/* Media type filters */}
              <label>Filter by Media Type:</label>
              <div>
                <input
                  type="checkbox"
                  id="filterVideo"
                  checked={selectedMediaType === 'video'}
                  onChange={() => handleMediaTypeChange('video')}
                />
                <label htmlFor="filterVideo">Video</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filterAudio"
                  checked={selectedMediaType === 'audio'}
                  onChange={() => handleMediaTypeChange('audio')}
                />
                <label htmlFor="filterAudio">Audio</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filterImage"
                  checked={selectedMediaType === 'image'}
                  onChange={() => handleMediaTypeChange('image')}
                />
                <label htmlFor="filterImage">Image</label>
              </div>
            </section>
          </aside>
        )}
        {/* Show results */}
        <section>
          {result.map((element, index) => (
            <Media key={index} item={element} />
          ))}
        </section>
      </main>
    </>
  );
}


export default Home;