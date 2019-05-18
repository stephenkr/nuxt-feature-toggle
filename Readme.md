<h1 align="center">nuxt-feature-toggle</h1>
<p align="center">This is a simple module for Nuxt.js to add support for a feature toggle system.</p>

<p align="center">
  <a href="./CHANGELOG.md">Release notes</a>
</p>

## Features
- Dynamically pull in your feature toggles when the application starts
- Set a static list of feature toggles
- Optional query string support to override a feature toggle
- Works with all modes (universal, spa, generate)
- For Nuxt 1.x and higher

## Usage

### 1. Add module to nuxt.config.js along with the feature toggle options.

The toggles can be defined as a function or just as an object.

#### As a function
```
module.exports = {
  modules: ['nuxt-feature-toggle'],

  featureToggle: {
    toggles: () => {
      return Promise.resolve({
        'my-unique-key': true
      })
    }
  }
}
```

#### As an object
```
module.exports = {
  modules: ['nuxt-feature-toggle'],

  featureToggle: {
    toggles: {
      'my-unique-key': true
    }
  }
}
```

### 2. Use the feature toggle component

```
<feature-toggle name="my-unique-key" :value="true">
  <p>This can only show if the toggle is enabled</p>
</feature-toggle>
```

## Use with the query string

To use the query string with your feature toggles, first enable it in your configuration file.

```
module.exports = {
  modules: ['nuxt-feature-toggle'],
  queryString: true,

  featureToggle: {
    toggles: {
      'my-unique-key': true
    }
  }
}
```

The option `queryString` is used to enabled query string support, so if the url contains a toggle query string, then the feature toggle will be forced to the set value.

You can control the access of the query string using a function, this can be defined using the following approach.

1. Create a new plugins file and import it into your nuxt.config.js file.

2. Add the following code to your new plugin

```
export default function({ $featureToggle }) {
  $featureToggle.isQueryStringAllowed(props => {
    return true;
  })
}
```

Here you can access the props for the feature toggle component, and you can access the context using the exported function.

If no function is defined, and `queryString` is true, then all query strings are allowed.

### Usage

Once the querystring options are setup, you can enter the following to change the feature toggle

```
https://website.com?toggle_my-unique-key=false
```

This will set the feature toggle 'my-unique-key' to false when viewing the page.

# License

<a href="./LICENSE">MIT License</a>