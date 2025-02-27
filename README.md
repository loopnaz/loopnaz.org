# loopnaz.org

The website for the [Church of the Nazarene in the Loop](https://loopnaz.org/).

## Summary

This site includes prerendered static files generated by [Eleventy](https://11ty.dev/) (11ty). Thanks, [Zach Leatherman](https://zachleat.com/).

The templates are written entirely in vanilla JavaScript (files with the [`*.11ty.js`](https://www.11ty.dev/docs/languages/javascript/) extension).

## Local development

Install [Node.js](https://nodejs.org/) on your machine (see [11ty documentation for specific requirements](https://www.11ty.dev/docs/getting-started/)).

Then enter the following commands into your terminal:

### Getting started

#### 1. Clone this repository.

```cli
git clone --recurse-submodules git@github.com:loopnaz/loopnaz.org.git
```

#### 2. Go to the working directory.

```cli
cd loopnaz.org
```

#### 3. Install the project dependencies with [NPM](https://www.npmjs.com/).

```cli
npm install
```

#### 5. Start your local server.

```cli
npm run dev
```

## Publish your own copy

The command `npm run build` will generate a copy of the site files in a `_site` directory, which you can deploy with any hosting service.

&copy; 2025 by [Church of the Nazarene in the Loop](https://github.com/loopnaz/)
