import { useState, useEffect } from 'react';
import { getResult, sortByTitle } from '../controllers/HomeController';
import Media from '../components/Media';
import '../App.css';

function Home() {

    // Local states to store the query, results, and sorting order
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    // Asynchronous function to fetch results and update the state
    const fetchData = async () => {
        if (query) {
            const items = await getResult(query);
            const sortedItems = sortByTitle(items, sortOrder);
            setResult(sortedItems);
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
        if (query) {
            const items = await getResult(query);
            setResult(items);
        }
    };

    // Handle changes in the sorting order selection
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        fetchData();
    };

    // Side effect to fetch results when the query or sorting order changes
    useEffect(() => {
        fetchData();
    }, [query, sortOrder]);

    return (
        <>
            <main>
                <header>
                    <form onSubmit={handleSearch}>
                        <input
                            type="search"
                            value={query}
                            placeholder="Search"
                            onChange={handleQuery}
                        />
                        <button type='submit'>
                            Search
                        </button>
                    </form>
                </header>
                {result.length > 0 && (
                    <aside>
                        <section>
                            <label htmlFor="sortOrder">Sort by name </label>
                            <select
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </section>
                    </aside>)}
                <section>
                    {
                        result.map((element, index) => {
                            // Render media components with data from the result
                            return <Media key={index} item={element} />;
                        })
                    }
                </section>
            </main>
        </>
    );
}

export default Home;