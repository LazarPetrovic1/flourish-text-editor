# The help page

This application has been made using the following packages:

<ul>
<li><a title="framework" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://www.electronjs.org/">electron</a></li>
<li><a title="framework/library?" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://reactjs.org/">react</a></li>
<li><a title="package/component" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://github.com/securingsincity/react-ace">react-ace</a></li>
<li><a title="package/management" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://redux.js.org/">redux</a></li>
<li><a title="package/component-lib" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://reactrouter.com/">react-router</a></li>
<li><a title="package/styler" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://styled-components.com/">styled-components</a></li>
<li><a title="package/util" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://github.com/uuidjs/uuid">uuid</a></li>
<li><a title="package/systemic" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://www.npmjs.com/package/react-app-rewired">react-app-rewired</a></li>
<li><a title="package/util && package/component" style="cursor: help; color: rgb(86, 230, 135); text-decoration: none;" href="https://momentjs.com/">moment</a></li>
</ul>

### Table of contents

<ul>
  <li><a href="#why" style="color: rgb(86, 230, 135); text-decoration: none;">Why this project</a></li>
  <li><a href="#dev" style="color: rgb(86, 230, 135); text-decoration: none;">Development</a></li>
  <li><a href="#feats" style="color: rgb(86, 230, 135); text-decoration: none;">Features</a></li>
  <li><a href="#ask" style="color: rgb(86, 230, 135); text-decoration: none;">Ask questions</a></li>
</ul>

### <a name="why" style="color: rgb(86, 230, 135); text-decoration: none;"># Why this project</a>

I have been interested in making something fun that could be used by the community for a while.
Think of it like giving back to the community I have grown to love.
It is meant to be a simple text editor with some unique features and, if taken to its final instance,
actually be a viable alternative to the "*big free three*" (**[Atom](https://atom.io/)**, **[VSCode](https://code.visualstudio.com/)**  and **[Sublime](https://www.sublimetext.com/)**).

> Since I use Atom as my default text editor, this project was heavily inspired by it.

### <a name="dev" style="color: rgb(86, 230, 135); text-decoration: none;"># Development</a>

In order to experiment with this project:

```bash
git clone https://github.com/LazarPetrovic1/flourish-text-editor.git
cd flourish-text-editor
npm install
```

**Note: There are a lot of devDependencies in the project, so if they somehow didn't get installed, you should run the following command**

```bash
npm i -D
```

To run the project, simply type:

```bash
npm run dev
```

**Note: It takes about 5 seconds to run electron and react, so I added a 5-second animation of a spinning stencil flower**

![loading](help/loading.png)

### <a name="feats" style="color: rgb(86, 230, 135); text-decoration: none;"># Features</a>

The app is meant to have all the basic features found in other text editors:

***File*** menu

<table class="table_md">
<thead>
<tr>
<th>Feature</th>
<th>Shortcut</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Open File</td>
<td>Ctrl + O</td>
<td>Basic</td>
</tr>
<tr>
<td>Open Folder</td>
<td>Ctrl + Shift + O</td>
<td>Basic</td>
</tr>
<tr>
<td>Save File</td>
<td>Ctrl + S</td>
<td>Basic</td>
</tr>
<tr>
<td>Close File</td>
<td>Ctrl + W</td>
<td>Basic</td>
</tr>
<tr>
<td>CodeLine</td>
<td>Ctrl + Shift + I</td>
<td>Unique feature</td>
</tr>
</tbody>
</table>

***Helpers*** menu - unique feature

<table class="table_md">
<thead>
<tr>
<th style="text-align:left">Shortcut</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Ctrl + Alt + S</td>
<td style="text-align:left">Opens StackOverflow</td>
</tr>
<tr>
<td style="text-align:left">Ctrl + Alt + G</td>
<td style="text-align:left">Opens GitHub</td>
</tr>
<tr>
<td style="text-align:left">Ctrl + Alt + F</td>
<td style="text-align:left">Opens FontAwesome</td>
</tr>
<tr>
<td style="text-align:left">Ctrl + Alt + S</td>
<td style="text-align:left">Opens CDNjs</td>
</tr>
</tbody>
</table>


***Help*** menu

<table class="table_md">
<thead>
<tr>
<th style="text-align:left">Feature</th>
<th style="text-align:left">Shortcut</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Open Help File</td>
<td style="text-align:left">Ctrl + H</td>
</tr>
<tr>
<td style="text-align:left">View License</td>
<td style="text-align:left">Ctrl + Shift + ,</td>
</tr>
<tr>
<td style="text-align:left">See Project To Do List</td>
<td style="text-align:left">Ctrl + Shift + .</td>
</tr>
</tbody>
</table>

**Note: There's another dropdown menu in development aptly named "Dev"**. *Ctrl + Q* toggles development tools, while *Ctrl + R* reloads the app

### <a name="ask" style="color: rgb(86, 230, 135); text-decoration: none;"># Ask questions</a>

If you stumbled upon this and were interested, you might want to make an impact.
Open up an issue or a PR and I might implement it.
