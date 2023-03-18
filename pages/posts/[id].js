import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { MDXRemote } from 'next-mdx-remote'
import { CH } from '@code-hike/mdx/components'
import Link from 'next/link'

const components = { CH }

export default function Post({ props }) {
  return (
    <Layout>
      <Head>
        <title>{props.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{props.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={props.date} />
        </div>
        <div>
          <MDXRemote {...props.source} components={components} />
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: postData
  }
  
}
