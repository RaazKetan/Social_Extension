/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './popup.html'), 'utf8');

let dom;
let document;

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  document = dom.window.document;
});

describe('Link Manager', () => {
  it('should render the form correctly', () => {
    const platformInput = document.getElementById('platform');
    const urlInput = document.getElementById('url');
    const button = document.querySelector('button[type="submit"]');

    expect(platformInput).not.toBeNull();
    expect(urlInput).not.toBeNull();
    expect(button).not.toBeNull();
    expect(button.textContent).toBe('Add/Update Link');
  });

  it('should validate URL input before saving', () => {
    const platformInput = document.getElementById('platform');
    const urlInput = document.getElementById('url');
    const linkForm = document.getElementById('linkForm');

    platformInput.value = 'Test Platform';
    urlInput.value = 'invalid-url';

    const event = new dom.window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });

    linkForm.dispatchEvent(event);

    expect(urlInput.classList.contains('invalid')).toBe(true);
  });

  it('should add a new link', () => {
    const platformInput = document.getElementById('platform');
    const urlInput = document.getElementById('url');
    const linkForm = document.getElementById('linkForm');
    const linkList = document.getElementById('linkList');

    platformInput.value = 'Test Platform';
    urlInput.value = 'https://www.example.com';

    const event = new dom.window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });

    linkForm.dispatchEvent(event);

    expect(linkList.children.length).toBe(1);
    const listItem = linkList.children[0];
    expect(listItem.querySelector('a').href).toBe('https://www.example.com/');
    expect(listItem.querySelector('a').textContent).toBe('Test Platform');
  });
});
