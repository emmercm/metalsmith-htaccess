# metalsmith-htaccess

[![](https://badgen.net/npm/v/metalsmith-htaccess?icon=npm)](https://www.npmjs.com/package/metalsmith-htaccess)
[![](https://badgen.net/npm/dw/metalsmith-htaccess?icon=npm)](https://www.npmjs.com/package/metalsmith-htaccess)

[![](https://badgen.net/badge/emmercm/metalsmith-htaccess/purple?icon=github)](https://github.com/emmercm/metalsmith-htaccess)
[![](https://badgen.net/circleci/github/emmercm/metalsmith-htaccess/master?icon=circleci)](https://github.com/emmercm/metalsmith-htaccess/blob/master/.circleci/config.yml)
[![](https://codecov.io/gh/emmercm/metalsmith-htaccess/branch/master/graph/badge.svg)](https://codecov.io/gh/emmercm/metalsmith-htaccess)
[![](https://badgen.net/github/license/emmercm/metalsmith-htaccess?color=grey)](https://github.com/emmercm/metalsmith-htaccess/blob/master/LICENSE)

A Metalsmith plugin to create an htaccess configuration file.

## Installation

```bash
npm install metalsmith-htaccess
```

## JavaScript Usage

```javascript
const Metalsmith = require('metalsmith');
const htaccess   = require('metalsmith-htaccess');

Metalsmith(__dirname)
    .use(htaccess({
        // options here
    }))
```

## Options

### Default Options

```json
{
    "dir": {
        "index": "index.html index.htm index.php index.cgi"
    },
    "core": {
        "options": {
            "followSymlinks": true,
            "indexes": false,
            "multiViews": false
        },
        "defaultCharset": "utf-8",
        "serverSignature": false
    },
    "headers": {
        "etag": false
    },
    "gzip": {
        "canNegotiate": true,
        "dechunk": true,
        "include": [
            "file .(html?|txt|css|js|php|pl)$",
            "handler ^cgi-script$",
            "mime ^text/.*",
            "mime ^application/x-javascript.*"
        ],
        "exclude": [
            "reqheader \"User-agent: Mozilla/4.0[678]\"",
            "mime ^image/.*",
            "rspheader ^Content-Encoding:.*gzip.*"
        ]
    },
    "rewrite": {
        "options": "Inherit"
    }
}
```

### Core

#### `core.defaultCharset`

`string` - sets `AddDefaultCharset`.

#### `core.serverSignature`

`boolean` - enable or disable `ServerSignature`.

#### `core.errorDocuments`

`Object` - sets `ErrorDocument`:

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

#### `core.options.followSymlinks`

`boolean` - enable or disable `FollowSymlinks`.

#### `core.options.indexes`

`boolean` - enable or disable `Indexes`.

#### `core.options.multiViews`

`boolean` - enable or disable `MultiViews`.

### Deflate

#### `deflate.mimeTypes`

`Array` - list of MIME types to `AddOutputFilterByType DEFLATE`.

### Dir

#### `dir.index`

`string` - set `DirectoryIndex`.

### Environment

#### `environment.serverAdminEmail`

`string` - set `SetEnv SERVER_ADMIN`.

#### `environment.timezone`

`string` - set `SetEnv TZ`.

### Expires

#### `expires.default`

`string` - set `ExpiresDefault`.

### Gzip

#### `gzip.canNegotiate`

`boolean` - enable or disable `mod_gzip_can_negotiate`.

#### `gzip.dechunk`

`boolean` - enable or disable `mod_gzip_dechunk`.

#### `gzip.include`

`Array` - list of `mod_gzip_item_include`.

#### `gzip.exclude`

`Array` - list of `mod_gzip_item_exclude`.

### Headers

#### `headers.etag`

`boolean` - enable or disable ETag header.

### MIME

#### `mime.defaultLanguage`

`string` - set `DefaultLanguage`.

#### `mime.languages`

`Object` - set `AddLanguage`:

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

#### `mime.charsets`

`Object` - set `AddCharset`:

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

#### `mime.types`

`Object` - set `AddType`:

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

#### `rewrite.404`

`string` - set 404 redirect page.

#### `rewrite.options`

`string` - set `RewriteOptions`.

#### `rewrite.allowedMethods`

`Array` - list of allowed HTTP methods.

#### `rewrite.httpsRedirect`

`boolean` - enable HTTPS redirection.

### Spelling

#### `spelling.check`

`boolean` - enable or disable `CheckSpelling`.

## Changelog

[Changelog](./CHANGELOG.md)
