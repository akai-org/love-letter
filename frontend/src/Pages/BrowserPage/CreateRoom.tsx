import { useNavigate } from "react-router-dom";
import { CreateRoomOptions } from "../../hooks/API/useCreateRoom";
import { ChangeEvent, useState } from "react";
import useCreateRoom from "../../hooks/API/useCreateRoom";

export function CreateRoomForm(props: { playerName: string }) {
  const [form, setForm] = useState<CreateRoomOptions>({
    name: "",
    max_players: 2,
  });

  const handleChangeField =
    (option: keyof CreateRoomOptions) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [option]: e.target.value });

  const navigate = useNavigate();
  const [createRoom, error] = useCreateRoom();

  const handleSubmit = async () => {
    const response = await createRoom(form);
    if (response) navigate(`/game/${response.game_id}`);
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-2  p-2 text-xs">
      <input
        placeholder="Room name"
        className=" w-2/3 border border-black p-2 outline-none"
        type="text"
        value={form.name}
        onChange={handleChangeField("name")}
      />

      <input
        className=" w-2/3 border border-black p-2 outline-none"
        type="number"
        value={form.max_players}
        onChange={handleChangeField("max_players")}
        max={6}
        min={2}
      />

      <input
        className=" w-2/3 border border-black p-2 outline-none"
        value={form.password}
        onChange={handleChangeField("password")}
        placeholder="Password"
        type="password"
      />

      <p>{error ?? ""}</p>

      <button
        className="rounded-3xl border-2 border-dashed border-black px-4 py-2 transition-all duration-300 hover:bg-black hover:text-white"
        onClick={handleSubmit}
      >
        Create room
      </button>
    </div>
  );
}
