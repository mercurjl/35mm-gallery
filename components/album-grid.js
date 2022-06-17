import React from 'react'
import Link from 'next/link'
import styles from './album-grid.module.scss'

const AlbumGrid = ({ photographerSlug, albums }) => {
  return (
    <div className={styles.album_grid_wrapper}>
      {albums.map(album => {
        const { albumName, thumbnail, slug } = album
        return (
          <Link href={`photographer/${photographerSlug}/album/${slug}`}>
            <div className={styles.album_wrapper}>
              <div className={styles.album_name}>{albumName}</div>
              <img src={thumbnail.url} alt={albumName} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default AlbumGrid