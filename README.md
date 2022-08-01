# Universal Router Typesafe URLs

**URL Generation for Universal Router.**

## Installation

```bash
npm install universal-router-typesafe-urls
```

## Usage

Run the following command to generate router class in watch mode (useful for development):

```bash
npx universal-router-typesafe-urls
```

Run the following command to generate router class once (useful for CI/CD):

```bash
npx universal-router-typesafe-urls --no-watch
```

## Configuration

You can set options in **universal-router-typesafe-urls.config** for your specific project. Available options:

| key                                 | type     | default value |
| ----------------------------------- | -------- | ------------- |
| [baseDir](#baseDir)                 | `string` | `''`          |
| [outputClassName](#outputClassName) | `string` | `'Router'`    |
| [outputClassPath](#outputClassPath) | `string` | `'Router.ts'` |

### baseDir

Defines which directory is the root to search universal-router definition. It's probably 'src' in most cases.

### outputClassName

Defines name of class which will be used by you to generate routing urls.

### outputClassPath

Defines path of generated class.
