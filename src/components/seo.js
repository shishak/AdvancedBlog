import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ meta, title, description, lang }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          title
          description
        }
      }
    }
  `);
  const metaDescription = description || site.siteMetadata.description;
  return(
  <Helmet htmlAttributes={{ lang }} title={ title } titleTemplate={ `%s ${ site.siteMetadata.title }` } meta={[
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata.author
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    }
  ].concat(meta) } />
  );
}
SEO.defaultProps = {
  meta: [],
  description: '',
  lang: 'en'
}
SEO.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string
}
export default SEO;