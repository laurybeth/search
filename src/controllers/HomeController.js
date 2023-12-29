import { getData } from "../api/api";

// Function to fetch and process data based on a query
export const getResult = async (query) => {
    // Fetch data using the provided query
    const data = await getData(query);

    // Map and transform the data into a more usable format
    const items = data.collection.items.map((item) => {
        // Destructure relevant properties from the item data
        const { title, description, media_type: mediaType, href } = item.data[0];

        // Determine the URL based on media type (image or video)
        const url = (mediaType === 'image' || mediaType === 'video') && item.links?.[0]?.href || null;

        // Return an object with relevant properties
        return { title, description, mediaType, href, ...(url && { url }) };
    });

    return items;
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