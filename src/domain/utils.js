function buildWhereClause(sql, columns, constraint = 'AND') {
    if(columns.length) {
        sql += ' WHERE '
    }

    const mappedCols = columns.map((col, i) => `${col} = $${i + 1}`)

    return sql + mappedCols.join(` ${constraint} `)
}

function buildInsertInto(queryParams, database) {

    const paramKeys = Object.keys(queryParams)
    const paramValues = Object.values(queryParams)

    const joinedKeys = paramKeys.join()

    const mappedValues = paramValues.map((param, i) => `$${i + 1}`)
    const joinedValues = mappedValues.join()

    const sql = `INSERT INTO ${database} (${joinedKeys}) VALUES(${joinedValues})`

    return sql
}

function buildUpdateAndSet(queryParams, queryBody, database, constraint = 'AND') {
    const sql = `UPDATE ${database} SET`

    const paramKeys = Object.keys(queryParams)

    const numberOfParams = paramKeys.length

    const mappedParamKeys = paramKeys.map((col, i) => ` ${col} = $${i + 1}`)

    const bodyKeys = Object.keys(queryBody)

    const mappedBodyKeys = bodyKeys.map((col, i) => ` ${col} = $${i + numberOfParams + 1}`)

    return sql + mappedBodyKeys.join() + ' WHERE' + mappedParamKeys.join(` ${constraint} `) + 'RETURNING *;'
}

module.exports = {
    buildWhereClause,
    buildInsertInto, 
    buildUpdateAndSet
}