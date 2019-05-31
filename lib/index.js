const deepmerge = require('deepmerge');

const generate = (options) => {
  let htaccess = '';

  /* ***** Core ***** */

  htaccess += '<Files .htaccess>\n';
  htaccess += '\tOrder Allow,Deny\n';
  htaccess += '\tDeny from all\n';
  htaccess += '</Files>\n';

  if (options.core) {
    if (options.core.options) {
      if (options.core.options.followSymlinks) {
        htaccess += 'Options +FollowSymlinks\n';
      } else {
        htaccess += 'Options -FollowSymlinks\n';
      }

      if (options.core.options.indexes) {
        htaccess += 'Options +Indexes\n';
      } else {
        htaccess += 'Options -Indexes\n';
      }

      if (options.core.options.multiViews) {
        htaccess += 'Options +MultiViews\n';
      } else {
        htaccess += 'Options -MultiViews\n';
      }
    }

    if (options.core.defaultCharset) {
      htaccess += `AddDefaultCharset ${options.core.defaultCharset}\n`;
    }

    if (options.core.serverSignature) {
      htaccess += 'ServerSignature On\n';
    } else {
      htaccess += 'ServerSignature Off\n';
    }

    if (options.core.errorDocuments) {
      Object.keys(options.core.errorDocuments)
        .filter(code => options.core.errorDocuments[code])
        .forEach((code) => {
          htaccess += `ErrorDocument ${code} ${options.core.errorDocuments[code]}\n`;
        });
    }
  }

  if (options.headers && options.headers.etag) {
    htaccess += `FileETag ${options.headers.etag}\n`;
  } else {
    htaccess += 'FileETag none\n';
  }

  /* ***** mod_deflate ***** */

  // GZIP should be preferred over DEFLATE per https://zoompf.com/blog/2012/02/lose-the-wait-http-compression/

  if (options.deflate) {
    htaccess += '<IfModule mod_dir.c>\n';

    if (options.deflate.mimeTypes) {
      options.deflate.mimeTypes
        .filter(type => type)
        .forEach((type) => {
          htaccess += `\tAddOutputFilterByType DEFLATE ${type}\n`;
        });
    }

    // https://gtmetrix.com/enable-gzip-compression.html
    htaccess += '\tBrowserMatch ^Mozilla/4 gzip-only-text/html\n';
    htaccess += '\tBrowserMatch ^Mozilla/4\\.0[678] no-gzip\n';
    htaccess += '\tBrowserMatch \\bMSIE !no-gzip !gzip-only-text/html\n';
    htaccess += '\tHeader append Vary User-Agent\n';

    htaccess += '</IfModule>\n';
  }

  /* ***** mod_dir ***** */

  if (options.dir) {
    htaccess += '<IfModule mod_dir.c>\n';

    if (options.dir.index) {
      htaccess += `\tDirectoryIndex ${options.dir.index}\n`;
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** Environment ***** */

  if (options.environment) {
    if (options.environment.serverAdminEmail) {
      htaccess += `SetEnv SERVER_ADMIN ${options.environment.serverAdminEmail}\n`;
    }

    // https://www.inmotionhosting.com/support/website/general-server-setup/tz-ref-table
    if (options.environment.timezone) {
      htaccess += `SetEnv TZ ${options.environment.timezone}\n`;
    }
  }

  /* ***** mod_expires ***** */

  if (options.expires) {
    htaccess += '<IfModule mod_expires.c>\n';
    htaccess += '\tExpiresActive On\n';

    if (options.expires.default) {
      htaccess += `\tExpiresDefault "${options.expires.default}"\n`;
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** mod_gzip ***** */

  if (options.gzip) {
    htaccess += '<IfModule mod_gzip.c>\n';
    htaccess += '\tmod_gzip_on Yes\n';

    if (options.gzip.canNegotiate) {
      htaccess += '\tmod_gzip_can_negotiate Yes\n';
    } else {
      htaccess += '\tmod_gzip_can_negotiate No\n';
    }

    if (options.gzip.dechunk) {
      htaccess += '\tmod_gzip_dechunk Yes\n';
    } else {
      htaccess += '\tmod_gzip_dechunk No\n';
    }

    if (options.gzip.include) {
      options.gzip.include
        .filter(include => include)
        .forEach((include) => {
          htaccess += `\tmod_gzip_item_include ${include}\n`;
        });
    }

    if (options.gzip.exclude) {
      options.gzip.exclude
        .filter(exclude => exclude)
        .forEach((exclude) => {
          htaccess += `\tmod_gzip_item_exclude ${exclude}\n`;
        });
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** mod_headers ***** */

  if (options.headers) {
    htaccess += '<IfModule mod_headers.c>\n';

    // https://htaccessbook.com/disable-etags/
    if (options.headers.etag) {
      htaccess += `\tHeader set ETag ${options.headers.etag}\n`;
    } else {
      htaccess += '\tHeader unset ETag\n';
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** mod_mime ***** */

  if (options.mime) {
    htaccess += '<IfModule mod_mime.c>\n';

    if (options.mime.defaultLanguage) {
      htaccess += `\tDefaultLanguage ${options.mime.defaultLanguage}\n`;
    }

    if (options.mime.languages) {
      Object.keys(options.mime.languages)
        .filter(language => options.mime.languages[language])
        .forEach((language) => {
          htaccess += `\tAddLanguage ${language} ${options.mime.languages[language]}\n`;
        });
    }

    if (options.mime.charsets) {
      Object.keys(options.mime.charsets)
        .filter(charset => options.mime.charsets[charset])
        .forEach((charset) => {
          htaccess += `\tAddCharset ${charset} ${options.mime.charsets[charset]}\n`;
        });
    }

    if (options.mime.types) {
      Object.keys(options.mime.types)
        .filter(type => options.mime.types[type])
        .forEach((type) => {
          htaccess += `\tAddType ${type} ${options.mime.types[type]}\n`;
        });
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** mod_rewrite ***** */

  if (options.rewrite) {
    htaccess += '<IfModule mod_rewrite.c>\n';
    htaccess += '\tRewriteEngine on\n';

    if (options.rewrite.options) {
      htaccess += `\tRewriteOptions ${options.rewrite.options}\n`;
    }

    // https://htaccessbook.com/control-request-methods/
    if (options.rewrite.allowedMethods) {
      htaccess += `\tRewriteCond %{REQUEST_METHOD} !^(${options.rewrite.allowedMethods.filter(m => m).join('|')}) [NC]\n`;
      htaccess += '\tRewriteRule (.*) - [F,L]\n';
    }

    if (options.rewrite['404']) {
      htaccess += '\tRewriteCond %{REQUEST_FILENAME} !-s\n';
      htaccess += '\tRewriteCond %{REQUEST_FILENAME} !-l\n';
      htaccess += '\tRewriteCond %{REQUEST_FILENAME} !-d\n';
      htaccess += `\tRewriteRule ^(.*)$ ${options.rewrite['404']} [L,R=302]\n`;
    }

    if (options.rewrite.httpsRedirect) {
      htaccess += '\tRewriteCond %{HTTPS} off\n';
      htaccess += '\tRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n';
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** mod_speling ***** */

  if (options.spelling) {
    // (Yes, it really is spelled this way)
    htaccess += '<IfModule mod_speling.c>\n';

    if (options.spelling.check) {
      htaccess += '\tCheckSpelling on\n';
    } else {
      htaccess += '\tCheckSpelling off\n';
    }

    htaccess += '</IfModule>\n';
  }

  /* ***** ***** ***** */

  return htaccess;
};

module.exports = (options) => {
  /**
   * Defaults are set with recommendations from the following websites:
   *  - https://htaccessbook.com/useful-htaccess-rules
   *  - https://perishablepress.com/stupid-htaccess-tricks
   *  - https://varvy.com/pagespeed/enable-compression.html
   */
  options = deepmerge({
    dir: {
      index: 'index.html index.htm index.php index.cgi',
    },
    core: {
      options: {
        followSymlinks: true,
        indexes: false,
        multiViews: false,
      },
      defaultCharset: 'utf-8',
      serverSignature: false,
    },
    headers: {
      etag: false,
    },
    gzip: {
      canNegotiate: true,
      dechunk: true,
      include: [
        'file .(html?|txt|css|js|php|pl)$',
        'handler ^cgi-script$',
        'mime ^text/.*',
        'mime ^application/x-javascript.*',
      ],
      exclude: [
        'reqheader "User-agent: Mozilla/4.0[678]"',
        'mime ^image/.*',
        'rspheader ^Content-Encoding:.*gzip.*',
      ],
    },
    rewrite: {
      options: 'Inherit',
    },
  }, options || {});

  return (files, metalsmith, done) => {
    const htaccess = generate(options);

    files['.htaccess'] = {
      contents: Buffer.from(htaccess),
    };

    done();
  };
};
