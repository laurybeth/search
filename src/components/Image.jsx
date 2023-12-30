// Functional component to display an image
function Image({ imgUrl, imgDescription }) {
    // Render an image element with the provided URL and description
    return (
        <img
            src={imgUrl}         
            alt={imgDescription} 
        />
    );
}

export default Image;