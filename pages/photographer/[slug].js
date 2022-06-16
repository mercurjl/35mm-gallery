import React from "react";
import { getPhotographerBySlug } from '../../lib/api'
import Layout from '../../components/layout'

const Photographer = ({ photographer, preview }) => {

  return (
    <Layout>
      <div>
        {photographer?.name}
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