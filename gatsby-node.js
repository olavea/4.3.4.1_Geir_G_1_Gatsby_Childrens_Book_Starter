const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      query GeirGQuery {
        allFile(sort: { order: ASC, fields: [name] }) {
          edges {
            node {
              name
            }
          }
        }
      }
    `).then(results => {
      results.data.allFile.edges.forEach(({ node }) => {
        createPage({
          path: `/${node.name}`,
          component: path.resolve("./src/templates/bookPageLayout.js"),
          context: {
            slug: node.name,
          },
        });
      });
      resolve();
    });
  });
};
