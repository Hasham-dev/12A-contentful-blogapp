import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishDate(formatString: "DD MMMM, YYYY")
              featuredImage {
                fluid(maxWidth: 750) {
                  ...GatsbyContentfulFluid
                }
              }
              excerpt {
                childMarkdownRemark {
                  excerpt(pruneLength: 150)
                }
              }
            }
          }
        }
      }
    `
  )
  const [user] = useState(false)
  return (
    <Layout>
      <SEO title="Blog" />
      <p className="center">
        <Link to="/" className="Link center">Go back to the Homepage</Link>
      </p>
      <ul className="posts">
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className="post" key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
              <div className="meta">
                <span>Posted on {edge.node.publishDate}</span>
              </div>
              {edge.node.featuredImage && (
                <Img
                  className="featured"
                  fluid={edge.node.featuredImage.fluid}
                  alt={edge.node.title}
                />
              )}
              <p className="excerpt">
                {edge.node.excerpt.childMarkdownRemark.excerpt}
              </p>
              <div className="button">
                {user?<>
                  <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
                </>:<Link to={`/blog/${edge.node.slug}/`}>Login to Read More</Link>}
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog