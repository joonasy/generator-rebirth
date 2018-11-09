# Rebirth Yeoman generator

Yeoman generator for [Rebirth](https://github.com/joonasy/rebirth.git). Scaffold a new WordPress theme, TYPO3 extension, static HTML or custom (TODO) project. Learn more in [Docs](https://joonasy.github.io/rebirth/docs/getting-started/generator/).

## Quick start

Run the generator in your desired location, pass in your project directory name (required; this will be your installation directory) and your project type (`typo3`, `html` or `wordpress`):

```
$ yarn global add generator-rebirth
$ npx yo rebirth [my-project-folder] --project=my-project-type
```

If you are building a _Typo3 project_ all special characters are removed from the extension directory name e.g. `my-project_folder` -> `myprojectfolder`.

## Documentation

Rebirths documentation is built with Assemble and publicly hosted on GitHub Pages at [https://joonasy.github.io/rebirth](https://joonasy.github.io/rebirth).

## License

Copyright (c) 2018 Joonas Ylitalo (Twitter: [@joonas](https://twitter.com/joonasy)) Licensed under the MIT license.
