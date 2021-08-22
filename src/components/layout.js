import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)

  const twitter = data.site.siteMetadata.social.twitter

  return (
    // <div className='outer'>
    <div className="layout " data-is-root-path={isRootPath}>
      <header className="site-header container">
        <div className="logo">
          <Link to="/">Juneate</Link>
        </div>
      </header>
      <main className="site-main container">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <p>Copyright © {new Date().getFullYear()}, Rocco Panacci.</p>
          <ul>
            <li><a href={`http://twitter.com/${twitter}`}>{`@${twitter}`}</a></li>
          </ul>
        </div>
      </footer>
    </div>
    // </div>
  )
}

export default Layout
