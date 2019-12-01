import React from 'react';

interface Props {
    title: string;
}
export function TopSlot(props: Props) {
    return <div>
        {props.title}
    </div>;
}
