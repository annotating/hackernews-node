function newLinkSubscribe(parent, args, context, info) {
    return context.db.subscription.link(
        // should be
        // { where: { mutation_in: ['CREATED'] } }
        // but it looks like api fails if 'where' is used
        { },
        info,
    )
}

const newLink = {
    subscribe: newLinkSubscribe
}

function newVoteSubscribe (parent, args, context, info) {
    return context.db.subscription.vote(
        { },
        info,
    )
}
  
const newVote = {
    subscribe: newVoteSubscribe
}

module.exports = {
    newLink,
    newVote
}