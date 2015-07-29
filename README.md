# conditional-visibility

Copyright (C) 2015, Eleven41 Software Inc.

Javascript library to set the visibility of HTML controls based on values of other controls.

## Get It on NuGet!

	Install-Package conditional-visibility

## LICENSE
[MIT License](https://github.com/eleven41/conditional-visibility/blob/master/LICENSE)

## Requirements

* jQuery 2.0.0 or later

## Supported Controls

The following types of controls can be used as visibility targets:

* input (checkbox)
* select

## Example

```html
<select id="Show1">
    <option value="true">Show</option>
    <option value="false">Hide</option>
</select>

<div data-visibility-target="Show1"
     data-visibility-value="true">
    This div is now showing because of the select.
</div>
```



