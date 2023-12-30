import { getData, getMediaType } from "../api/api";

const processItems = (items) => {
    // Map and transform the data into a more usable format
    return items.map((item) => {
        // Destructure relevant properties from the item data
        const { title, description, media_type: mediaType, href } = item.data[0];

        // Determine the URL based on media type (image or video)
        const url = (mediaType === 'image' || mediaType === 'video') && item.links?.[0]?.href || null;

        // Return an object with relevant properties
        return { title, description, mediaType, href, ...(url && { url }) };
    });
};

// Common function to fetch and process data based on a query
const fetchData = async (query, fetchFunction) => {
    try {
        // Fetch data using the provided function
        const data = await fetchFunction(query);

        // Verify the presence of data.collection.items
        if (!data.collection.items) {
            return [];
        }

        // Process and return the items
        return processItems(data.collection.items);
    } catch (error) {
        // Handle any errors during data fetching or processing
        console.error(`Error during data fetching or processing: ${error.message}`);
        return [];
    }
};

export const searchByQuery = async (query) => {
    return fetchData(query, getData);
};

export const searchByMediaType = async (mediaType) => {
    return fetchData(mediaType, getMediaType);
};

// Function to sort items based on their title
export const sortByTitle = (items, sortOrder = 'asc') => {
    // Create a shallow copy of the items array
    const sortedItems = [...items];

    // Sort the items based on the title and sortOrder
    return sortedItems.sort((a, b) => {
        const compareResult = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? compareResult : -compareResult;
    });
};