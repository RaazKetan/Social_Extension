document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('linkForm');
    const platformInput = document.getElementById('platform');
    const urlInput = document.getElementById('url');
    const linkList = document.getElementById('linkList');
  
    function saveLink(platform, url) {
      chrome.storage.sync.get(['links'], (result) => {
        const links = result.links || {};
        links[platform] = url;
        chrome.storage.sync.set({ links }, () => {
          renderLinks();
        });
      });
    }
  
    function deleteLink(platform) {
      chrome.storage.sync.get(['links'], (result) => {
        const links = result.links || {};
        delete links[platform];
        chrome.storage.sync.set({ links }, () => {
          renderLinks();
        });
      });
    }
  
    function renderLinks() {
      chrome.storage.sync.get(['links'], (result) => {
        const links = result.links || {};
        linkList.innerHTML = '';
        for (const platform in links) {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${links[platform]}" target="_blank">${platform}</a> <button class="delete" data-platform="${platform}">Delete</button>`;
          linkList.appendChild(li);
        }
      });
    }
  
    linkForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const platform = platformInput.value.trim();
      const url = urlInput.value.trim();
      if (platform && url) {
        saveLink(platform, url);
        platformInput.value = '';
        urlInput.value = '';
      }
    });
  
    linkList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete')) {
        const platform = event.target.getAttribute('data-platform');
        deleteLink(platform);
      }
    });
  
    renderLinks();
  });
  