
export function keywordFilter(keywords, filter, filterType) {
    try {
        // Basic validation
        if (!Array.isArray(keywords)) {
            console.error("keywordFilter error: 'keywords' must be an array");
            return null;
        }

        if (typeof filterType !== 'string' || filter.trim() === '') {
            console.error("keywordFilter error: 'filter' must be a non-empty string");
        }

        if (typeof filter !== 'string') {
            console.error("keywordFilter error: 'filterType' must be a string");
            return null;
        }

        // Normalize filter and filterType to lowercase
        const type = filterType.toLowerCase();
        const f = filter.toLowerCase();

        let result;

        // filter logic
        switch (type) {
            case "includes":
                result = keywords.filter(k => typeof k === 'string' &&
                    k.toLowerCase().includes(f));
                break;

            case "startsWith":
                result = keywords.filter(k => typeof k === 'string' &&
                    k.toLowerCase().startsWith(f));
                break;

            case "endsWith":
                result = keywords.filter(k => typeof k === 'string' &&
                    k.toLowerCase().endsWith(f));
                break;

            default:
                console.error(`keywordFilter error: unknown filterType '${filterType}'`);
                return null;
        }

        return result;

    // Error handling
    } catch (error) {
        console.error(`keywordFilter error: ${error}`);
        return null;
    }
}