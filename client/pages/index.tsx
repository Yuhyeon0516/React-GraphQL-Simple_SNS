import React from 'react';
import MsgList from '../components/MsgList';
import fetcher from '../utils/fetcher';

export default function Home({ smsgs }) {
    return (
        <div>
            <h1>Simple SNS</h1>
            <MsgList smsgs={smsgs} />
        </div>
    );
}

export async function getServerSideProps() {
    const { data: smsgs } = await fetcher.get('/messages');
    return {
        props: { smsgs },
    };
}
