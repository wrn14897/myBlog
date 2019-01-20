/* eslint no-unused-expressions:0 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { FaGithub, FaAngellist } from 'react-icons/fa';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import SEO from '../components/SEO';
import theme from '../../config/Theme';
import { media } from '../utils/media';

injectGlobal`
  ::selection {
    color: ${theme.bg};
    background: ${theme.primary};
  }
  body {
    background: ${theme.bg};
    color: ${theme.default};
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.dark};
    text-decoration: none;
    transition: all ${theme.transitionTime};
  }
  a:hover {
    color: ${theme.primary};
  }
  h1, h2, h3, h4 {
    color: ${theme.dark};
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.primary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  span {
    font-size: 0.75rem;
  }
`;

const Layout = props => {
  const { children } = props;
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            buildTime(formatString: "DD.MM.YYYY")
          }
        }
      `}
      render={data => (
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <SEO />
            {children}
            <ScrollUpButton />
            <Footer>
              &copy; 2019 by Warren. All rights reserved. <br />
              <div>
                <a href="https://angel.co/wrn14897-hotmail-com" target="__blank">
                  <FaAngellist />
                </a>
                {'   '}
                <a href="https://github.com/wrn14897" target="__blank">
                  <FaGithub />
                </a>
              </div>
              <span>Last build: {data.site.buildTime}</span>
            </Footer>;
          </React.Fragment>
        </ThemeProvider>
      )}
    />
  );
};

export default Layout;
