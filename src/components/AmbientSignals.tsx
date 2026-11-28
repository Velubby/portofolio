type VerticalTrack = {
  offset: string;
  duration: string;
  delay: string;
  reverse?: boolean;
  visibility?: string;
};

type HorizontalTrack = {
  top: string;
  duration: string;
  delay: string;
  reverse?: boolean;
};

const verticalTracks: VerticalTrack[] = [
  // Compact / tablet gutter tracks (< 860px)
  { offset: 'left-[10px] sm:left-[18px]', duration: '15s', delay: '-4s', visibility: 'min-[860px]:hidden' },
  { offset: 'right-[10px] sm:right-[18px]', duration: '17s', delay: '-11s', reverse: true, visibility: 'min-[860px]:hidden' },

  // Desktop left margin tracks (relative to 680px center column)
  { offset: 'left-[calc(50%-410px)]', duration: '13s', delay: '-3s', visibility: 'hidden min-[860px]:block' },
  { offset: 'left-[calc(50%-515px)]', duration: '17s', delay: '-11s', reverse: true, visibility: 'hidden min-[1060px]:block' },
  { offset: 'left-[calc(50%-625px)]', duration: '19s', delay: '-7s', visibility: 'hidden min-[1280px]:block' },
  { offset: 'left-[calc(50%-800px)]', duration: '23s', delay: '-15s', reverse: true, visibility: 'hidden min-[1640px]:block' },
  { offset: 'left-[calc(50%-980px)]', duration: '21s', delay: '-9s', visibility: 'hidden min-[2000px]:block' },

  // Desktop right margin tracks (relative to 680px center column)
  { offset: 'left-[calc(50%+410px)]', duration: '15s', delay: '-9s', reverse: true, visibility: 'hidden min-[860px]:block' },
  { offset: 'left-[calc(50%+515px)]', duration: '14s', delay: '-2s', visibility: 'hidden min-[1060px]:block' },
  { offset: 'left-[calc(50%+625px)]', duration: '21s', delay: '-13s', reverse: true, visibility: 'hidden min-[1280px]:block' },
  { offset: 'left-[calc(50%+800px)]', duration: '18s', delay: '-5s', visibility: 'hidden min-[1640px]:block' },
  { offset: 'left-[calc(50%+980px)]', duration: '25s', delay: '-14s', reverse: true, visibility: 'hidden min-[2000px]:block' },
];

const horizontalTracks: HorizontalTrack[] = [
  { top: 'top-[28%]', duration: '19s', delay: '-6s' },
  { top: 'top-[64%]', duration: '23s', delay: '-14s', reverse: true },
];

export default function AmbientSignals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {verticalTracks.map((track, index) => (
        <div
          key={`v-${index}`}
          className={`signal-track-v ${track.offset} ${track.visibility ?? ''}`}
        >
          <span
            className={`signal-pulse-v ${track.reverse ? 'signal-pulse-v-up' : 'signal-pulse-v-down'}`}
            style={{
              animationDuration: track.duration,
              animationDelay: track.delay,
            }}
          />
        </div>
      ))}

      <div className="signal-horizontal-mask hidden min-[860px]:block">
        {horizontalTracks.map((track, index) => (
          <div key={`h-${index}`} className={`signal-track-h ${track.top}`}>
            <span
              className={`signal-pulse-h ${track.reverse ? 'signal-pulse-h-left' : 'signal-pulse-h-right'}`}
              style={{
                animationDuration: track.duration,
                animationDelay: track.delay,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
