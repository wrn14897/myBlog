import * as adapter from '@astrojs/netlify/netlify-functions.js';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server';
import { i as server_default, j as deserializeManifest } from './chunks/astro.9fc5ede5.mjs';
import { _ as _page0, a as _page1, b as _page2, c as _page3, d as _page4 } from './chunks/pages/all.107e85f3.mjs';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'html-escaper';
import 'string-width';
import 'react-terminal-ui';
import 'react/jsx-runtime';
import '@astrojs/rss';
/* empty css                                 *//* empty css                                     *//* empty css                                                                          *//* empty css                                     *//* empty css                                     */
/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const contexts = new WeakMap();

const ID_PREFIX = 'r';

function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) {
		return contexts.get(rendererContextResult);
	}
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		},
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}

function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
	return (
		err.message &&
		(err.message.startsWith("Cannot read property '__H'") ||
			err.message.includes("(reading '__H')"))
	);
}

async function check(Component, props, children) {
	// Note: there are packages that do some unholy things to create "components".
	// Checking the $$typeof property catches most of these patterns.
	if (typeof Component === 'object') {
		const $$typeof = Component['$$typeof'];
		return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
	}
	if (typeof Component !== 'function') return false;

	if (Component.prototype != null && typeof Component.prototype.render === 'function') {
		return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	}

	let error = null;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && vnode['$$typeof'] === reactTypeof) {
				isReactComponent = true;
			}
		} catch (err) {
			if (!errorIsComingFromPreactComponent(err)) {
				error = err;
			}
		}

		return React.createElement('div');
	}

	await renderToStaticMarkup(Tester, props, children, {});

	if (error) {
		throw error;
	}
	return isReactComponent;
}

async function getNodeWritable() {
	let nodeStreamBuiltinModuleName = 'stream';
	let { Writable } = await import(/* @vite-ignore */ nodeStreamBuiltinModuleName);
	return Writable;
}

async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	let prefix;
	if (this && this.result) {
		prefix = incrementId(this.result);
	}
	const attrs = { prefix };

	delete props['class'];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = {
		...props,
		...slots,
	};
	const newChildren = children ?? props.children;
	if (newChildren != null) {
		newProps.children = React.createElement(StaticHtml, { value: newChildren });
	}
	const vnode = React.createElement(Component, newProps);
	const renderOptions = {
		identifierPrefix: prefix,
	};
	let html;
	if (metadata && metadata.hydrate) {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode, renderOptions);
		} else {
			html = await renderToPipeableStreamAsync(vnode, renderOptions);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode, renderOptions);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode, renderOptions);
		}
	}
	return { html, attrs };
}

async function renderToPipeableStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			...options,
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(
					new Writable({
						write(chunk, _encoding, callback) {
							html += chunk.toString('utf-8');
							callback();
						},
						destroy() {
							resolve(html);
						},
					})
				);
			},
		});
	});
}

async function renderToStaticNodeStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode, options);
		stream.on('error', (err) => {
			reject(err);
		});
		stream.pipe(
			new Writable({
				write(chunk, _encoding, callback) {
					html += chunk.toString('utf-8');
					callback();
				},
				destroy() {
					resolve(html);
				},
			})
		);
	});
}

/**
 * Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
 * See https://github.com/facebook/react/issues/24169
 */
async function readResult(stream) {
	const reader = stream.getReader();
	let result = '';
	const decoder = new TextDecoder('utf-8');
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) {
				result += decoder.decode(value);
			} else {
				// This closes the decoder
				decoder.decode(new Uint8Array());
			}

			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}

async function renderToReadableStreamAsync(vnode, options) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}

