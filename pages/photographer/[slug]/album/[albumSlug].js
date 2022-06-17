import React from "react";
import { getAlbumBySlug } from '../../../../lib/api'
import Layout from '../../../../components/layout'

const Album = ({ album, preview }) => {
  console.log('album', album)
  const { albumName } = album
  return (
    <Layout>
      <div>
      {albumName}
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