import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

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

  if (loading) return <p>Loading...</p>;

  if (!data) return <p>Collection not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Shared Collection</h1>

      {data.categories.map((cat) => (
        <div key={cat.id} className="mb-4">
          <h2 className="font-semibold">{cat.title}</h2>

          <ul className="ml-4 list-disc">
            {cat.bookmarks.map((bm) => (
              <li key={bm.id}>
                <a href={bm.url} target="_blank">
                  {bm.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(data.categories));
          alert("Copied data — open extension and import");
        }}
        className="bg-green-600 text-white px-3 py-1 rounded mt-4"
      >
        Copy to import
      </button>
    </div>
  );
}
