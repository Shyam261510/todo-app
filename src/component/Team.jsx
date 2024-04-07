import React, { useEffect } from "react";
import TeamData from "./TeamData";

export default function Team({ data }) {
  return (
    <div>
      {Array.isArray(data) &&
        data &&
        data.map((team) => (
          <div key={team.id}>
            <h2>{team.teamName}</h2>

            <TeamData team={team} />
          </div>
        ))}
    </div>
  );
}
