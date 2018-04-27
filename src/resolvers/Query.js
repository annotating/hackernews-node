async function feed(parent, args, context, info) {
    // const where = args.filter ? {
    //     OR: [
    //         { url_contains: args.filter },
    //         { description_contains: args.filter },
    //     ],
    // } : {};
    // including where breaks query results
    const queriedLinks = await context.db.query.links(
        { orderBy: args.orderBy, skip: args.skip, first: args.first},
        `{ id }`,
    );
    console.log('queriedLinks', queriedLinks);
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
    };
}

module.exports = {
    feed,
}