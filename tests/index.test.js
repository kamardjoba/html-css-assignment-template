const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

let dom;
let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
  dom = new JSDOM(html, {
    resources: "usable",
    runScripts: "dangerously"
  });
  document = dom.window.document;
});

test('Page has a title element with id "title"', () => {
  const title = document.querySelector('#title');
  expect(title).not.toBeNull();
  expect(title.textContent.trim().length).toBeGreaterThan(0);
});

test('Page contains a button with text "Send"', () => {
  const button = document.querySelector('button');
  expect(button).not.toBeNull();
  expect(button.textContent.trim()).toBe('Send');
});

test('Page has a <ul> with at least 3 <li> elements', () => {
  const ul = document.querySelector('ul');
  expect(ul).not.toBeNull();
  expect(ul.querySelectorAll('li').length).toBeGreaterThanOrEqual(3);
});

test('Page has a table with at least 1 row and 1 cell', () => {
  const table = document.querySelector('table');
  expect(table).not.toBeNull();
  const rows = table.querySelectorAll('tr');
  expect(rows.length).toBeGreaterThan(0);
  const firstRowCells = rows[0].querySelectorAll('td, th');
  expect(firstRowCells.length).toBeGreaterThan(0);
});

test('Page has a working <a> tag with href attribute', () => {
  const link = document.querySelector('a');
  expect(link).not.toBeNull();
  expect(link.getAttribute('href')).toMatch(/^https?:\/\//);
});

test('HTML page is linked to an external CSS file', () => {
  const link = document.querySelector('link[rel="stylesheet"]');
  expect(link).not.toBeNull();
  expect(link.getAttribute('href')).toContain('style/style.css');
});

test('Container has class "container"', () => {
  const container = document.querySelector('.container');
  expect(container).not.toBeNull();
});

test('Header (h1) has font-size defined in CSS', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../style/style.css'), 'utf8');
  expect(css).toMatch(/h1\s*{[^}]*font-size\s*:/);
});

test('Button has background color defined in CSS', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../style/style.css'), 'utf8');
  expect(css).toMatch(/button\s*{[^}]*background-color\s*:/);
});

test('Page uses table borders in CSS', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../style/style.css'), 'utf8');
  expect(css).toMatch(/table\s*{[^}]*border\s*:/);
});