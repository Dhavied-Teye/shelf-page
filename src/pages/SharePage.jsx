// import { useParams } from "react-router-dom";
// import { db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";

// export default function SharePage() {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const ref = doc(db, "sharedCollections", id);
//         const snapshot = await getDoc(ref);

//         if (!snapshot.exists()) {
//           setData(null);
//         } else {
//           setData(snapshot.data());
//         }
//       } catch (err) {
//         console.error(err);
//       }

//       setLoading(false);
//     }

//     fetchData();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;

//   if (!data) return <p>Collection not found</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Shared Collection</h1>

//       {data.categories.map((cat) => (
//         <div key={cat.id} className="mb-4">
//           <h2 className="font-semibold">{cat.title}</h2>

//           <ul className="ml-4 list-disc">
//             {cat.bookmarks.map((bm) => (
//               <li key={bm.id}>
//                 <a href={bm.url} target="_blank">
//                   {bm.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       <button
//         onClick={() => {
//           navigator.clipboard.writeText(JSON.stringify(data.categories));
//           alert("Copied data — open extension and import");
//         }}
//         className="bg-green-600 text-white px-3 py-1 rounded mt-4"
//       >
//         Copy to import
//       </button>
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import logo from "../assets/shelfdeck-logo.png";

export default function SharePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const ref = doc(db, "sharedCollections", id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) {
          setData(null);
        } else {
          setData(snapshot.data());
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading)
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

          .sd-loader {
            position: fixed;
            inset: 0;
            background-color: #0a1a0f;
            display: grid;
            place-content: center;
            gap: 1.5rem;
          }

          .sd-loader svg {
            width: 22rem;
          }

          .sd-loader svg text {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            stroke-width: 2;
            letter-spacing: -6px;
          }

          .sd-loader .sd-text {
            stroke: #d1fae5;
            animation: 4s infinite alternate sd-animate-stroke;
          }

          .sd-loader .sd-dot {
            fill: #16a34a;
            stroke: #16a34a;
            animation: 4s infinite alternate sd-animate-dot;
          }

          .sd-loader .sd-sub {
            font-family: 'Poppins', sans-serif;
            font-size: 0.7rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            fill: #4ade80;
            opacity: 0.5;
            animation: 4s infinite alternate sd-animate-dot;
          }

          @keyframes sd-animate-stroke {
            0% {
              fill: transparent;
              stroke: #d1fae5;
              stroke-width: 3;
              stroke-dashoffset: 25%;
              stroke-dasharray: 0 32%;
            }
            50% {
              fill: transparent;
              stroke: #d1fae5;
              stroke-width: 3;
            }
            80%, 100% {
              fill: #d1fae5;
              stroke: transparent;
              stroke-width: 0;
              stroke-dashoffset: -25%;
              stroke-dasharray: 32% 0;
            }
          }

          @keyframes sd-animate-dot {
            0%, 60% { opacity: 0; }
            100%     { opacity: 1; }
          }
        `}</style>

        <div className="sd-loader">
          <svg viewBox="0 0 500 175">
            {/* Main animated text */}
            <text
              x="50%"
              y="48%"
              dy=".32em"
              textAnchor="middle"
              className="sd-text"
            >
              ShelfDeck
            </text>
            {/* Animated dot — dx nudges it to sit after the last letter */}
            <text
              x="50%"
              y="48%"
              dy=".32em"
              dx="3.05em"
              textAnchor="middle"
              className="sd-dot"
            >
              .
            </text>
            {/* Subtitle */}
            <text x="50%" y="82%" textAnchor="middle" className="sd-sub">
              Loading collection
            </text>
          </svg>
        </div>
      </>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 opacity-30">📭</div>
          <h2 className="text-lg font-semibold text-stone-700 mb-1">
            Collection not found
          </h2>
          <p className="text-sm text-stone-400">
            This link may have expired or been removed.
          </p>
        </div>
      </div>
    );

  const totalBookmarks = data.categories.reduce(
    (sum, cat) => sum + cat.bookmarks.length,
    0,
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="ShelfDeck Logo"
              className="h-5 w-auto object-contain"
            />
          </div>
          <span className="text-xs text-stone-400 font-medium">
            Shared Collection
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight mb-1">
            Shared Collection
          </h1>
          <p className="text-sm text-stone-400">
            {data.categories.length}{" "}
            {data.categories.length === 1 ? "shelf" : "shelves"} &middot;{" "}
            {totalBookmarks} {totalBookmarks === 1 ? "bookmark" : "bookmarks"}
          </p>
        </div>

        {/* Category cards */}
        <div className="space-y-4 mb-8">
          {data.categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center gap-2.5 px-4 py-3 bg-stone-50 border-b border-stone-200">
                <div className="w-[3px] h-4 rounded-full bg-green-500 flex-shrink-0" />
                <h2 className="text-sm font-semibold text-stone-800 flex-1">
                  {cat.title}
                </h2>
                <span className="text-[11px] font-medium text-stone-400 bg-stone-200 rounded-full px-2 py-0.5 leading-none">
                  {cat.bookmarks.length}
                </span>
              </div>

              {/* Bookmarks */}
              {cat.bookmarks.length === 0 ? (
                <p className="px-4 py-3 text-xs text-stone-400 italic">
                  No bookmarks in this shelf.
                </p>
              ) : (
                <ul>
                  {cat.bookmarks.map((bm, i) => (
                    <li
                      key={bm.id}
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-stone-50 transition-colors duration-100 group ${
                        i !== 0 ? "border-t border-stone-100" : ""
                      }`}
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${new URL(bm.url).hostname}&sz=16`}
                        width={14}
                        height={14}
                        className="rounded-sm opacity-70 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        alt=""
                      />
                      <a
                        href={bm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0 text-sm text-stone-600 hover:text-green-700 truncate transition-colors duration-100 no-underline"
                      >
                        {bm.title}
                      </a>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 text-stone-300 group-hover:text-green-400 transition-colors duration-100"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-800 mb-0.5">
              Import to ShelfDeck
            </p>
            <p className="text-xs text-stone-400">
              Copy this collection and import it in the extension.
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(data.categories));
              alert("Copied data — open extension and import");
            }}
            className="flex-shrink-0 flex items-center gap-1.5 text-[#d1fae5] bg-[#0a1a0f] hover:bg-green-900 active:scale-95  text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy to import
          </button>
        </div>
      </main>
    </div>
  );
}
