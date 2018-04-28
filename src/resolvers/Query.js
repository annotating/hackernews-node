async function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            { url_contains: args.filter },
            { description_contains: args.filter },
        ],
    } : {};
   
    let queriedLinks = await context.db.query.links(
        { where, orderBy: args.orderBy, skip: args.skip, first: args.first },
        `{ id }`,
    );
     
    const countSelectionSet = `
    {
      aggregate {
        count
      }
    }`;

    const linksConnection = await context.db.query.linksConnection({}, countSelectionSet);
    return {
        count: linksConnection.aggregate.count,
        linkIds: queriedLinks.map(link => link.id),
        orderBy: args.orderBy
    };
}

module.exports = {
    feed,
}