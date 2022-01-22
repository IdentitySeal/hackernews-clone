const feedData = (parent, args , context) => {
    return context.prisma.link.findMany()
}

const feeds  = (parent,args,context,info) =>{
    const checker = args.filter
    ?  { where : { 
        OR : [ 
                {description : {contains:args.filter}},
                {url: { contains :args.filter }},
        ]
    } }
    : {}

    const filteredFeeds = context.prisma.link.findMany(
        checker
    ) 

    return filteredFeeds;
}

const paginateAndSortfeeds = ( parent,args,context,info) =>{
    const where = args.filter  ? {OR :[
        {description : {contains : args.filter}},
        {url : {contains : args.filter}},
    ]} : {}

    const data = context.prisma.link.findMany({
        where,
        skip:args.skip,
        take:args.take
    })

    return data ;
}
const paginateAndSortfeedsAndOrder = ( parent,args,context,info) =>{
    const where = args.filter  ? { OR :[
        {description : {contains : args.filter}},
        {url : {contains : args.filter}},
    ]} : {}

    const links = context.prisma.link.findMany({
        where,
        skip:args.skip,
        take:args.take,
        orderBy:args.orderBy
    })
    const count = context.prisma.link.count ({ where })

    return {
        links,
        count
    } ;
}

module.exports = {
    feedData,
    feeds,
    paginateAndSortfeeds,
    paginateAndSortfeedsAndOrder
} 