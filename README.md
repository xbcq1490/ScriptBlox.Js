<img src="./docs/logo.png" style="height:64px;margin-right:32px"/>

***

### Simple Node.js binding for ScriptBlox's API

## Features

- **Get Scripts**: Get scripts with premade filters (likes, date, universal, verified, key required, etc.)
- **Find \& Search Scripts**: Fetch scripts by ID or search query
- **Script Details**: Fetch information about a specific script, like: title, description, game, source, etc.
- **Trending Scripts**: View what's trending on ScriptBlox
- **Executors**: Get available executors and their details (platforms, links, etc)
- **Readable output**: Consistent output ensures easy integration
- **One dependency**: Meaning its lightweight and fast (`node-fetch`)

***

## 📦 Installation

```bash
npm install scriptbloxjs
```


***

## 🚀 Quick Start

```javascript
const { ScriptbloxAPI, ScriptFilters } = require("scriptbloxjs");

async function main() {
  const api = new ScriptbloxAPI();

  // Get scripts sorted by most likes
  const scripts = await api.getScripts({
    sortBy: ScriptFilters.sortBy.likes,
    universal: false,
    verified: false,
    key: true,
    patched: false,
    mode: ScriptFilters.mode.free,
  });

  console.log("GetScripts:", scripts.result.scripts);

  // look up a script by ScriptBlox ID
  const foundScript = await api.findScript(scripts.result.scripts[^0]._id);
  console.log("FindScript:", foundScript.script);

  // get the raw script source
  const scriptSource = await api.getScriptSource(scripts.result.scripts[^0]._id);
  console.log("GetScriptSource:", scriptSource);

  // search for scripts using a search query
  const searchResults = await api.findScripts("99 nights");
  console.log("FindScripts:", searchResults.result.scripts);

  // fetch trending scripts
  const trendingScripts = await api.getTrendingScripts();
  console.log("GetTrendingScripts:", trendingScripts.result.scripts);

  // get script executors
  const executors = await api.getExecutorList();
  console.log("GetExecutorList:", executors);

  // modify executor details (restricted access - provide your API key)
  // await api.modifyExecutor({ api_key: "your-api-key", ... });
}

main();
```


***

## 📖 Usage Examples

### Basic Retrieval

```javascript
const { ScriptbloxAPI, ScriptFilters } = require("scriptbloxjs");

const api = new ScriptbloxAPI();
api.getScripts({
  sortBy: ScriptFilters.sortBy.likes,
  universal: false,
}).then(r => console.log(r.result.scripts));
```


### Get Detailed Script Info by ID

```javascript
const foundScript = await api.findScript("67abda801565ea1f4ef7cc7f");
console.log(foundScript.script);
// Includes id, title, game, description, owner, likes, dislikes, etc
```


### Get the Script Source

```javascript
const source = await api.getScriptSource("67abda801565ea1f4ef7cc7f");
console.log(source); // The raw script code (loadstring/game:HttpGet...)
```


### Keyword Search

```javascript
const search = await api.findScripts("99 nights");
console.log(search.result.scripts);
// Array of script objects that match. Perfect for fuzzy searching games.
```


### Trending Scripts

```javascript
const trending = await api.getTrendingScripts();
console.log(trending.result.scripts);
// See hot, popular scripts right now.
```


### Executor List

```javascript
const executors = await api.getExecutorList();
console.log(executors);
// Get up-to-date executor info (platform, version, links, etc.)
```


***

## 📝 Output Example

When calling `getScripts`, you receive an array of script objects like this:

```js
[
  {
    _id: '67abda801565ea1f4ef7cc7f',
    title: 'OVERHUB Bypass the Unbypassable',
    game: {
      gameId: 18668065416,
      name: '[YUKI] Blue Lock: Rivals',
      imageUrl: 'https://tr.rbxcdn.com/180DAY-dabed1e5d8623a16643e190866c74902/480/270/Image/Png/noFilter'
    },
    slug: 'Blue-Lock:-Rivals-OVER-HUB-OP-AUTO-GOAL-29167',
    verified: false,
    key: true,
    views: 111168,
    scriptType: 'free',
    isUniversal: false,
    isPatched: false,
    createdAt: '2025-02-11T23:17:20.596Z',
    image: '/images/script/18668065416-1739315840546.png',
    script: 'loadstring(game:HttpGet("https://rawscripts.net/raw/Blue-Lock:-Rivals-OVER-HUB-OP-AUTO-GOAL-29167"))()'
  },
  // ...more
]
```

Use script IDs for further lookups.

***

## 📋 API Reference

### `new ScriptbloxAPI()`

Create a new instance of the API.

### `getScripts(options)`

Retrieve scripts, filtered using:

- **sortBy**: Likes, date, views (ScriptFilters.sortBy.*
- **universal**: true/false
- **verified**: true/false
- **key**: Requires key? true/false
- **patched**: Only unpatched? false
- **mode**: `free` or `paid`

Returns:
`{ result: { scripts: [ ... ] } }`

***

### `findScript(id)`

Lookup full details on a script using an id.

***

### `getScriptSource(id)`

Fetch the raw code of a script using an id.

***

### `findScripts(keyword, options)`

Search using a query, adjustable options with ScriptFilters.

***

### `getTrendingScripts()`

Get trending scripts.

***

### `getExecutorList()`

Get available executor apps. Returns array with name, platform, patch, website, etc.

***

### `modifyExecutor({api_key, ...})`

*Admin only*: Modify executor info by supplying your API key.

***

## ⚠️ Disclaimers

- **CommonJS** - This binding uses commonjs and I haven't tested it on ES6 and above.
- **Node-fetch** - Uses `node-fetch@2`, primarily because of the support for commonjs.
***

## 🔧 Error Handling

All API calls return well-structured results. Common issues:

- **Invalid script id** - Throws an error with the response code and reason.

***

## 🐛 Issues

Did you encounter an issue? Open them on this GitHub page! https://github.com/xbcq1490/ScriptBloxJs/issues

***

**Made with ❤️ for the Roblox scripting community**