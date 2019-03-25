/* eslint-disable no-console */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { getPages, getConfig } = require('./src/modules/contentful.api');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;
	const page_template = path.resolve('src/templates/fullpage.js');
	return getConfig().then(config => {
		const current_index = config.items[0].fields.currentPageIndex;

		return getPages().then(all_pages => {
				//_ create a lesson index page
				all_pages.items.forEach(item => {
					const page = item.fields;
					//_ create the main page
					if (page.index === current_index) {
						createPage({
							path : '/pages/current',
							component : page_template,
							context : { page }
						})
					}

					//_ create individual lesson pages with /pages/<page_num> route
					createPage({
						path: `/pages/${page.index}`,
						component: page_template,
						context: { page }
					})
				});
				return;
			})
		})
}
