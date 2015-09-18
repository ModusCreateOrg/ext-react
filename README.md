# ext-react
Helping Ext JS developers get up to speed with React

## Q&A
**Q:** `sencha app watch` doesn't work here. How do I run this thing?

**A:** That's a wonderful question. Thank you for checking out this repo. Your business is very valuable to us. You're amazing. How's the cave?

1. Run `npm install`. Please don't `sudo`. That's a n👀bie thing to do. Note: If the `Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.` message shows up, open Xcode and accept the new user agreement. Then re-run `npm install`
2. Run `npm start`
3. Navigate your browser to `http://localhost:3000`

Bonus steps. These are not required, but may be fun or helpful. 

- Use Chrome
- Install [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- Enable [experimental support for ES6](chrome://flags/#enable-javascript-harmony) in Chrome: `chrome://flags/#enable-javascript-harmony`

----

**Todo** (in no particular order):

- [ ] Intro
  - [ ] Requirements (experience, etc)
  - [ ] How to run the demos
  - [ ] How to write new demos
  - [ ] JSX fundamentals
  - [ ] Virtual DOM
  - [ ] ES6 primer
- [x] Class system
  - [x] Hello World
  - [x] Hello user
- [ ] Component data models
  - [ ] Properties
  - [ ] State
  - [ ] Context
  - [x] Combine all in one example (List)
- [ ] JSX vs Object notation
- [ ] When JSX is not enough - dynamic component creation
- [ ] React.factory and cloning 
- [ ] Styling
- [ ] Flux
- [ ] Flux vs MVC/MVVC/MVVM
- [ ] Stateless components (may require the next version of React)
- [ ] Components vs Containers
- [ ] Architecture
  - [ ] Bootstrapping an app from scratch
    - [ ] `npm init`
    - [ ] Managing dependencies
    - [ ] File/Folder structure
    - [ ] index.html
    - [ ] Sample hello world app
  - [ ] Webpack vs JSPM
  - [ ] Conventions
- [ ] Creating a custom library/plugin
  - [ ] Creating a sample library
  - [ ] Including the sample library (`npm link`, `import`,...)
  - [ ] Publishing on npm
- [ ] How ES6 helps deliver better components
  - [ ] Fix autobinding
  - [ ] `import` (modules)
  - [ ] Grouping modules in one package (hint: folder - index.js)
  - [ ] Using object spread in JSX
  - [ ] Tricks with destructuring
  - [ ] ... (add more)
- [ ] Hot Reloading
- [ ] Universal (isomorphic) apps
- [ ] React Router
- [ ] Redux
