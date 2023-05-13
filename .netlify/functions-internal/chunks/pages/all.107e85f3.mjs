import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, m as maybeRenderHead, s as spreadAttributes, d as renderSlot, e as renderComponent, _ as __astro_tag_component__, f as renderHead, g as createCollectionToGlobResultMap, h as createGetCollection } from '../astro.9fc5ede5.mjs';
import { useState } from 'react';
import Terminal, { TerminalOutput, ColorMode, TerminalInput } from 'react-terminal-ui';
import { jsx } from 'react/jsx-runtime';
import rss from '@astrojs/rss';
/* empty css                           *//* empty css                               *//* empty css                                                                    *//* empty css                               *//* empty css                               */
const $$Astro$c = createAstro("https://warrencodes.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/placeholder-social.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.png">
<meta name="generator"${addAttribute(Astro2.generator, "content")}>

<!-- Canonical URL -->
<link rel="canonical"${addAttribute(canonicalURL, "href")}>

<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title"${addAttribute(title, "content")}>
<meta name="description"${addAttribute(description, "content")}>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url"${addAttribute(Astro2.url, "content")}>
<meta property="og:title"${addAttribute(title, "content")}>
<meta property="og:description"${addAttribute(description, "content")}>
<meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url"${addAttribute(Astro2.url, "content")}>
<meta property="twitter:title"${addAttribute(title, "content")}>
<meta property="twitter:description"${addAttribute(description, "content")}>
<meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "/Users/warren/Codes/myBlog/src/components/BaseHead.astro");

const $$Astro$b = createAstro("https://warrencodes.com");
const $$GitHubLogo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$GitHubLogo;
  /*! radix-icons | MIT License | https://icons.modulz.app/ */
  let {
    size,
    title,
    width = size,
    height = size,
    ...props
  } = {
    "fill": "CurrentColor",
    "fill-rule": "evenodd",
    "title": "GitHub Logo",
    "viewBox": "0 0 15 15",
    ...Astro2.props
  };
  const toAttributeSize = (size2) => String(size2).replace(/(?<=[0-9])x$/, "em");
  size = toAttributeSize(size);
  width = toAttributeSize(width);
  height = toAttributeSize(height);
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(width, "width")}${addAttribute(height, "height")}${spreadAttributes(props)}>${title ? renderTemplate`<title>${title}</title>` : ""}<path d="M7.5.85a6.65 6.65 0 0 0-2.102 12.96c.332.061.454-.144.454-.32 0-.159-.006-.576-.01-1.131-1.849.401-2.24-.892-2.24-.892-.302-.768-.738-.973-.738-.973-.604-.412.046-.404.046-.404.667.047 1.018.685 1.018.685.594 1.017 1.557.723 1.936.553.06-.43.232-.723.422-.889-1.477-.168-3.029-.738-3.029-3.287 0-.726.26-1.319.685-1.784-.069-.168-.297-.844.065-1.76 0 0 .558-.179 1.828.681.53-.147 1.1-.22 1.665-.223a6.394 6.394 0 0 1 1.665.223c1.27-.86 1.827-.68 1.827-.68.363.915.135 1.59.066 1.759.427.465.684 1.058.684 1.784 0 2.555-1.555 3.117-3.036 3.282.238.205.45.611.45 1.232 0 .888-.007 1.605-.007 1.823 0 .178.12.385.457.32A6.652 6.652 0 0 0 7.499.85Z"></path></svg>`;
}, "/Users/warren/Codes/myBlog/node_modules/@astropub/icons/dist/GitHubLogo.astro");

const $$Astro$a = createAstro("https://warrencodes.com");
const $$LightningBolt = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$LightningBolt;
  /*! radix-icons | MIT License | https://icons.modulz.app/ */
  let {
    size,
    title,
    width = size,
    height = size,
    ...props
  } = {
    "fill": "CurrentColor",
    "fill-rule": "evenodd",
    "title": "Lightning Bolt",
    "viewBox": "0 0 15 15",
    ...Astro2.props
  };
  const toAttributeSize = (size2) => String(size2).replace(/(?<=[0-9])x$/, "em");
  size = toAttributeSize(size);
  width = toAttributeSize(width);
  height = toAttributeSize(height);
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(width, "width")}${addAttribute(height, "height")}${spreadAttributes(props)}>${title ? renderTemplate`<title>${title}</title>` : ""}<path d="M8.697.04a.5.5 0 0 1 .296.542L8.09 6h4.41a.5.5 0 0 1 .4.8l-6 8a.5.5 0 0 1-.893-.382L6.91 9H2.5a.5.5 0 0 1-.4-.8l6-8a.5.5 0 0 1 .597-.16ZM3.5 8h4a.5.5 0 0 1 .493.582L7.33 12.56 11.5 7h-4a.5.5 0 0 1-.493-.582L7.67 2.44 3.5 8Z"></path></svg>`;
}, "/Users/warren/Codes/myBlog/node_modules/@astropub/icons/dist/LightningBolt.astro");

