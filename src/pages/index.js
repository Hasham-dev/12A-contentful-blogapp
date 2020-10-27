import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../images/gatsby-astronaut.png"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to my personal portfolio.</p>
    <p>Here you can find the list of the things which i have covered yet in my <b>
      Web Development </b> 
        carrier.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <img src={Image} className="image" alt={Image}/>
      {/* <Image /> */}
    </div>
    <Link to="/blog/" className="Link">Go to Blog Page</Link> <br />
  </Layout>
)

export default IndexPage
