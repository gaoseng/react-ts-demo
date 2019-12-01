import React from 'react';

interface Props {
    top: React.ReactNode;
    main: React.ReactNode;
    bottom: React.ReactNode;
    children: () => React.ReactNode;
    obj: {test: number};
}
export function SlotContainer(props: Props) {
    const {top, main, bottom} = props;
    props.obj.test = 321;
    console.log(props.obj);
    return <div>
        <section>
            {top}
        </section>
        <section>
            {main}
        </section>
        <section>
            {bottom}
        </section>
    </div>;
}
