const usersResolver = {
    Query: {
        users: (parent, args, { db }) => {
            return Object.values(db.users);
        },
        user: (parent, { id }, { db }) => {
            return db.users[id];
        },
    },
};

export default usersResolver;