const $$Astro$9 = createAstro("https://warrencodes.com");
const $$Person = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Person;
  /*! radix-icons | MIT License | https://icons.modulz.app/ */
  let {
    size,
    title,
    width = size,
    height = size,
    ...props
  } = {
    "fill": "CurrentColor",
    "fill-rule": "evenodd",
    "title": "Person",
    "viewBox": "0 0 15 15",
    ...Astro2.props
  };
  const toAttributeSize = (size2) => String(size2).replace(/(?<=[0-9])x$/, "em");
  size = toAttributeSize(size);
  width = toAttributeSize(width);
  height = toAttributeSize(height);
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(width, "width")}${addAttribute(height, "height")}${spreadAttributes(props)}>${title ? renderTemplate`<title>${title}</title>` : ""}<path d="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875ZM4.825 4.5a2.675 2.675 0 1 1 5.35 0 2.675 2.675 0 0 1-5.35 0Z"></path></svg>`;
}, "/Users/warren/Codes/myBlog/node_modules/@astropub/icons/dist/Person.astro");

const $$Astro$8 = createAstro("https://warrencodes.com");
const $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute([[className, { active: isActive }], "astro-EIMMU3LG"], "class:list")}${spreadAttributes(props)}>
	${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/Users/warren/Codes/myBlog/src/components/HeaderLink.astro");

const SITE_TITLE = "Warren's Blog";
const SITE_DESCRIPTION = "Welcome to my website!";

const $$Astro$7 = createAstro("https://warrencodes.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header class="astro-3EF6KSR2">
	<h2 class="astro-3EF6KSR2">
		${SITE_TITLE}
	</h2>

	<nav class="astro-3EF6KSR2">
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`
      ${renderComponent($$result2, "LightningBoltIcon", $$LightningBolt, { "size": "25", "class": "astro-3EF6KSR2" })}
    ` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`
      ${renderComponent($$result2, "PersonIcon", $$Person, { "size": "25", "class": "astro-3EF6KSR2" })}
    ` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://github.com/wrn14897", "target": "_blank", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`
      ${renderComponent($$result2, "GHIcon", $$GitHubLogo, { "size": "25", "class": "astro-3EF6KSR2" })}
    ` })}
	</nav>
</header>`;
}, "/Users/warren/Codes/myBlog/src/components/Header.astro");

