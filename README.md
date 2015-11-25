# [$.custominputfile](https://github.com/ValentinGot/custominputfile)

A small jQuery module to easily stylize an input file

## Install

You may install the $.custominputfile plugin via **bower** or **npm**.

```
bower install custominputfile
npm install custominputfile
```

## Quick use

Include the latest release of jQuery before your $.custominputfile script file.
Include $.custominputfile JS and CSS dependencies in your applications.

Your code should the be similar to this:

```html
<link rel="stylesheet" href="dist/css/custominputfile.min.css" media="screen" />

<script type="text/javascript" src="jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="dist/js/custominputfile.min.js"></script>
```

### Creating a $.custominputfile

To create a basic $.custominputfile, write the code below:

```javascript
$('input[type=file]').custominputfile();
```

### Options & Defaults

Available options listed below.

```json
{
    "value": "",        // Default input value
    "icon": "",         // Button icon (only fonts can be used)
    "text": "Browse"    // Button text
}
```

## License

The $.custominputfile plugin is released under the MIT license.

https://github.com/ValentinGot/custominputfile/blob/master/LICENSE