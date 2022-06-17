import React from 'react'
import AlbumGrid from './album-grid'
import Link from 'next/link'

import styles from './photographers-grid.module.scss'

const PhotographersGrid = ({ photographers }) => {

  return (
    <div className={styles.photographers_grid_wrapper}>
      <h2 className='md:text-4xl'>Checkout our photographers</h2>
      {photographers.map((photographer, index) => {
        return (
          <div className={styles.photographer_card} key={index}>
            {photographer.profilePicture &&
              <Link href={`/photographer/${photographer.slug}`}>
                <img className={styles.profile_picture} src={photographer.profilePicture.url} alt={photographer.profilePicture.title} />
              </Link>
            }
            <div className={styles.info_albums_wrapper}>
              <div>
                <p className='md:text-3xl font-bold'>{photographer.name}</p>
                <p className='pl-5'>{photographer.bio}</p>
              </div>
              <AlbumGrid photographerSlug={photographer.slug} albums={photographer.albumsCollection.items} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PhotographersGrid