const TerminalController = (props = {}) => {
  const [terminalLineData, setTerminalLineData] = useState([/* @__PURE__ */ jsx(TerminalOutput, {
    children: "🐱 Hi there !! Type 'h' to see all commands..."
  })]);
  const onInput = (terminalInput) => {
    let ld = [...terminalLineData];
    ld.push(/* @__PURE__ */ jsx(TerminalInput, {
      children: terminalInput
    }));
    switch (terminalInput.toLocaleLowerCase().trim()) {
      case "help":
      case "h":
        ld.push(/* @__PURE__ */ jsx(TerminalOutput, {
          children: '"email" [Email Me]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"whoami" [About Me]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"hdx" [What is HyperDX]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"ds" [What is DeploySentinel]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"pb" [What is PTTBrain]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"gb" [Github Link]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"ln" [LinkedIn Link]'
        }), /* @__PURE__ */ jsx(TerminalOutput, {
          children: '"clear" [clear the terminal]'
        }));
        break;
      case "email":
        ld.push(/* @__PURE__ */ jsx(TerminalOutput, {
          children: "warren@hyperdx.io"
        }));
        break;
      case "whoami":
        ld.push(/* @__PURE__ */ jsx(TerminalOutput, {
          children: "Warren is a hacker, music nerd and entrepreneur."
        }));
        break;
      case "hdx":
        window.open("https://hyperdx.io", "_blank");
        break;
      case "ds":
        window.open("https://deploysentinel.com", "_blank");
        break;
      case "pb":
        window.open("https://pttbrain.com/about_us", "_blank");
        break;
      case "gb":
        window.open("https://github.com/wrn14897", "_blank");
        break;
      case "ln":
        window.open("https://www.linkedin.com/in/warren-jonhow-lee-7b91b3187/", "_blank");
        break;
      case "clear":
        ld = [];
        break;
    }
    setTerminalLineData(ld);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "container",
    children: /* @__PURE__ */ jsx(Terminal, {
      height: 500,
      name: "",
      colorMode: ColorMode.Dark,
      onInput,
      children: terminalLineData
    })
  });
};
__astro_tag_component__(TerminalController, "@astrojs/react");

const $$Astro$6 = createAstro("https://warrencodes.com");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`<html lang="en">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
	${renderHead($$result)}</head>
	<body>
		${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}
		<main>
      ${renderComponent($$result, "Terminal", TerminalController, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/warren/Codes/myBlog/src/components/Term.tsx", "client:component-export": "default" })}
		</main>
	</body></html>`;
}, "/Users/warren/Codes/myBlog/src/pages/index.astro");

const $$file$3 = "/Users/warren/Codes/myBlog/src/pages/index.astro";
const $$url$3 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

// astro-head-inject

const contentDir = '/src/content/';

const entryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('../first-post.95c06c90.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('../markdown-style-guide.464aea65.mjs'),"/src/content/blog/second-post.md": () => import('../second-post.643541d1.mjs'),"/src/content/blog/third-post.md": () => import('../third-post.f53d49ae.mjs'),"/src/content/blog/using-mdx.mdx": () => import('../using-mdx.0ac46a0a.mjs')

});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: entryGlob,
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"markdown-style-guide":"/src/content/blog/markdown-style-guide.md","first-post":"/src/content/blog/first-post.md","second-post":"/src/content/blog/second-post.md","third-post":"/src/content/blog/third-post.md","using-mdx":"/src/content/blog/using-mdx.mdx"}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('../first-post.8e760701.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('../markdown-style-guide.0e42cb1e.mjs'),"/src/content/blog/second-post.md": () => import('../second-post.2bbf0e22.mjs'),"/src/content/blog/third-post.md": () => import('../third-post.43da6f0f.mjs'),"/src/content/blog/using-mdx.mdx": () => import('../using-mdx.a0724f47.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	collectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

async function get(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	get
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("https://warrencodes.com");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`<html lang="en">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
	${renderHead($$result)}</head>
	<body>
		${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}
		<main>
      <p>
        I'm Warren Lee, the co-founder of DeploySentinel, Inc. (YC S22).
      </p>
      <p>
        I spend most of my time on building <a href="https://hyperdx.io" target="_blank">HyperDX</a>, 
        the only production monitoring & debugging platform developers will need.
      </p>
      <p>
        I've also built the E2E tests debugging platform <a href="https://deploysentinel.com" target="_blank">DeploySentinel</a>
        and the leading music data analytics platform <a href="https://chartmetric.com" target="_blank">Chartmetric</a>.
      </p>
      <p>
        When I have spare time, I'm building the data analytics platform that targets social media (PTT, Dcard) in Taiwan <a href="https://pttbrain.com" target="_blank">PTTBrain</a>
        or playing with my cat "Mudo".
      </p>

      <img src="/mudo.jpg" alt="Mudo">
		</main>
	</body></html>`;
}, "/Users/warren/Codes/myBlog/src/pages/about.astro");

