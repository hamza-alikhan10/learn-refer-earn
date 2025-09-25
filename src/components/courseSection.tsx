import React, { useState, useEffect } from "react";

type Episode = {
  id: string;
  title: string;
  duration: number | null;
  video_url: string;
};

type Section = {
  id: string;
  title: string;
  episodes: Episode[];
};

type Props = {
  videoData?: {
    course?: {
      sections?: Section[];
    };
  };
  setVideoUrls: React.Dispatch<React.SetStateAction<string[] | null>>;
};

export default function CourseSection({ videoData, setVideoUrls }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Flatten all episodes from all sections into a single array
  const allEpisodes: Episode[] = 
    videoData?.course?.sections?.flatMap((section) => section.episodes || []) || [];

  // Auto-select first video when data arrives
  useEffect(() => {
    if (allEpisodes.length > 0) {
      const firstEp = allEpisodes[0];
      setSelectedId(firstEp.id);
      setVideoUrls([firstEp.video_url]);
    }
  }, [videoData, setVideoUrls]);

  // Helper: format total duration in minutes
  const formatMinutes = (episodes: Episode[]) => {
    const totalMinutes = episodes.reduce((acc, ep) => acc + (ep.duration || 0), 0);
    return `${totalMinutes}min`;
  };

  if (!videoData?.course?.sections || allEpisodes.length === 0) {
    return null;
  }

  const totalCount = allEpisodes.length;
  const selectedIndex = allEpisodes.findIndex((ep) => ep.id === selectedId);
  const totalDuration = formatMinutes(allEpisodes);

  return (
    <div className="rounded border border-gray-200 overflow-hidden">
      <div className="mb-6">
        {/* Single header for all modules */}
        <div className="bg-gray-50 px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Modules
            </h2>
            <button
              aria-expanded="true"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 15l-6-6-6 6"
                ></path>
              </svg>
            </button>
          </div>
          <p className="mt-3 text-gray-600">
            {selectedIndex >= 0 ? selectedIndex + 1 : 0} / {totalCount} |{" "}
            {totalDuration}
          </p>
        </div>

        {/* All videos listed directly */}
        <ul className="divide-y divide-gray-100">
          {allEpisodes.map((ep, idx) => {
            const isSelected = selectedId === ep.id;
            return (
              <li key={ep.id}>
                <button
                  onClick={() => {
                    setSelectedId(ep.id);
                    setVideoUrls([ep.video_url]);
                    console.log("Selected:", idx + 1, ep.title);
                  }}
                  className={`w-full text-left flex items-center gap-6 px-6 py-6 sm:py-8 focus:outline-none transition-colors ${
                    isSelected ? "bg-gray-200" : "bg-white hover:bg-gray-50"
                  }`}
                  aria-pressed={isSelected}
                  aria-current={isSelected ? "true" : undefined}
                >
                  {/* left marker */}
                  <div className="flex-shrink-0 w-10 flex items-start justify-center">
                    {isSelected ? (
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 bg-purple-600 rounded-sm text-white"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 6L9 17l-5-5"
                          ></path>
                        </svg>
                      </span>
                    ) : (
                      <span className="w-6 h-6" aria-hidden="true" />
                    )}
                  </div>

                  {/* content */}
                  <div className="flex-1">
                    <div className="text-lg sm:text-xl text-gray-800">
                      {idx + 1}. {ep.title}
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-500 gap-3">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect
                            x="2"
                            y="6"
                            width="14"
                            height="12"
                            rx="2"
                            strokeWidth="1.5"
                          ></rect>
                          <path
                            d="M23 7l-6 5 6 5V7z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                      <span>{ep.duration ? `${ep.duration}min` : "N/A"}</span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}