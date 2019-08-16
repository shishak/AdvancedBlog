import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';

const Howto = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMarkdownRemark;
  return(
  <Layout>
    <SEO title='How To |' />
    <div className='BannerStyle'>
      <h1>How To</h1>
    </div>
    <Sidebar />
    <div className='CardStyle'>
      <div className='wrapper'>
        {posts.map(({ node: post }) => (<div className='card'>
          <Img fluid={ post.frontmatter.cover.childImageSharp.fluid } alt={ post.frontmatter.title } className='cardImage' />
          <div className='dis'>
            <Link to={ post.fields.slug } name={ post.frontmatter.title } title={ post.frontmatter.title }>{ post.frontmatter.title }</Link>
            <p>{ post.excerpt }</p>
            <div className='tagBar'>
              <span>{ post.fields.readingTime.text }</span>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  </Layout>
  );
}
Howto.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object
  })
}
export default Howto;
export const howtoQuery = graphql`
  query HowtoQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] } filter: { frontmatter: { type: { eq: "howto" }}}) {
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            type
            date(formatString: "MM / DD / YY")
            cover {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
          }
        }
      }
    }
  }
`