const $$file$2 = "/Users/warren/Codes/myBlog/src/pages/about.astro";
const $$url$2 = "/about";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://warrencodes.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const today = /* @__PURE__ */ new Date();
  return renderTemplate`${maybeRenderHead($$result)}<footer class="astro-SZ7XMLTE">
	&copy; ${today.getFullYear()} by Warren. All rights reserved.
</footer>`;
}, "/Users/warren/Codes/myBlog/src/components/Footer.astro");

const $$Astro$3 = createAstro("https://warrencodes.com");
const $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<time${addAttribute(date.toISOString(), "datetime")}>
	${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
</time>`;
}, "/Users/warren/Codes/myBlog/src/components/FormattedDate.astro");

const $$Astro$2 = createAstro("https://warrencodes.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
  return renderTemplate`<html lang="en" class="astro-5TZNM7MJ">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "class": "astro-5TZNM7MJ" })}
		
	${renderHead($$result)}</head>
	<body class="astro-5TZNM7MJ">
		${renderComponent($$result, "Header", $$Header, { "class": "astro-5TZNM7MJ" })}
		<main class="astro-5TZNM7MJ">
			<section class="astro-5TZNM7MJ">
				<ul class="astro-5TZNM7MJ">
					${posts.map((post) => renderTemplate`<li class="astro-5TZNM7MJ">
								${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "class": "astro-5TZNM7MJ" })}
								<a${addAttribute(`/blog/${post.slug}/`, "href")} class="astro-5TZNM7MJ">${post.data.title}</a>
							</li>`)}
				</ul>
			</section>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "class": "astro-5TZNM7MJ" })}
	</body></html>`;
}, "/Users/warren/Codes/myBlog/src/pages/blog/index.astro");

const $$file$1 = "/Users/warren/Codes/myBlog/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://warrencodes.com");
const $$BlogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" class="astro-BVZIHDZO">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "class": "astro-BVZIHDZO" })}
		
	${renderHead($$result)}</head>

	<body class="astro-BVZIHDZO">
		${renderComponent($$result, "Header", $$Header, { "class": "astro-BVZIHDZO" })}
		<main class="astro-BVZIHDZO">
			<article class="astro-BVZIHDZO">
				${heroImage && renderTemplate`<img${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(heroImage, "src")} alt="" class="astro-BVZIHDZO">`}
				<h1 class="title astro-BVZIHDZO">${title}</h1>
				${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": pubDate, "class": "astro-BVZIHDZO" })}
				${updatedDate && renderTemplate`<div class="last-updated-on astro-BVZIHDZO">
							Last updated on ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": updatedDate, "class": "astro-BVZIHDZO" })}
						</div>`}
				<hr class="astro-BVZIHDZO">
				${renderSlot($$result, $$slots["default"])}
			</article>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "class": "astro-BVZIHDZO" })}
	</body></html>`;
}, "/Users/warren/Codes/myBlog/src/layouts/BlogPost.astro");

const $$Astro = createAstro("https://warrencodes.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<h1>${post.data.title}</h1>
	${renderComponent($$result2, "Content", Content, {})}
` })}`;
}, "/Users/warren/Codes/myBlog/src/pages/blog/[...slug].astro");

const $$file = "/Users/warren/Codes/myBlog/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$HeaderLink as $, _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d };
