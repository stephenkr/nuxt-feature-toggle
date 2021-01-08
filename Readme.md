<h1 align="center">nuxt-feature-toggle</h1>
<p align="center">This is a simple module for Nuxt.js to add support for a feature toggle system.</p>

<p align="center">
  <a href="https://david-dm.org/stephenkr/nuxt-feature-toggle">
    <img alt="" src="https://david-dm.org/stephenkr/nuxt-feature-toggle/status.svg?style=flat-square">
  </a>
  <a href="https://standardjs.com">
    <img alt="" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/nuxt-feature-toggle">
    <img alt="" src="https://img.shields.io/npm/v/nuxt-feature-toggle/latest.svg?style=flat-square">
  </a>
  <br/>
  <a href="https://www.npmjs.com/package/nuxt-feature-toggle">
    <img alt="" src="https://img.shields.io/npm/dt/nuxt-feature-toggle.svg?style=flat-square">
  </a>
  <a href="https://circleci.com/gh/stephenkr/nuxt-feature-toggle">
    <img alt="" src="https://img.shields.io/circleci/project/github/stephenkr/nuxt-feature-toggle.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">Release notes</a>
</p>

## Features
- Dynamically pull in your feature toggles when the application starts
- Set a static list of feature toggles
- Optional query string support to override a feature toggle

## Usage

### 1. Add module to nuxt.config.js along with the feature toggle options.

The toggles can be defined as a function or just as an object.

#### As a function
```javascript
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
```javascript
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

```html
<feature-toggle name="my-unique-key" :value="true">
  <p>This can only show if the toggle is enabled</p>
</feature-toggle>
```

## RuntimeConfig support
If using Nuxt >= 2.13, you can use the new `publicRuntimeConfig` setting in `nuxt.config.js` to **configure 
feature toggles on-the-fly without having to rebuild** (only need to restart Nuxt using `nuxt start`).  

```javascript
module.exports = {
  modules: ['nuxt-feature-toggle'],
  publicRuntimeConfig: {
    featureToggle:{
      toggles: {
        somePreviewFeature: process.env.FEATURE_ENABLE_SOME_PREVIEW_FEATURE,
      }
    }
  }
}
```
Note 1: `FEATURE_ENABLE_SOME_PREVIEW_FEATURE` is an arbitrary name, the package doesn't depend on it.  
You can use "Feature Flag" names eg. `FF_PREVIEW_FEATURE` or whatever suits you. 

Note 2: If you want to use `0/1` or `"true/false"` strings to enable/disable your features, 
[check out this great package which makes it much easier.](https://github.com/sindresorhus/yn) 

Now you just need to change your environment variables an restart Nuxt to toggle your features!

### Important note on `publicRuntimeConfig` and Promise / function based toggles 
**If you're using function/promise based toggles resolution, you should not use `publicRuntimeConfig`:**
while it's technically *possible* to use a function in `runtimeConfig`, [it is not recommended](https://nuxtjs.org/guide/runtime-config/).  

**A function/promise based toggles resolution will NOT be resolved in the plugin, only on build.**  

Instead you should either:  
* Use a Promise/Function in `featureToggle.toggles` like you did before  
* Switch to object mode in `publicRuntimeConfig.featureToggle.toggles`.  
  
As now you can use environment variables and just restart the server, many people can get rid of Promises returning toggles depending on the environment.


## Use with the query string

To use the query string with your feature toggles, first enable it in your configuration file.

```javascript
module.exports = {
  modules: ['nuxt-feature-toggle'],

  featureToggle: {
    queryString: true,
    toggles: {
      'my-unique-key': true
    }
  }
}
```

The option `queryString` is used to enable query string support, so if the url contains a toggle query string, then the feature toggles with the matching value will be forced to show.

### Change key prefix

To change the default toggle prefix for `toggle`, you can now pass an option to change it to anything you like, such as:
```html
<feature-toggle name="my-unique-key" :value="true" prefix="_t">
  <p>This can only show if the toggle is enabled</p>
</feature-toggle>
```

In this case, the key is now `_t_my-unique-key`

### Allowing access

You can control the access of the query string using a function, this can be defined using the following approach.

1. Create a new plugin file and import it into your nuxt.config.js file.

2. Add the following code to your new plugin

```javascript
export default function({ $featureToggle }) {
  $featureToggle.isQueryStringAllowed(props => {
    return true;
  })
}
```

Here you can access the props for the feature toggle component, and you can access the context using the exported function.

If no function is defined, and the `queryString` option is true, then all query strings are allowed.

### Usage

Once the querystring options are setup, you can enter the following to change the feature toggle, ensure `toggle_` is prefixed to the name of the feature toggle.

```
https://website.com?toggle_my-unique-key=false
```

This will set the feature toggle 'my-unique-key' to false when viewing the page.

# To use the demo

1. Go to the `examples/demo` folder
2. Run the command `yarn`
3. Once done, run `yarn dev`
4. Navigate to `http://localhost:3000`

## About the demo

The demo will show how the query string functionality works with the feature toggles. You should see a control box on the left hand side where you can manipulate the query strings in the URL. This will update the feature toggle on the page.

![](./docs/assets/demo-1.gif)

# License

<a href="./LICENSE">MIT License</a>
