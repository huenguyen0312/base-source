# Introduction

A front-end development environment for implementing the style and behavior of modules (parts) and partials.

## Development Environment Version Requirements

- [node.js](https://nodejs.org/): `>=22.0.0`
- [pnpm](https://pnpm.io/): `>=9.0.0`

[pnpm](https://pnpm.io/installation) is used for package management.

## Package Management Installation

Install pnpm according to the installation instructions in an environment where node.js (npm) is installed.

[https://pnpm.io/installation#using-npm](https://pnpm.io/installation#using-npm)

\* Installing pnpm via npm is officially recommended because there are no OS-specific differences.

```bash
npm install -g pnpm
```

### Package Installation

Create a project file containing `package.json` in any location and execute the install command.

```bash
pnpm install
```

This command installs the dependencies (packages) described in the `package.json` file. pnpm is known for being faster and more disk-efficient compared to npm and yarn.

### Development Environment Startup / Verify the code

1. Start the development server with `pnpm dev`
2. Verify the code in the src folder with `pnpm check`

This command starts a local server for development, allowing you to see changes in real-time as you develop. Hot reloading (automatically refreshing the browser when you save file changes) is usually enabled.

### Generating Files for the Server

1. Build with `pnpm build`
2. Place the `dist` folder on the server

## Frequently Used Commands

Before committing to version control systems like Git, please perform linting and formatting at appropriate times, and fix any issues before committing.

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start the development server         |
| `pnpm build`  | Generate files for the server        |
| `pnpm check`  | src dir: code check (format & lint)  |
| `pnpm lint`   | src dir: code check (.js, .css)      |
| `pnpm fix`    | src dir: Code fix (.js, .css)        |
| `pnpm format` | src dir: Code fix format (.js, .css) |

Used linters & formatters

[src dir]

- JavaScript: [biome](https://biomejs.dev/)
- CSS(PostCSS): [stylelint](https://stylelint.io/)

[dist dir (pnpm build)]

- HTML: [js-buetify](https://beautifier.io/)

## mainly related links

- [pnpm](https://pnpm.io/)
- [vite](https://vitejs.dev/)
- [commitlint](https://commitlint.js.org/)
- [biome](https://biomejs.dev/)
- [stylelint](https://stylelint.io/)
- [js-beautify](https://beautifier.io/)

- [postcss](https://postcss.org/)
- [typescript](https://www.typescriptlang.org/)
- [handlebars](https://handlebarsjs.com/)
