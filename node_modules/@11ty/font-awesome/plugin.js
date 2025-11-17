import { library } from "@fortawesome/fontawesome-svg-core";
import { nanoid } from "nanoid";
import { Transform } from "./src/transform.js";

import { mergeAttrs, attrsToHtml, faIconToHtml } from "./src/icon-to-html.js";

export default function(eleventyConfig, pluginOptions = {}) {
	eleventyConfig.versionCheck(">=3.0.1-alpha.4");

	let options = Object.assign({
		sets: false,
		failOnError: false, // only applies to transform, not shortcode
		bundle: "fontawesome",
		transform: "i[class]", // Selector for icons, falsy to disable
		shortcode: false, // Optional shortcode name
		defaultAttributes: {
			"aria-hidden": "true",
		},
		ignoredClasses: [],
		generateId: () => `fa11-text-${nanoid()}`,

		// https://docs.fontawesome.com/web/add-icons/svg-symbols#what-about-xlinkhref-what-happened-to-that
		// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/xlink:href versus https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/href#svg.elements.use.href
		useXlinkHref: true, // use xlink:href for further backwards compat
	}, pluginOptions);

	if(!options.bundle || typeof options.bundle !== "string") {
		throw new Error("The `bundle` option is required. `bundle: \"svg\"` is the default.");
	}

	eleventyConfig.addBundle(options.bundle, {
		hoist: false,
		delayed: true,
	});

	// This is optional, you can library.add from your configuration file directly
	if(Array.isArray(options.sets)) {
		library.add(...options.sets);
	}

	if(options.transform) {
		eleventyConfig.addPlugin(Transform, options);
	}

	if(options.shortcode !== false) {
		eleventyConfig.addShortcode(options.shortcode, function(selector, attrs = {}) {
			let {ref, html: iconHtml} = faIconToHtml(selector);

			let managers = eleventyConfig.getBundleManagers();
			let svgBundle = managers[options.bundle];
			if(!svgBundle) {
				throw new Error("Could not find matching bundle, looked for: " + options.bundle)
			}

			svgBundle.addToPage(this.page.url, iconHtml);

			let attrStr = attrsToHtml(mergeAttrs(Object.assign({}, options.defaultAttributes), attrs));
			return `<svg${attrStr ? ` ${attrStr}` : ""}><use href="#${ref}" xlink:href="#${ref}"></use></svg>`;
		});
	}
}
