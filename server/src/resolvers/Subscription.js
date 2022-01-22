const subscribeNewLink = (parent,args,context,info) =>{
    return context.pubsub.asyncIterator("Created_a_new_Link")
}

const subscribeToVote = (parent,args,context,info) =>{
    return context.pubsub.asyncIterator("NEW_VOTE")
}
const newLink = {
    subscribe: subscribeNewLink,
    resolve: payload => {
      return payload
    },
  }
const newVote = {
    subscribe: subscribeToVote,
    resolve: payload => {
      return payload
    },
  }
  
  module.exports = {
    newLink,
    newVote
  }