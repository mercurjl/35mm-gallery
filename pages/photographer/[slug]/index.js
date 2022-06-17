import React from "react";
import { getPhotographerBySlug } from '../../../lib/api'
import Layout from '../../../components/layout'

import styles from './styles.module.scss'
import AlbumGrid from "../../../components/album-grid";

const Photographer = ({ photographer, preview }) => {
  const { name, profilePicture, albumsCollection, slug} = photographer
  return (
    <Layout>
      <div className="mt-12 flex flex-col">
        <div className={styles.name_picture}>
          <h1 className="text-7xl font-bold">
            {name}
          </h1>
          <img src={profilePicture.url} alt={name} />
        </div>
        <AlbumGrid photographerSlug={slug} albums={albumsCollection.items}/>
      </div>
    </Layout>
  )
}

export default Photographer

export async function getServerSideProps({ params, preview = false }) {
  const data = await getPhotographerBySlug(params.slug, preview)
  return {
    props: {
      preview,
      photographer: data[0] ?? null,
    },
  }
}