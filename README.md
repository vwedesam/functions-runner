# Functions Runner for Node.js

<!-- [![npm version](https://img.shields.io/npm/v/@google-cloud/functions-framework.svg)](https://www.npmjs.com/package/@google-cloud/functions-framework) [![npm downloads](https://img.shields.io/npm/dm/@google-cloud/functions-framework.svg)](https://npmcharts.com/compare/@google-cloud/functions-framework?minimal=true) -->

<!-- [![Node unit CI][ff_node_unit_img]][ff_node_unit_link] [![Node lint CI][ff_node_lint_img]][ff_node_lint_link] [![Node conformace CI][ff_node_conformance_img]][ff_node_conformance_link] -->

A CLI Tool (based on [Express](https://expressjs.com/))
for running and testing portable Node.js functions locally
Without needing to worry about writing an HTTP server or complicated request handling logic.

## Support
It helps spin up a local development server for quick testing of Functions from different providers, including:

*   [Google Cloud Functions](https://cloud.google.com/functions/)
*   [AWS Lambda](https://cloud.google.com/run/) 

## Installation

Add the CLI Tool to your `package.json` file using `npm`.

```sh
npm install functions-runner
```

## Quickstarts

### Quickstart: Hello, World on your local machine

1. Create an `index.js` file with the following contents:

    ```js
    exports.helloWorld = (req, res) => {
      res.send('Hello, World');
    };
    ```

1. Run the following command:

    ```sh
    npx functions-runner --target=helloWorld
    ```

1. Open http://localhost:8080/helloWorld in your browser and see _Hello, World_.

you can a `start` script to `package.json`, with configuration passed via
command-line arguments:

    ```js
      "scripts": {
        "start:dev": "functions-runner --target=helloWorld"
      }
    ```

1. Use `npm run start:dev` to start the built-in local development server:

    ```sh
    npm run start:dev
    ...
    Serving function...
    Function: helloWorld
    URL: http://localhost:8080/
    ```

1. Send requests to this function using `curl` from another terminal window:

    ```sh
    curl localhost:8080/helloWorld
    # Output: Hello, World
    ```

## Configure the Functions Runner

You can configure the Functions Framework using command-line flags or
environment variables. If you specify both, the environment variable will be
ignored.

| Command-line flag  | Default      | Description                                                                                                                                                                                                      |
| ------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--port`           |   `8080`               | The port on which the Functions Framework listens for requests. e.g `--port=3000`                                                                                                                                 |
| `--target`         | required         | The name of the exported function to be invoked in response to requests. e.g `--target=helloWorld`                                                                 
| `--targets`         | optional         | The name of the exported functions to be invoked in response to requests e.g `--targets=helloWorld,function,greeting`
| `--src`         |  dir defined by `main` in `package.json`        | The path to `index.js` where the function(s) are exported from. e.g `--src=dist/index.js`
| `--provider`         | GCP        | Supported Serverless provider `GCP, AWS`. e.g `--provider=aws`




## TypeScript

Add this `scripts` to  `package.json`
```json
    "build": "tsc",

    "dev": "npm run build && npx functions-runner --target=helloWorld --src=dist/index.js",

    "start": "npm run build && node dist/index.js"
```

don't forget to add this to `tsconfig.json` 

```json
  "outDir": "dist/"
```

