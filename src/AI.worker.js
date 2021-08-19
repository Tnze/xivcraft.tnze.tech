function NewStatus(JsStatus, data) {
    return new JsStatus(
        data.attr.level,
        data.attr.craftsmanship,
        data.attr.control,
        data.attr.craftPoint,
        false,
        data.recipe.recipeLevel,
        data.recipe.baseLevel,
        data.recipe.progress,
        data.recipe.quality,
        data.recipe.durability,
    )
}

let AI = null;
let StartStatus = null;

onmessage = function (e) {
    switch (e.data.action) {
        case "init":
            import("bp_solver_wasm").then(m => {
                StartStatus = () => NewStatus(m.JsStatus, e.data);
                let status = NewStatus(m.JsStatus, e.data);
                let craftsAi = new m.CraftsAI(status);
                console.log("Starting calculating solver");
                craftsAi.init((s, p) => postMessage({
                    action: "loading",
                    loading: {
                        stage: s,
                        progress: p,
                    }
                }));
                console.log("Solver prepared");
                status.free()
                AI = craftsAi
            }).catch(console.error);
            break;

        case "resolve":
            console.log("Resolving: ", e.data.pre)
            if (AI && StartStatus) {
                let status = StartStatus();
                for (let sk of e.data.pre) {
                    status.cast_skills(sk);
                }
                let result = AI.resolve(status);
                console.log("Resolve result:", result);
                postMessage({action: 'result', result: result});
            } else {
                console.log("Resolver not prepared:", AI, StartStatus)
            }
            break;
        default:
            console.log("unknown action:", e.data.action)
    }
};