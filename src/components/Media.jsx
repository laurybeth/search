import Image from './Image'

// Functional component to display media information
function Media({ item: { title, description, mediaType, href, url } }) {
    // Conditionally render Image component based on media type
    const mediaComponent = mediaType !== 'audio' ? <Image imgUrl={url} imgDescription={description} /> : null;

    // Render media information
    return (
        <>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{href}</p>
            <small>{mediaType}</small>
            {mediaComponent}
        </>
    );
}

export default Media;