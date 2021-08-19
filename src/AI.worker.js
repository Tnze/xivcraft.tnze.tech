onmessage = function (e) {
    let status = null;
    let craftsAi = null;
    switch (e.data.action) {
        case "init":
            import("bp_solver_wasm").then(m => {
                status = new m.JsStatus(
                    e.data.attr.level,
                    e.data.attr.craftsmanship,
                    e.data.attr.control,
                    e.data.attr.craftPoint,
                    false,
                    e.data.recipe.recipeLevel,
                    e.data.recipe.baseLevel,
                    e.data.recipe.progress,
                    e.data.recipe.quality,
                    e.data.recipe.durability,
                );
                craftsAi = new m.CraftsAI(status);
                console.log("Starting calculating solver")
                craftsAi.init((s, p) => postMessage({
                    action: "loading",
                    loading: {
                        stage: s,
                        progress: p,
                    }
                }))
            }).catch(console.error);
            break;
        default:
            console.log("unknown action:", e.data.action)
    }
    postMessage("");
};