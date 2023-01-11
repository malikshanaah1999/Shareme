// It is used to connect the front-end with the back-end(Sanity)....
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
export const client = sanityClient({
    projectId: 'p25t5w5t',
    dataset:'production',
    apiVersion: '2021-11-16',
    useCdn: 'true', // this allows us to more quickly show the images to people around the world
    token:'skIFbfLqFmpr4oh9SGkHRlk6tXwcPIlk6DjDlsmdW9KT0ZiUCpStTSzo1kYUzworzAlN0UeJQ052wYZ8ZWmRtHgreUSuhWFSuXYoOsoEQ9jPjn4tPPiVMDfrGFCxhIX6UYbd5xSrciNlrUJzVSlc16SBs1MliuVBLj1aAagV52Z44U3NUUaS'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source)=> builder.image(source)
//
