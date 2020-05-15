# metalsmith-htaccess

[![npm Version](https://badgen.net/npm/v/metalsmith-htaccess?icon=npm)](https://www.npmjs.com/package/metalsmith-htaccess)
[![node Version](https://badgen.net/npm/node/metalsmith-htaccess)](https://github.com/emmercm/metalsmith-htaccess/blob/master/package.json)
[![npm Weekly Downloads](https://badgen.net/npm/dw/metalsmith-htaccess)](https://www.npmjs.com/package/metalsmith-htaccess)

[![Known Vulnerabilities](https://snyk.io/test/npm/metalsmith-htaccess/badge.svg)](https://snyk.io/test/npm/metalsmith-htaccess)
[![Test Coverage](https://badgen.net/codecov/c/github/emmercm/metalsmith-htaccess/master?icon=codecov)](https://codecov.io/gh/emmercm/metalsmith-htaccess)
[![Maintainability](https://badgen.net/codeclimate/maintainability/emmercm/metalsmith-htaccess?icon=codeclimate)](https://codeclimate.com/github/emmercm/metalsmith-htaccess/maintainability)

[![GitHub](https://badgen.net/badge/emmercm/metalsmith-htaccess/purple?icon=github)](https://github.com/emmercm/metalsmith-htaccess)
[![License](https://badgen.net/github/license/emmercm/metalsmith-htaccess?color=grey)](https://github.com/emmercm/metalsmith-htaccess/blob/master/LICENSE)

A Metalsmith plugin to create an htaccess configuration file.

## Installation

```bash
npm install --save metalsmith-htaccess
```

## JavaScript Usage

```javascript
const Metalsmith = require('metalsmith');
const htaccess   = require('metalsmith-htaccess');

Metalsmith(__dirname)
    .use(htaccess({
        // options here
    }))
    .build((err) => {
        if (err) {
            throw err;
        }
    });
```

## Options

### Core

#### `core.defaultCharset` (optional)

Type: `string` Default: `utf-8`

Sets [`AddDefaultCharset`](https://httpd.apache.org/docs/current/mod/core.html#adddefaultcharset).

#### `core.serverSignature` (optional)

Type: `boolean` Default: `false`

Enables or disables [`ServerSignature`](https://httpd.apache.org/docs/current/mod/core.html#serversignature).

#### `core.errorDocuments` (optional)

Type: `object`

An object of [`ErrorDocument`](https://httpd.apache.org/docs/current/mod/core.html#errordocument)s, example:

```json
{
    "core": {
        "errorDocuments": {
            "401": "/error_pages/401.html",
            "404": "/error_pages/404.html",
            "500": "/error_pages/500.html"
        }
    }
}
```

### Core Options

#### `core.options.followSymlinks` (optional)

Type: `boolean` Default: `true`

Enables or disables [`FollowSymlinks`](https://httpd.apache.org/docs/current/mod/core.html#options).

#### `core.options.indexes` (optional)

Type: `boolean` Default: `false`

Enables or disables [`Indexes`](https://httpd.apache.org/docs/current/mod/core.html#options).

#### `core.options.multiViews` (optional)

Type: `boolean` Default: `false`

Enables or disables [`MultiViews`](https://httpd.apache.org/docs/current/mod/core.html#options).

### Deflate

#### `deflate.mimeTypes` (optional)

Type: `string[]`

A list of MIME types to [`AddOutputFilterByType DEFLATE`](https://httpd.apache.org/docs/current/mod/mod_deflate.html#enable).

### Dir

#### `dir.index` (optional)

Type: `string` Default: `index.html index.htm index.php index.cgi`

Set [`DirectoryIndex`](https://httpd.apache.org/docs/current/mod/mod_dir.html#directoryindex).

### Environment

#### `environment.serverAdminEmail` (optional)

Type: `string`

Set [`SetEnv SERVER_ADMIN`](https://httpd.apache.org/docs/current/mod/mod_env.html#setenv).

#### `environment.timezone` (optional)

Type: `string`

Set [`SetEnv TZ`](https://httpd.apache.org/docs/current/mod/mod_env.html#setenv).

### Expires

#### `expires.default` (optional)

Type: `string`

Set [`ExpiresDefault`](https://httpd.apache.org/docs/current/mod/mod_env.html#setenv).

### Gzip

#### `gzip.canNegotiate` (optional)

Type: `boolean` Default: `true`

Enables or disables `mod_gzip_can_negotiate`.

#### `gzip.dechunk` (optional)

Type: `boolean` Default: `true`

Enables or disables `mod_gzip_dechunk`.

#### `gzip.include` (optional)

Type: `string[]` Default: `["file .(html?|txt|css|js|php|pl)$", "handler ^cgi-script$", "mime ^text/.*", "mime ^application/x-javascript.*"]`

A list of `mod_gzip_item_include`.

#### `gzip.exclude` (optional)

Type: `string[]` Default: `["reqheader \"User-agent: Mozilla/4.0[678]\"", "mime ^image/.*", "rspheader ^Content-Encoding:.*gzip.*"]`

A list of `mod_gzip_item_exclude`.

### Headers

#### `headers.etag` (optional)

Type: `boolean` Default: `false`

Enables or disables [ETag header](https://httpd.apache.org/docs/current/mod/core.html#fileetag).

### MIME

#### `mime.defaultLanguage` (optional)

Type: `string`

Sets [`DefaultLanguage`](https://httpd.apache.org/docs/current/mod/mod_mime.html#defaultlanguage).

#### `mime.languages` (optional)

Type: `object`

An object of [`AddLanguage`](https://httpd.apache.org/docs/current/mod/mod_mime.html#addlanguage)s, example:

```json
{
    "mime": {
        "languages": {
            "en": "en",
            "en-gb": ".en",
            "en-us": ".en"
        }
    }
}
```

#### `mime.charsets` (optional)

Type: `object`

An object of [`AddCharset`](https://httpd.apache.org/docs/current/mod/mod_mime.html#addcharset)s, example:

```json
{
    "mime": {
        "charsets": {
            "EUC-JP": ".euc",
            "ISO-2022-JP": ".jis",
            "SHIFT_JIS": ".sjis"
        }
    }
}
```

#### `mime.types` (optional)

Type: `object`

An object of [`AddType`](https://httpd.apache.org/docs/current/mod/mod_mime.html#addtype)s, example:

```json
{
    "mime": {
        "types": {
            "image/gif": ".gif",
            "image/jpeg": "jpeg jpg jpe"
        }
    }
}
```

### Rewrite

#### `rewrite.404` (optional)

Type: `string`

Sets the [404 redirect page](https://httpd.apache.org/docs/current/mod/mod_rewrite.html).

#### `rewrite.options` (optional)

Type: `string` Default: `Inherit`

Sets [`RewriteOptions`](https://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewriteoptions).

#### `rewrite.allowedMethods` (optional)

Type: `string[]`

A list of [allowed HTTP methods](https://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewriteoptions).

#### `rewrite.httpsRedirect` (optional)

Type: `boolean`

Enable [HTTPS redirection](https://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewriteoptions).

### Spelling

#### `spelling.check` (optional)

Type: `boolean`

Enables or disables [`CheckSpelling`](https://httpd.apache.org/docs/current/mod/mod_speling.html#checkspelling).

## Changelog

[Changelog](./CHANGELOG.md)
