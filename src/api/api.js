export const getData = async (query) => {
    const querys = `https://images-api.nasa.gov/search?q=${query}`
    const response = await fetch(querys)
    const data= await response.json()
    return data
}

export const getMediaType = async (query) => {
    const querys = `https://images-api.nasa.gov/search?media_type=${query}`
    const response = await fetch(querys)
    const data= await response.json()
    return data 
}