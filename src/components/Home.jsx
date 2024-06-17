import { useEffect, useState } from "react";
import Header from "./Header";
import style from "./Home.module.css";
import { BsTrash } from "react-icons/bs";
export default function Home() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState(
    localStorage.getItem("toDos")
      ? [...JSON.parse(localStorage.getItem("toDos"))]
      : []
  );
  const [filterToDos, setFilterToDos] = useState([]);
  const [mode, setMode] = useState("");
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
    setFilterToDos(toDos);
  }, [toDos]);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleToDo = (e) => {
    setToDo(e.target.value);
  };
  const addTodo = () => {
    if (!toDo) {
      return alert("할 일을 입력해주세요.");
    }
    setToDos((prev) => [
      ...prev,
      { id: Date.now(), name: toDo, checked: false },
    ]);
    setToDo("");
  };

  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const checkToDo = (id) => {
    setToDos((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      );
    });
  };
  const changeTab = (type) => {
    if (type === "all") {
      return setFilterToDos(toDos);
    }
    if (type === "active") {
      return setFilterToDos(toDos.filter((todo) => !todo.checked));
    }
    if (type === "completed") {
      return setFilterToDos(toDos.filter((todo) => todo.checked));
    }
  };
  const changeMode = (mode) => {
    setMode(mode);
  };
  return (
    <div
      className={`${style.home} ${mode === "dark" ? style["dark-mode"] : null}`}
    >
      <Header mode={mode} changeMode={changeMode} changeTab={changeTab} />
      <ul className={style.ul}>
        {filterToDos
          ? filterToDos.map((item) => (
              <li key={item.id} className={style.list}>
                <span>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => checkToDo(item.id)}
                  />
                  {item.checked}
                  <span className={item.checked ? style.done : null}>
                    {item.name}
                  </span>
                </span>
                <span onClick={() => deleteToDo(item.id)}>
                  <BsTrash />
                </span>
              </li>
            ))
          : null}
      </ul>
      <form onSubmit={onSubmit} className={style["form-style"]}>
        <input
          type="text"
          placeholder="Add Todo"
          value={toDo}
          onChange={handleToDo}
          className={style["input-style"]}
        />
        <button className={style["add-btn"]} onClick={addTodo}>
          Add
        </button>
      </form>
    </div>
  );
}
