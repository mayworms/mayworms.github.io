# `@11ty/font-awesome`

Optimized per-page tree-shaken SVG spritesheets for Eleventy with Font Awesome icons.

_**Experimental: requires Eleventy v3.0.1-alpha.4 and newer.**_

## Features

- Creates a customized per-page de-duplicated SVG sprite-sheet for _any_ template in Eleventy that outputs HTML (yes, even Markdown).
- Driven via HTML: copy HTML directly from the Font Awesome docs (e.g. `<i class="fa-regular fa-user"></i>`).
- SVG-only. No additional CSS or JavaScript is added.
- Optimized: Using an icon more than once will de-duplicate the SVG code for you and only include it once.
- Choose from any of the 2000+ free icons provided by Font Awesome (currently v6) or optionally add Pro sets too.

## Usage

Install via `npm`:

```sh
npm install @11ty/font-awesome
```

Add to your configuration file:

```sh
import fontAwesomePlugin from "@11ty/font-awesome";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(fontAwesomePlugin);
};
```

Add the HTML markup from any of the 2000+ free icons from the Font Awesome library directly into any Eleventy template type (yes, Markdown, too) (e.g. `<i class="fa-regular fa-user"></i>`):

- [Font Awesome Solid](https://fontawesome.com/search?o=r&ic=free&s=solid) (currently 1,402 icons)
- [Font Awesome Regular](https://fontawesome.com/search?o=r&ic=free&s=regular) (currently 163 icons)
- [Font Awesome Brands](https://fontawesome.com/search?o=r&ic=free&ip=brands) (currently 495 icons)

Somewhere on your page (probably in an [Eleventy Layout file](https://www.11ty.dev/docs/layouts/)), you’ll want to output the spritesheet from the [Bundle Plugin](https://www.11ty.dev/docs/plugins/bundle/):

```njk
<!-- e.g. _includes/layout.njk -->

<main>
{{ content | safe }}
</main>

<!-- outputs all the icons used on the page -->
{% getBundle "fontawesome" %}
```

### Advanced Usage

#### Use Font Awesome Pro Icon sets (or Kits)

Read more on the available package sets on the [Font Awesome docs](https://docs.fontawesome.com/apis/javascript/import-icons#svg-icon-package-names).

```js
import fontAwesomePlugin from "@11ty/font-awesome";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fat } from "@fortawesome/pro-thin-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { fass } from "@fortawesome/sharp-solid-svg-icons";
import { fasr } from "@fortawesome/sharp-regular-svg-icons";
import { fasl } from "@fortawesome/sharp-light-svg-icons";
import { fast } from "@fortawesome/sharp-thin-svg-icons";
import { fasds } from "@fortawesome/sharp-duotone-solid-svg-icons";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(fontAwesomePlugin, {
		sets: [fas, far, fal, fat, fad, fass, fasr, fasl, fast, fasds],
	})
};
```

Alternatively, you can [add to the Font Awesome library directly](https://docs.fontawesome.com/apis/javascript/icon-library#adding-icons-to-the-library):

```js
import fontAwesomePlugin from "@11ty/font-awesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fat } from "@fortawesome/pro-thin-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { fass } from "@fortawesome/sharp-solid-svg-icons";
import { fasr } from "@fortawesome/sharp-regular-svg-icons";
import { fasl } from "@fortawesome/sharp-light-svg-icons";
import { fast } from "@fortawesome/sharp-thin-svg-icons";
import { fasds } from "@fortawesome/sharp-duotone-solid-svg-icons";

library.add(fas, far, fal, fat, fad, fass, fasr, fasl, fast, fasds);

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(fontAwesomePlugin)
};
```

#### Use an Eleventy Shortcode

```js
import fontAwesomePlugin from "@11ty/font-awesome";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(fontAwesomePlugin, {
		transform: false, // disable the Eleventy transform
		shortcode: "icon",
	})
};
```

The above configuration will create a `{% icon %}` shortcode than can be used in templates like this (instead of the Eleventy transform and direct HTML usage):

```njk
{% icon "fab:font-awesome" %} Font Awesome
```

You’ll still need to use `{% getBundle "fontawesome" %}` as noted above to output the spritesheet.

#### Full Options List

Defaults shown.

```js
import fontAwesomePlugin from "@11ty/font-awesome";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(fontAwesomePlugin, {
		sets: false, // Array of additional icon sets
		transform: "i[class]", // Selector for icons, set falsy to disable the transform
		shortcode: false, // Optional shortcode name (string), false will disable
		bundle: "fontawesome", // Rename the Bundle Plugin name
	})
};
```