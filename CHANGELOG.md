# Changelog

## v0.2.0 / 2020-06-30

- Set default for `expires.default`.
- Fixed wrong `<IfModule>` for DEFLATE.
- Changed `deflate.mimeTypes` to output only one line.
- Set default for `deflate.mimeTypes`.
- Added support for `ExpiresByType` (`expires.types`), with default.
- Removed gzip defaults.
- Removed `[R=302]` from `rewrite.404` `RewriteRule`.
- Added `[NE]` to `rewrite.httpsRedirect` `RewriteRule`.

## v0.1.0 / 2019-05-31

- Added Jest tests.
- `rewrite.404` now uses an HTTP 302 instead of 307.
- Falsy data in dictionaries and arrays is now filtered out.

## v0.0.2 / 2019-05-11

- Fixed option defaulting.
- Fixed linting.
- Created README.
- Created CHANGELOG.
- Updated dependencies:
  - `eslint`

## v0.0.1 / 2019-05-10

- Initial version.
