import React from 'react'

import styles from './album-grid.module.scss'

const AlbumGrid = ({albums}) => {
  return (
    <div className={styles.album_grid_wrapper}>
      {albums.map(album => {
        const { albumName, thumbnail} = album
        return (
          <div className={styles.album_wrapper}>
            <div className={styles.album_name}>{albumName}</div>
            <img src={thumbnail.url} alt={albumName} />
          </div>
        )
      })}
    </div>
  )
}

export default AlbumGrid