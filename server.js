const http = require('http');
const PORT = 3002;
const fs = require('fs');
const path = require('path');
const cache = new Map();

const app = http.createServer((req, res) => {
  const pathname = getPathname(req);
  setHeader(res, 'content-type', pathname);
  if (isStatic(pathname)) {
    if (!isExist(pathname)) {
      res.end('404 Not Found');
      return;
    }
    if (!cache.get(pathname)) {
      cache.set(pathname, readFile(pathname, 'binary'));
    }
    const body = cache.get(pathname);
    res.write(body);
    res.end();
    return;
  }
  // logic
  res.end(
    JSON.stringify({
      name: 'xiaoming',
      age: 8,
    })
  );
});

function readFile(filename, code = 'utf-8') {
  return fs.readFileSync(resolve(filename), code);
}

function resolve(filename) {
  return path.resolve(__dirname, `.${filename}`);
}

function isStatic(pathname) {
  return (
    pathname.endsWith('.js') ||
    pathname.endsWith('.html') ||
    pathname.endsWith('.css')
  );
}
function setHeader(res, type, pathname) {
  switch (type) {
    case 'content-type':
      setContentType(res, pathname);
      break;
    default:
      break;
  }
}

function setContentType(res, pathname) {
  let isJSON = true;
  const contentType = {
    '\\.js$': 'text/javascript;charset=utf-8',
    '\\.html$': 'text/html;charset=utf-8',
    '\\.css$': 'text/css;charset=utf-8',
    default: 'application/json;charset=utf-8',
  };
  Object.keys(contentType).forEach((reg) => {
    if (new RegExp(reg).test(pathname)) {
      res.setHeader('content-type', contentType[reg]);
      isJSON = false;
    }
  });

  if (isJSON) res.setHeader('content-type', contentType.default);
}

function getPathname(req) {
  const url = req.url;
  if (url === '' || url === '/') {
    return '/index.html';
  }
  return url;
}

function isExist(pathname) {
  return fs.existsSync(resolve(pathname));
}
process.on('uncaughtException', (e) => {
  console.log(e.message);
  if (e.stack) {
    console.log(e.stack);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:3002/`);
});
