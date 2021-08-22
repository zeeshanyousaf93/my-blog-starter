import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
/*
  <article class="index-story">
    <header class="index-story-summary">
      <div class="category">Category</div>
      <h1><a href="story.html">This is a heading, then more text and just testing, okay?</a></h1>
      <div class="published"><time>May 20, 2021</time></div>
      <div class="published"><time>Last Updated: July 9, 2021</time></div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero atque eius pariatur officiis corrupti cupiditate aperiam id, voluptatem iusto hic autem impedit quas perferendis laborum nulla quo odit, sit ad! <a href="story.html">[ Keep reading ]</a></p>
    </header>
    <div class="index-story-img">
      <a href="story.html"><img src="https://images.unsplash.com/photo-1560472962-4388d184d933?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt=""></a>
    </div>
  </article>
*/

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <article key={post.fields.slug} className="index-story" itemScope itemType="http://schema.org/Article">
            <header className="index-story-summary">
              <div className="category">Category</div>
              <h1>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h1>
              <div class="published"><time>{post.frontmatter.date}</time></div>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
              />
              <Link to={post.fields.slug} itemProp="url">[ Keep reading ]</Link>
            </header>
            <div className="index-story-img">
              <Link to={post.fields.slug} itemProp="url">
                <img src={
                  post.frontmatter.image ||
                    "https://images.unsplash.com/photo-1560472962-4388d184d933?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                 } alt="" />
              </Link>
            </div>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          updated(formatString: "MMMM DD, YYYY")
          title
          description
          image
        }
      }
    }
  }
`
