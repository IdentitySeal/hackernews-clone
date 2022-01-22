const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { APP_SECRET} = require("../utils");

const postLink = async (parent, args, context, info) => {
  const link = {
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: context.userId } },
    },
  };
  const createLink = await context.prisma.link.create(link);

  context.pubsub.publish("Created_a_new_Link", createLink)

  return createLink;
};

const updateLink = async (parent, args, context) => {
  const { url, id, description } = args;
  const allLinks = await context.prisma.link.update({
    where: {
      id: id,
    },
    data: {
      description: description,
      url: url,
    },
  });
  return { ...args, allLinks };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  // check if userEmail doesnot exist
  if (!user) {
    throw new Error("User does not Exist");
  }
  const validator = await bcrypt.compare(args.password, user.password);
  if (!validator) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // console.log(context.req.headers.authorization);

  return {
    token,
    user,
  };
};
const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};



const vote = async (parent, args, context, info) => {
  const userId = context.userId
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId
      }
    }
  })

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    }
  })
  context.pubsub.publish("NEW_VOTE", newVote)

  return newVote
}

module.exports = {
  signup,
  login,
  postLink,
  updateLink,
  vote,
};
