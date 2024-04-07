import React, { useState, useCallback } from "react";
import TeamData from "./TeamData";
export default function Team({ data }) {
  const [url, setUrl] = useState(null);
  const copy = useCallback((id) => {
    const newUrl = `http://localhost:5173/teams/${id}`;
    setUrl(newUrl);
    window.navigator.clipboard.writeText(newUrl);
    console.log("copy");
  }, []);
  return (
    <div>
      {Array.isArray(data) &&
        data &&
        data.map((team) => (
          <div key={team.id}>
            <h2>{team.teamName}</h2>
            <button
              className="bg-black p-2 text-white rounded-md"
              onClick={() => copy(team.id)}
            >
              {" "}
              copy
            </button>
            <TeamData team={team} />
          </div>
        ))}
    </div>
  );
}
