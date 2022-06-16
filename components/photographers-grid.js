import React from 'react'

import styles from './photographers-grid.module.scss'

const PhotographersGrid = ({ photographers }) => {

  return (
    <div className={styles.photographers_grid_wrapper}>
      <h2 className='md:text-4xl'>Checkout our photographers</h2>
      {photographers.map((photographer, index) => {
        return (
          <div className={styles.photographer_card} key={index}>

            {photographer.profilePicture &&
              <img src={photographer.profilePicture.url} alt={photographer.profilePicture.title} />
            }
            <div>
              <p className='md:text-3xl font-bold'>{photographer.name}</p>
              <p>{photographer.bio}</p>
            </div>
            <div>
              {photographer.albumsCollection.items.map(album => {
                return <div>{album.albumName}</div>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PhotographersGrid