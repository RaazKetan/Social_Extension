
# Anchor - Chrome Extension


Anchor is a Chrome extension that allows users to manage their favorite links easily. Users can add, update, delete, and copy links, making it a handy tool for quick access to frequently used URLs.

## Features

- Add and update links with a platform name and URL.
- Delete existing links.
- Copy link URLs to the clipboard.
- Visual feedback for link actions.


## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/RaazKetan/Social_Extension.git
   cd my-chrome-extension
   ```

## Install the dependencies:
```
 npm install
 ```
## Usage

- Load the extension in Chrome:
- Open Chrome and go to chrome://extensions/.
- Enable "Developer mode" by clicking the toggle switch in the top right corner.
- Click the "Load unpacked" button and select the directory where you cloned this repository.
- Open the extension popup by clicking the extension icon in the Chrome toolbar.

- Use the form to add or update links, and manage your list of links using the provided buttons.


### Development
Folder Structure
```
my-chrome-extension/
│
├── .gitignore
├── package.json
├── popup.html
├── popup.css
├── popup.js
├── popup.test.js
├── README.md
└── node_modules/ (after running npm install)
```
## Running Tests
We use Jest for unit testing. To run the tests, use the following command:

```
npm test
```
## Adding a new feature
- Create a new branch for your feature:

```
git checkout -b feature-name
```
## Implement your feature and write tests for it.

- Commit your changes:

```
git commit -am "Add new feature"
```
Push the branch to GitHub:

```
git push origin feature-name
```
Open a pull request to merge your feature branch into the main branch.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Open to Edits and Forks
This project is open to edits and forks. Feel free to fork the repository and make any updates or improvements. If you have any suggestions or changes, please open an issue or submit a pull request. We welcome contributions from everyone!

License
This project is licensed under the MIT License. See the LICENSE file for details.


### Additional Notes

1. **Screenshots**: Add a screenshot of your extension in action and place it in the root directory of your project. Update the `README.md` to include the path to this screenshot.
2. **License**: Include a `LICENSE` file in your project directory. The `README.md` references this file.
3. **Repository URL**: Replace `https://github.com/RaazKetan/Social_Extension.git` with the actual URL of your GitHub repository.

This updated `README.md` now includes a section that encourages users to edit, fork, and contribute to the repository, ensuring the project is open to updates and improvements from anyone.







