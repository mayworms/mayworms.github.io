import matchHelper from "posthtml-match-helper";

import { faIconToHtml } from "./icon-to-html.js";
import PREFIXES from "./prefixes.js";

function filterAttrs(attrs = {}) {
	if(attrs.class && typeof attrs.class === "string") {
		let newClass = attrs.class.split(" ").filter(cls => !cls.startsWith("fa-")).join(" ");
		if(newClass) {
			attrs.class = newClass;
		} else {
			delete attrs.class;
		}
	}
	return attrs;
}

function classToIconSelector(className = "") {
	let classes = className.split(" ");
	let style;
	let family = "classic"; // optional, defaults to classic
	let iconName;
	for(let cls of classes) {
		if(!cls.startsWith("fa-")) {
			continue;
		}
		cls = cls.slice("fa-".length);

		if(PREFIXES.styles.includes(cls)) {
			style = cls;
		} else if(PREFIXES.families.includes(cls)) {
			family = cls;
		} else {
			iconName = cls;
		}
	}

	if(style && family && iconName) {
		let prefix = PREFIXES.map[family][style];
		return `${prefix}:${iconName}`;
	}
}

function Transform(eleventyConfig, options = {}) {
	let transformSelector = options.transform || "i[class]";

	let bundleName = options.bundle;
	let managers = eleventyConfig.getBundleManagers();
	if(!managers[bundleName]) {
		throw new Error(`Missing ${bundleName} Bundle Manager for Font Awesome icon plugin.`);
	}

	eleventyConfig.htmlTransformer.addPosthtmlPlugin(
		"html",
		function (context = {}) {
			let pageUrl = context?.url;
			return function (tree, ...args) {
				tree.match(matchHelper(transformSelector), function (node) {
					let selector = classToIconSelector(node.attrs.class);
					if(selector) {
						let { ref, html } = faIconToHtml(selector);
						if(pageUrl && managers[bundleName] && html) {
							managers[bundleName].addToPage(pageUrl, [ html ]);

							return {
								tag: "svg",
								attrs: filterAttrs(node.attrs),
								content: [
									{
										tag: "use",
										attrs: {
											href: `#${ref}`,
											"xlink:href": `#${ref}`,
										}
									}
								]
							};
						}
					}

					return node;
				});
			};
		}, // pluginOptions = {},
	);
}

export { Transform };
