const fetch = require("node-fetch")

class ScriptbloxAPI {
    constructor(apiRoot = "https://scriptblox.com") {
        this.apiUrl = `${apiRoot}/api`;
        this.booleanReplacements = ["verified", "universal", "patched", "key"]
    }

    processBoolReplacements(params) {
        const processedParams = { ...params };

        for (const key of this.booleanReplacements) {
            if (this.booleanReplacements.includes(key)) {
                processedParams[key] = processedParams[key] === true ? 1 : 0
            }
        }
        return processedParams;
    }

    async getReqJson(endpoint, queryParams = {}) {
        const queryString = new URLSearchParams(
            Object.entries(queryParams).filter(([, value]) => value !== null && value !== undefined)
        ).toString();

        const url = `${this.apiUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        return response.json();
    }

    async postReq(endpoint, payload) {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        return response.json();
    }

    getScripts(options = {}) {
        let params = { page: 1, max: 20, sortBy: "updatedAt", order: "desc", ...options };
        params = this.processBoolReplacements(params)
        return this.getReqJson("/script/fetch", params);
    }

    findScript(scriptId) {
        return this.getReqJson(`/script/${encodeURIComponent(scriptId)}`);
    }

    async getScriptSource(scriptId) {
        const url = `${this.apiUrl}/script/raw/${encodeURIComponent(scriptId)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Api request failed, status code: ${response.status}`);
        }
        return response.text();
    }

    findScripts(query, options = {}) {
        if (!query) {
            throw new Error("You didn't specify a query.");
        }
        let params = { page: 1, max: 20, strict: true, ...options, q: query };
        params = this.processBoolReplacements(params)
        return this.getReqJson("/script/search", params);
    }

    getTrendingScripts() {
        return this.getReqJson("/script/trending");
    }

    getExecutorList() {
        return this.getReqJson("/executor/list");
    }

    modifyExecutor(data) {
        if (!data || !data.id || !data.api_key) {
            throw new Error(`You didn't specify: ${data.id == null ? "executor id" : "api key"}.`);
        }
        return this.postReq("/executor/update", data);
    }
}

const ScriptFilters = {
    sortBy: {
        views: "views",
        likes: "likeCount",
        dislikes: "dislikeCount",
        creationDate: "createdAt",
        updateDate: "updatedAt",
        accuracy: "accuracy",
    },
    order: {
        ascending: "asc",
        descending: "desc",
    },
    mode: {
        free: "free",
        paid: "paid",
    },
};

module.exports = {
    ScriptbloxAPI: ScriptbloxAPI,
    ScriptFilters: ScriptFilters,
    default: ScriptbloxAPI
};
