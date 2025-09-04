const {ScriptbloxAPI, ScriptFilters} = require("../index");

async function main() {
    const api = new ScriptbloxAPI();

    // for scripts

    const scripts = await api.getScripts({
        sortBy: ScriptFilters.sortBy.likes,
        universal: false,
        verified: false,
        key: true,
        patched: false,
        mode: ScriptFilters.mode.free
    })
    console.log(scripts.result.scripts)

    const foundScript = await api.findScript(scripts.result.scripts[0]._id);
    console.log(foundScript.script)

    const scriptSource = await api.getScriptSource(scripts.result.scripts[0]._id);
    console.log(scriptSource)

    const searchResults = await api.findScripts("99 nights")
    console.log(searchResults.result.scripts)

    const trendingScripts = await api.getTrendingScripts()
    console.log(trendingScripts.result.scripts)

    // for executors

    const executors = await api.getExecutorList()
    console.log(executors)

    api.modifyExecutor({api_key = "idk what ur api key is"})
}

main();