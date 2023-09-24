export function validator(formData, validation) {
    let validationResult = { result: true, items: {} };

    for (const item in formData) {
        let value = formData[item];

        while (value[0] === " ") {
            value = value.slice(1);
        }

        while (typeof value == "string" && value.at(-1) === " ") {
            value = value.slice(0, -1);
        }

        for (const key in validation[item]) {
            switch (key) {
                case "minLength":
                    if (value.length < validation[item][key][0]) {
                        validationResult.result = false;
                        if (!validationResult.items[item]) validationResult.items[item] = [];

                        validationResult.items[item].push(validation[item][key][1]);
                    }
                    continue;
                case "maxLength":
                    if (value.length > validation[item][key][0]) {
                        validationResult.result = false;
                        if (!validationResult.items[item]) validationResult.items[item] = [];

                        validationResult.items[item].push(validation[item][key][1]);
                    }
                    continue;

                case "reqired":
                    if (validation[item][key][0] && value === "") {
                        validationResult.result = false;
                        if (!validationResult.items[item]) validationResult.items[item] = [];

                        validationResult.items[item].push(validation[item][key][1]);
                    }
                    continue;

                case "fileTypes":
                    if (
                        "reqired" in validation[item] &&
                        (
                            validation[item]["reqired"][0] &&
                            value.type.split("/").at(-1) === "octet-stream"
                        )
                    ) {
                        validationResult.result = false;
                        if (!validationResult.items[item]) validationResult.items[item] = [];
                        validationResult.items[item].push(validation[item]["reqired"][1]);
                    }

                    if (
                        !validation[item][key][0]
                            .includes(
                                value.type.split("/").at(-1)
                            )
                    ) {
                        validationResult.result = false;
                        if (!validationResult.items[item]) validationResult.items[item] = [];
                        validationResult.items[item].push(validation[item][key][1]);
                    }
                    continue;

                case "containmentRules":
                    if (!validation[item][key][0].test(value)) {
                        validationResult.result = false;
                        if (!validationResult.items[item]) validationResult.items[item] = [];
                        validationResult.items[item].push(validation[item][key][1]);
                    }
                    continue;
                    
                default:
                    continue;
            }
        }
    }

    return validationResult;
}