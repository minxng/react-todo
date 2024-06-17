import { IoMdSunny, IoMdMoon } from "react-icons/io";
import style from "./Header.module.css";
import StateBar from "./StateBar";

export default function Header({ changeMode, changeTab, mode }) {
  return (
    <div className={style.header}>
      {mode === "dark" ? (
        <IoMdMoon className={style.icon} onClick={() => changeMode("light")} />
      ) : (
        <IoMdSunny className={style.icon} onClick={() => changeMode("dark")} />
      )}

      <StateBar changeTab={changeTab} />
    </div>
  );
}
