const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`

const PHOTOGRAPHER_GRAPHQL_FIELDS = `
slug
name
bio
profilePicture {
  title
  description
  contentType
  fileName
  size
  url
  width
  height
}
albumsCollection(limit:10) {
  items {
    albumName
    slug
    thumbnail {
      url
    }
  }
}
`

const ALBUM_GRAPHQL_FIELDS = `
  albumName
  thumbnail {
    url
  }
  description {
    json
  }
  slug
  photosCollection {
    items {
      url
      title
      description
    }
  }
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPhotographerEntries(fetchResponse) {
  return fetchResponse?.data?.photographerCollection?.items
}

function extractAlbumEntries(fetchResponse) {
  return fetchResponse?.data?.albumCollection?.items
}

export async function getPhotographerBySlug(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      photographerCollection(where: { slug: "${slug}"} limit: 1) {
        items {
          ${PHOTOGRAPHER_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPhotographerEntries(entry)
}

export async function getAlbumBySlug(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      albumCollection(where: { slug: "${slug}"} limit: 1) {
        items {
          ${ALBUM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  console.log('entry', entry)
  return extractAlbumEntries(entry)
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPhotographersForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      photographerCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${PHOTOGRAPHER_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPhotographerEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}
