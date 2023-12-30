import Image from './Image'

// Functional component to display media information
function Media({ item: { title, description, mediaType, href, url } }) {
    // Conditionally render Image component based on media type
    const mediaComponent = mediaType !== 'audio' ? <Image imgUrl={url} imgDescription={description} /> : null;

    // Render media information
    return (

        <article>
            <header>
                <h2>{title}</h2>
                <p>{mediaType}</p>
            </header>
            <section>
                <p>{description}</p>
                <p>{href}</p>
                {mediaComponent}
            </section>
        </article>

    );
}

export default Media;