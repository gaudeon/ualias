# uAlias

Web Extension for simple aliasing support of urls

## Usage
In the addon preferences, you can setup a simple alias to any URL.
```
google https://www.google.com/
```

Then all you need to do is type 'u <alias>' in your browsers' address bar and your location will load your aliases URL.
```
u google
```

Additionally, in the addon preferences, you can add place holders into your url that can be replaced with additional parameters passed in your browsers' address bar. Placehoder Format: [_\d+]
```
google https://www.google.com/?q=[_1]
```

URLs with place holders will replace those placeholders with  additional parameters passed in your browsers' address bar.
```
u google searchtext
```
