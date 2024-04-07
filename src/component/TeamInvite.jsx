import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TeamInvite() {
  const { teamid } = useParams();
  const userData = useSelector((state) => state);

  // const teamData = team.filter((item) => item.id === teamid);
  console.log(userData);

  return <div>{/* Display other team details */}</div>;
}
