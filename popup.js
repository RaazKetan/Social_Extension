document.addEventListener('DOMContentLoaded', () => {
  const linkForm = document.getElementById('linkForm');
  const platformInput = document.getElementById('platform');
  const urlInput = document.getElementById('url');
  const linkList = document.getElementById('linkList');
  let editMode = false;
  let editPlatform = '';

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

  function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  function renderLinks() {
    chrome.storage.sync.get(['links'], (result) => {
      const links = result.links || {};
      linkList.innerHTML = '';
      for (const platform in links) {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${links[platform]}" target="_blank">${platform}</a>
          <button class="icon copy" data-url="${links[platform]}">
            <img src="img/copy.png" alt="Copy">
          </button>
          <button class="icon edit" data-platform="${platform}" data-url="${links[platform]}">
            <img src="img/edit.png" alt="Edit">
          </button>
          <button class="icon delete" data-platform="${platform}">
            <img src="img/delete.png" alt="Delete">
          </button>
        `;
        linkList.appendChild(li);
      }
    });
  }

  linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const platform = platformInput.value.trim();
    const url = urlInput.value.trim();
    if (platform && url) {
      if (editMode) {
        deleteLink(editPlatform); // Remove old entry if editing
        editMode = false;
        editPlatform = '';
      }
      saveLink(platform, url);
      platformInput.value = '';
      urlInput.value = '';
    }
  });

  linkList.addEventListener('click', (event) => {
    if (event.target.closest('.delete')) {
      const platform = event.target.closest('.delete').getAttribute('data-platform');
      deleteLink(platform);
    } else if (event.target.closest('.copy')) {
      const url = event.target.closest('.copy').getAttribute('data-url');
      copyLink(url);
    } else if (event.target.closest('.edit')) {
      const platform = event.target.closest('.edit').getAttribute('data-platform');
      const url = event.target.closest('.edit').getAttribute('data-url');
      platformInput.value = platform;
      urlInput.value = url;
      editMode = true;
      editPlatform = platform;
    }
  });

  renderLinks();
});
