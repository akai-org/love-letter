export function FilterItem(props: {
  icon: string;
  label: string;
  value: string;
  setValueUp: () => void;
  setValueDown: () => void;
}) {
  return (
    <>
      <div className="flex items-center p-1">
        <img
          className="w-7 p-1 invert"
          src="icons/person.svg"
          alt="Started filter"
        />

        <div className="text-xxs flex w-full flex-col">
          {props.label} <br /> {props.value}
        </div>

        <div className="opacity-60">
          <img
            className="w-5 cursor-pointer invert transition-transform hover:scale-110 active:scale-75"
            src="icons/expand_less.svg"
            alt={`Change ${props.label} filter up`}
            onClick={props.setValueUp}
          />
          <img
            className="w-5 cursor-pointer invert transition-transform hover:scale-110 active:scale-75"
            src="icons/expand_more.svg"
            alt={`Change ${props.label} filter down`}
            onClick={props.setValueDown}
          />
        </div>
      </div>
    </>
  );
}
