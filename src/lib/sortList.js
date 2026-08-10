// Items and criteria inputs are arrays
export function sortList(items, criteria = []) {
    try {
        // Items parameter must be an array
        if (!Array.isArray(items)) {
            return null;
        }
        
        // If the criteria is not an array, convert it to an array
        if (!Array.isArray(criteria)) {
            criteria = [criteria];
        }

        // Return input items array if criteria is empty
        if (criteria.length === 0) {
            return [...items];
        }

        // Create array copy
        const sortedArray = [...items];

        // Set rules for sorting
        const [rule1, rule2] = criteria;
        
        // Check the rules for sort order and data to sort by
        const compare = (a, b, rule) => {
            if (!rule?.key) return 0;
            const valA = a?.[rule.key];
            const valB = b?.[rule.key];

            // If values are undefined or equal, return 0
            if (valA === undefined || valB === undefined || valA === valB) return 0;
            
            // Sort order based on criteria
            const isDesc = ['desc', 'descending'].includes(String(rule.direction).toLowerCase());
            const multiplier = isDesc ? -1 : 1; 
            
            let diff = 0;

            // Compare similar data type values
            if (typeof valA === 'string' && typeof valB === 'string') {
                diff = valA.localeCompare(valB);
            } else if (typeof valA === 'number' && typeof valB === 'number') {
                diff = valA - valB;
            } else if (valA < valB) {
                diff = -1;
            } else {
                diff = 1;
            }
            
            // Use for determining if sort by ascending or descending order
            return diff * multiplier;
        };

        // Return a sorted array based on the first and second criteria
        return sortedArray.sort((a, b) => compare(a, b, rule1) || compare(a, b, rule2));

    } catch (error) {
        // On error, return null
        return null;
    }
}
