import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPhotographersForHome } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import PhotographersGrid from '../components/photographers-grid'

export default function Index({ preview, allPhotographers }) {
  return (
    <>
      <Layout preview={preview} alertMessage={''}>
        <Head>
          <title>35mm - Gallery</title>
        </Head>
        <Intro />
        <PhotographersGrid photographers={allPhotographers} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPhotographers = (await getAllPhotographersForHome(preview)) ?? []
  return {
    props: { preview, allPhotographers },
  }
}
