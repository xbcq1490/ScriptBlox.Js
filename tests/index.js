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
    console.log("GetScripts:", scripts.result.scripts)

    const foundScript = await api.findScript(scripts.result.scripts[0]._id);
    console.log("FindScript:", foundScript.script)

    const scriptSource = await api.getScriptSource(scripts.result.scripts[0]._id);
    console.log("GetScriptSource:", scriptSource)

    const searchResults = await api.findScripts("99 nights")
    console.log("FindScripts:", searchResults.result.scripts)

    const trendingScripts = await api.getTrendingScripts()
    console.log("GetTrendingScripts:", trendingScripts.result.scripts)

    // for executors

    const executors = await api.getExecutorList()
    console.log("GetExecutorList:", executors)

    //api.modifyExecutor({api_key: "idk what ur api key is"})
}

main();