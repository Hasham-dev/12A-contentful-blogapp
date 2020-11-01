import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
// import firebase from '../config/firebase'
// import useFirebase from '../config/useFirebase';
import '../components/layout.css'
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
  // const firebase = useFirebase();

  // useEffect(() => {
  //  if (!firebase) return;
  //  return firebase.auth().onAuthStateChanged((user) => {
  //    console.log('User:', user);
  //  });
  // }, 
  // [firebase]);


  const [user] = useState(false)
  return (
    <Layout className="Layout">
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
                {user ? <>
                  <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
                </> : <Link to={`/blog/${edge.node.slug}/`} >Login to Read More</Link>}
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog



// import React, { Component } from 'react';

// class UserState extends Component {

//   constructor() {
//     super();
//     this.state = {
//       isLoggedIn: false
//     }
//   }

//   render() {
//     let message;
//     if(this.state.isLoggedIn) {
//       message = <div><h1>Welcome User</h1></div>
//     }else{
//       message = <div><h1>Welcome Guest</h1></div>
//     }

//     return(
//       <div>{message}</div>
//     )
//   }



// }

// export default UserState;