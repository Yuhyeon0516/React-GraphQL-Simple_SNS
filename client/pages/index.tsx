import React from 'react';
import MsgList from '../components/MsgList';
import { fetcher } from '../utils/queryClient';
import { GET_MESSAGES } from '../graphql/messages';
import { GET_USERS } from '../graphql/users';
import { Messages, Users } from '../types/type';

export default function Home({ smsgs, users }) {
    return (
        <div>
            <h1>Simple SNS</h1>
            <MsgList smsgs={smsgs} users={users} />
        </div>
    );
}

export async function getServerSideProps() {
    const { messages: smsgs }: Messages = (await fetcher(GET_MESSAGES)) as Messages;
    const { users }: Users = (await fetcher(GET_USERS)) as Users;

    return {
        props: { smsgs: smsgs, users: users },
    };
}
