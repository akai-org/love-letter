import axios from "axios";
import React from "react";

import Room from "../Typing/Room";

export default async function lobbyAPIFetch(): Promise<Room[]> {
  const url = "http://localhost:8000/api/v1/games?started=false";

  const returnVal = await axios.get<Room[]>(url);
  return returnVal.data['games'];
}