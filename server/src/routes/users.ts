import { readDB } from '../dbController';
import { RouteType } from '../types/type';

const usersRoute: RouteType[] = [
    {
        method: 'get',
        route: '/users',
        handler(req, res) {
            const users = readDB('users');
            res.send(users);
        },
    },
    {
        method: 'get',
        route: '/users/:id',
        handler(req, res) {
            try {
                const {
                    params: { id },
                } = req;
                const users = readDB('users');
                const user = users[id];
                if (!user) throw Error('사용자가 없습니다.');
                res.send(user);
            } catch (error) {
                res.status(500).send({ error: error });
            }
        },
    },
];

export default usersRoute;
