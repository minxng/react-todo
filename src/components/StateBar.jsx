import style from "./StateBar.module.css";

export default function StateBar({ changeTab }) {
  const barItems = [
    { text: "All", value: "all" },
    { text: "Active", value: "active" },
    { text: "Completed", value: "completed" },
  ];
  return (
    <ul className={style.bar}>
      {barItems.map((item) => (
        <li
          key={item.value}
          onClick={() => {
            changeTab(item.value);
          }}
          className={style.list}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}
