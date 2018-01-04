# Material-UI-Flat-Colors

[Flat UI Colors](http://flatuicolors.com/) for [Material-UI](https://material-ui-next.com)

## Palette
Find colors [here](https://hybrid-force.github.io/Material-UI-Flat-Colors/)

## Installation
```sh
npm install material-ui-flat-colors
```

## Usage

```js
import { sunFlower, peterRiver } from 'material-ui-flat-colors';
```

or

```js
import sunFlower from 'material-ui-flat-colors/sunFlower';
import peterRiver from 'material-ui-flat-colors/peterRiver';
```

With `material-ui`

```js
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import peterRiver from 'material-ui-flat-colors/peterRiver';

const theme = createMuiTheme({
    palette: {
        primary: peterRiver
    }
});
```
