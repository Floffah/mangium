class Query {
    constructor() {
        this.query = [];
    }

    /**
     * "SELECT fields"
     * @param {String[]} fields
     * @returns {Query}
     */
    select(fields) {
        if(this.query[0] !== undefined && this.query[0] !== null) {
            this.query[0] = {
                type: 'select',
                fields,
            };
        } else {
            throw new Error('Can only be one type of query. Already has query type ' + this.query[0].type);
        }
    }

    /**
     * "FROM table"
     * @param {String} table
     */
    from(table) {
        if(this.query[0].type === 'select') {
            this.query[0].from = table;
        } else {
            throw new Error('Query.from() can only be used on: select query types')
        }
    }

    /**
     * "WHERE condition"
     * @param condition
     */
    where(condition) {
        this.query[1] = {
            type: 'where',
            condition,
        }
    }
}

module.exports = Query;