const _renderer1 = {
	check,
	renderToStaticMarkup,
};

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/rss.xml.js", _page1],["src/pages/about.astro", _page2],["src/pages/blog/index.astro", _page3],["src/pages/blog/[...slug].astro", _page4],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...slug_.09001ac1.css"},{"type":"external","src":"/_astro/HeaderLink.astro_astro_type_style_index_0_lang.28ee6213.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...slug_.09001ac1.css"},{"type":"external","src":"/_astro/HeaderLink.astro_astro_type_style_index_0_lang.28ee6213.css"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...slug_.09001ac1.css"},{"type":"external","src":"/_astro/_...slug_.5bc248e3.css"},{"type":"external","src":"/_astro/HeaderLink.astro_astro_type_style_index_0_lang.28ee6213.css"},{"type":"external","src":"/_astro/index.3cb4ed4e.css"}],"routeData":{"route":"/blog","type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...slug_.09001ac1.css"},{"type":"external","src":"/_astro/_...slug_.5bc248e3.css"},{"type":"external","src":"/_astro/_...slug_.26bc61b1.css"},{"type":"external","src":"/_astro/HeaderLink.astro_astro_type_style_index_0_lang.28ee6213.css"}],"routeData":{"route":"/blog/[...slug]","type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/blog/[...slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"site":"https://warrencodes.com","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["/Users/warren/Codes/myBlog/src/pages/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/warren/Codes/myBlog/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astrojs-pages-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/warren/Codes/myBlog/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/warren/Codes/myBlog/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["/Users/warren/Codes/myBlog/src/pages/about.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","/Users/warren/Codes/myBlog/src/content/blog/first-post.md?astroContent=true":"chunks/first-post.95c06c90.mjs","/Users/warren/Codes/myBlog/src/content/blog/markdown-style-guide.md?astroContent=true":"chunks/markdown-style-guide.464aea65.mjs","/Users/warren/Codes/myBlog/src/content/blog/second-post.md?astroContent=true":"chunks/second-post.643541d1.mjs","/Users/warren/Codes/myBlog/src/content/blog/third-post.md?astroContent=true":"chunks/third-post.f53d49ae.mjs","/Users/warren/Codes/myBlog/src/content/blog/using-mdx.mdx?astroContent=true":"chunks/using-mdx.0ac46a0a.mjs","/Users/warren/Codes/myBlog/src/content/blog/first-post.md?astroPropagatedAssets=true":"chunks/first-post.8e760701.mjs","/Users/warren/Codes/myBlog/src/content/blog/markdown-style-guide.md?astroPropagatedAssets=true":"chunks/markdown-style-guide.0e42cb1e.mjs","/Users/warren/Codes/myBlog/src/content/blog/second-post.md?astroPropagatedAssets=true":"chunks/second-post.2bbf0e22.mjs","/Users/warren/Codes/myBlog/src/content/blog/third-post.md?astroPropagatedAssets=true":"chunks/third-post.43da6f0f.mjs","/Users/warren/Codes/myBlog/src/content/blog/using-mdx.mdx?astroPropagatedAssets=true":"chunks/using-mdx.a0724f47.mjs","/Users/warren/Codes/myBlog/src/content/blog/first-post.md":"chunks/first-post.7b4ab330.mjs","/Users/warren/Codes/myBlog/src/content/blog/markdown-style-guide.md":"chunks/markdown-style-guide.3b8ed9be.mjs","/Users/warren/Codes/myBlog/src/content/blog/second-post.md":"chunks/second-post.93a533d3.mjs","/Users/warren/Codes/myBlog/src/content/blog/third-post.md":"chunks/third-post.0ddc15e4.mjs","/Users/warren/Codes/myBlog/src/content/blog/using-mdx.mdx":"chunks/using-mdx.4ccc80ec.mjs","/Users/warren/Codes/myBlog/src/components/Term.tsx":"_astro/Term.4697a50c.js","@astrojs/react/client.js":"_astro/client.168c3028.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/HeaderLink.astro_astro_type_style_index_0_lang.28ee6213.css","/_astro/_...slug_.26bc61b1.css","/_astro/_...slug_.5bc248e3.css","/_astro/_...slug_.09001ac1.css","/_astro/index.3cb4ed4e.css","/favicon.png","/favicon.svg","/mudo.jpg","/placeholder-about.jpg","/placeholder-hero.jpg","/placeholder-social.jpg","/_astro/Term.4697a50c.js","/_astro/client.168c3028.js","/_astro/index.5d85b36e.js"]}), {
	pageMap: pageMap,
	renderers: renderers,
	
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
