# KUROCLI

◼ KuroCLI is a bootstraper to create projects based on templates

## Installation

Install the package with npm

```bash
$ npm i -g @jmhs11/kurocli
```

## Usage

KuroCLI has different options:

Select Template

```bash
$ kurocli [webpack|<other-template>]
```

Define Directory

```bash
$ kurocli [--dir|--d <project-path>]
```

Initialize Local Git Repository

```bash
$ kurocli [--git|--g]
```

Skip Questions

```bash
$ kurocli [--yes|--y]
```

Automatically Install Dependencies

```bash
$ kurocli [--install|--i]
```

Raw Command

```bash
$ kurocli
  This command will prompt some questions to define the variables of the project
```

All Options

```bash
$ kurocli webpack --d test --g --y --i
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
