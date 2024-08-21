declare namespace SC {
    function Widget(element: HTMLIFrameElement): WidgetInstance;
    
    namespace Widget {
        enum Events {
            PLAY = 'play',
            PAUSE = 'pause',
            FINISH = 'finish',
        }
    }
    
    interface WidgetInstance {
        bind(event: Widget.Events, callback: () => void): void;
        unbind(event: Widget.Events, callback: () => void): void;
        play(): void;
        pause(): void;
        seekTo(ms: number): void;
        getDuration(callback: (duration: number) => void): void;
        getCurrentPosition(callback: (position: number) => void): void;
        getVolume(callback: (volume: number) => void): void;
        setVolume(volume: number): void;
        isPaused(callback: (paused: boolean) => void): void;
    }
}