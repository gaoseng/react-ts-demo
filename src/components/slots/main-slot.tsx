import React from 'react';

interface Props {
    content: string;
}
export function MainSlot(props: Props) {
    return <div>
        {props.content}
    </div>;
}
