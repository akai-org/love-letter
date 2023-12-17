import { Dispatch, SetStateAction } from "react";
import { RoomListFilters } from "../../hooks/API/useRoomsList";
import { FilterItem } from "./FilterItem";

export function Filters(props: {
  filters: RoomListFilters;
  setFilters: Dispatch<SetStateAction<RoomListFilters>>;
}) {
  const startedToggle = () =>
    props.setFilters((s) => ({ ...s.filters, started: !s.started }));

  return (
    <>
      <FilterItem
        icon="icons/person.svg"
        label="Started"
        value={props.filters.started ? "Yes" : "No"}
        setValueUp={startedToggle}
        setValueDown={startedToggle}
      />
    </>
  );
}
