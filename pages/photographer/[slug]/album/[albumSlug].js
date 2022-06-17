import React from "react";
import { getAlbumBySlug } from '../../../../lib/api'
import Layout from '../../../../components/layout'

const Album = ({ album, preview }) => {
  const { albumName, photosCollection } = album
  return (
    <Layout>
      <div>
        <h1 className="text-7xl font-bold mb-4 border-black-500 border-b border-black">
          {albumName}
        </h1>
        <div className="mb-5">
          {photosCollection.items.map(photo => {
            return (
              <img className="mb-5 max-w-[1140px]" src={photo.url} alt={photo.title} />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Album

export async function getServerSideProps({ params, preview = false }) {
  const data = await getAlbumBySlug(params.albumSlug, preview)
  return {
    props: {
      preview,
      album: data[0] ?? null,
    },
  }
}