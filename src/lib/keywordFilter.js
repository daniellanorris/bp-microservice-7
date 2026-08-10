export function keywordFilter(keywords, filter, filterType) {
    try {
        // Basic validation
        if (!Array.isArray(keywords)) {
            console.error("keywordFilter error: 'keywords' must be an array");
            return null;
        }

        if (typeof filterType !== 'string' || filterType.trim() === '') {
            console.error("keywordFilter error: 'filterType' must be a non-empty string");
            return null;
        }

        if (typeof filter !== 'string' || filter.trim() === '') {
            console.error("keywordFilter error: 'filter' must be a non-empty string");
            return null;
        }

        // Normalize filter and filterType
        const type = filterType.toLowerCase();
        const f = filter.toLowerCase();

        let result;

        // switch for string filtering
        switch (type) {
            case "includes":
                result = keywords.filter(
                    k =>
                        typeof k === 'string' &&
                        k.toLowerCase().includes(f)
                );
                break;

            case "startswith":
                result = keywords.filter(
                    k =>
                        typeof k === 'string' &&
                        k.toLowerCase().startsWith(f)
                );
                break;

            case "endswith":
                result = keywords.filter(
                    k =>
                        typeof k === 'string' &&
                        k.toLowerCase().endsWith(f)
                );
                break;

            // switch for rating filtering
            case "rating":
                result = keywords.filter(k => {
                    if (typeof k !== 'number') {
                        return false;
                    }

                    switch (f) {
                        case "high":
                            return k >= 7;

                        case "mid":
                            return k >= 5 && k < 7;

                        case "low":
                            return k < 5;

                        case "all":
                            return true;

                        default:
                            return false;
                    }
                });
                break;

            default:
                console.error(
                    `keywordFilter error: unknown filterType '${filterType}'`
                );
                return null;
        }

        return result;

    } catch (error) {
        console.error(`keywordFilter error: ${error}`);
        return null;
    }
}