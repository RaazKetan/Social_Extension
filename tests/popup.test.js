// tests/popup.test.js

const chrome = {
    storage: {
      sync: {
        get: jest.fn(),
        set: jest.fn()
      }
    }
  };
  
  global.chrome = chrome;
  global.navigator = {
    clipboard: {
      writeText: jest.fn()
    }
  };
  
  describe('Popup CRUD operations', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    test('saveLink should save a link', () => {
      const platform = 'Twitter';
      const url = 'https://twitter.com';
  
      chrome.storage.sync.get.mockImplementation((keys, callback) => callback({ links: {} }));
      chrome.storage.sync.set.mockImplementation((items, callback) => callback());
  
      const saveLink = (platform, url) => {
        chrome.storage.sync.get(['links'], (result) => {
          const links = result.links || {};
          links[platform] = url;
          chrome.storage.sync.set({ links });
        });
      };
  
      saveLink(platform, url);
  
      expect(chrome.storage.sync.get).toHaveBeenCalledWith(['links'], expect.any(Function));
      expect(chrome.storage.sync.set).toHaveBeenCalledWith({ links: { Twitter: url } });
    });
  
    test('deleteLink should delete a link', () => {
      const platform = 'Twitter';
      const links = { Twitter: 'https://twitter.com' };
  
      chrome.storage.sync.get.mockImplementation((keys, callback) => callback({ links }));
      chrome.storage.sync.set.mockImplementation((items, callback) => callback());
  
      const deleteLink = (platform) => {
        chrome.storage.sync.get(['links'], (result) => {
          const links = result.links || {};
          delete links[platform];
          chrome.storage.sync.set({ links });
        });
      };
  
      deleteLink(platform);
  
      expect(chrome.storage.sync.get).toHaveBeenCalledWith(['links'], expect.any(Function));
      expect(chrome.storage.sync.set).toHaveBeenCalledWith({ links: {} });
    });
  
    test('copyLink should copy link to clipboard', () => {
      const url = 'https://twitter.com';
  
      const copyLink = (url) => {
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard');
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      };
  
      copyLink(url);
  
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(url);
    });
  
    test('renderLinks should render links', () => {
      document.body.innerHTML = `
        <ul id="linkList"></ul>
      `;
  
      const links = {
        Twitter: 'https://twitter.com',
        Facebook: 'https://facebook.com'
      };
  
      chrome.storage.sync.get.mockImplementation((keys, callback) => callback({ links }));
  
      const renderLinks = () => {
        chrome.storage.sync.get(['links'], (result) => {
          const links = result.links || {};
          const linkList = document.getElementById('linkList');
          linkList.innerHTML = '';
          for (const platform in links) {
            const li = document.createElement('li');
            li.innerHTML = `
              <a href="${links[platform]}" target="_blank">${platform}</a>
              <button class="copy" data-url="${links[platform]}">Copy</button>
              <button class="delete" data-platform="${platform}">Delete</button>
            `;
            linkList.appendChild(li);
          }
        });
      };
  
      renderLinks();
  
      const linkList = document.getElementById('linkList');
      expect(linkList.innerHTML).toBe(`
        <li><a href="https://twitter.com" target="_blank">Twitter</a> <button class="copy" data-url="https://twitter.com">Copy</button> <button class="delete" data-platform="Twitter">Delete</button></li>
        <li><a href="https://facebook.com" target="_blank">Facebook</a> <button class="copy" data-url="https://facebook.com">Copy</button> <button class="delete" data-platform="Facebook">Delete</button></li>
      `);
    });
  });
  