import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const sanityClient = createClient({
  projectId: 'dins739t',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source);
export default sanityClient;
