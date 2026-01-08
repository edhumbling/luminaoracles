"use client";

import { useState, useRef, useEffect } from "react";

const PLAYLIST = [
    "https://ik.imagekit.io/humbling/Suno%20-%20AI%20Music_11.m4a",
    "https://ik.imagekit.io/humbling/Suno%20-%20AI%20Music_12.m4a",
    "https://ik.imagekit.io/humbling/Suno%20-%20AI%20Music_9.m4a",
    "https://ik.imagekit.io/humbling/Suno%20-%20AI%20Music_10.m4a",
    "https://ik.imagekit.io/humbling/Suno%20-%20AI%20Music_8.m4a",
    "https://ik.imagekit.io/humbling/Suno%20-%20AI%20Music_13.m4a"
];

export default function BackgroundAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Promise handling for safer play (browsers may block)
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => console.error("Playback blocked:", error));
            }
        }
    };

    const handleEnded = () => {
        // Move to next track
        const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        setCurrentTrackIndex(nextIndex);
    };

    // Track playing state in ref to access inside effect without effect dependency
    const isPlayingRef = useRef(isPlaying);
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Effect to handle track changes automatically when index updates
    useEffect(() => {
        if (!audioRef.current) return;

        // If we were playing, auto-play the new track
        if (isPlayingRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log("Auto-advance play blocked", e));
            }
        }
    }, [currentTrackIndex]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrackIndex]}
                onEnded={handleEnded}
                loop={false} // We handle looping via playlist logic
            />

            <button
                onClick={togglePlay}
                className="group flex items-center justify-center w-16 h-16 bg-black border-2 border-lumina-gold hover:bg-lumina-gold transition-colors duration-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
                <div className="relative w-6 h-6 flex items-center justify-center">
                    {isPlaying ? (
                        <div className="flex gap-1 h-4">
                            <div className="w-1.5 bg-white group-hover:bg-black animate-[pulse_0.5s_linear_infinite]" />
                            <div className="w-1.5 bg-white group-hover:bg-black animate-[pulse_0.8s_linear_infinite]" />
                            <div className="w-1.5 bg-white group-hover:bg-black animate-[pulse_0.6s_linear_infinite]" />
                        </div>
                    ) : (
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white group-hover:border-l-black border-b-[8px] border-b-transparent ml-1" />
                    )}
                </div>
            </button>
        </div>
    );
}
