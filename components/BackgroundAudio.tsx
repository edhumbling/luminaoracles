"use client";

import { useState, useRef, useEffect } from "react";
import { LiquidButton } from "@/components/liquid-glass-button";

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

            <LiquidButton
                onClick={togglePlay}
                className="w-16 h-16 rounded-full overflow-hidden p-0 bg-black/20"
                variant="default" // Use default for transparency or adjust if needed based on liquid-glass-button definitions
            >
                <div className="relative w-full h-full flex items-center justify-center z-20">
                    {isPlaying ? (
                        <div className="flex gap-1 h-4">
                            <div className="w-1.5 bg-white animate-[pulse_0.5s_linear_infinite]" />
                            <div className="w-1.5 bg-white animate-[pulse_0.8s_linear_infinite]" />
                            <div className="w-1.5 bg-white animate-[pulse_0.6s_linear_infinite]" />
                        </div>
                    ) : (
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    )}
                </div>
            </LiquidButton>
        </div>
    );
}
