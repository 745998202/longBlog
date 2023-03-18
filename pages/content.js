import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { remarkCodeHike } from "@code-hike/mdx"
import { CH } from '@code-hike/mdx/components'
import theme from "shiki/themes/material-default.json"
import fs from 'fs'
import path from 'path'

const components = { CH }

export default function TestPage({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={components} />
    </div>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const fileNames = fs.readdirSync('pages/articles')
  const file_1 = fs.readFileSync(path.join('pages/articles',fileNames[0]))
  const source = file_1
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [[remarkCodeHike, { autoImport: false, theme }]],
      useDynamicImport: true,
    },
  })
  return { props: { source: mdxSource } }
}