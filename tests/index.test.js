const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Page contains title with correct text', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
  const dom = new JSDOM(html);
  const h1 = dom.window.document.querySelector('#title');
  expect(h1).not.toBeNull();
  expect(h1.textContent).toBe('Hello World');
});