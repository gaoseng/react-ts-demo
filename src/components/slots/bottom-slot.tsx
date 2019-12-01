import React from 'react';

interface Props {
    content: string;
}
export function BottomSlot(props: Props) {
    return <div>
        {props.content}
    </div>;
}
