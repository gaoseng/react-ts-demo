
export interface PressEvent {
    target: Element;
    currentTarget: HTMLElement;
}
interface ReturnPE {
    onTouchStart: (e: React.TouchEvent<Element>) => void;
    onTouchMove: (e: React.TouchEvent<Element>) => void;
    onTouchEnd: (e: React.TouchEvent<Element>) => void;
}

export function LongPress( cb: (e: PressEvent) => void, ms: number = 2000): ReturnPE {
    let timer: any;
    let clientX: number;
    let clientY: number;
    const onTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
        const target = e.target as HTMLElement;
        const currentTarget = e.currentTarget as HTMLElement;
        timer = setTimeout(() => {
            cb && cb({
                target,
                currentTarget
            });
        }, ms);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        if (Math.abs(clientX - touch.clientX) > 3 && Math.abs(clientY - touch.clientY) > 3) {
            clearTimeout(timer);
        }
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(timer);
    };
    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    };
}
