import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/store/modules/themeSlice";

export default function ThemeChanger(): React.ReactElement {

  const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"];

  const theme = useSelector((state: any) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const handler = () => {
    const index = themes.indexOf(theme);
    const next = themes[(index + 1) % themes.length];
    dispatch(changeTheme(next));
  };
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">Themes</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {themes.map((t) => (
            <li key={t} onClick={() => dispatch(changeTheme(t))}><a>{t}</a></li>
          ))}
        </ul>
      </div>
    </>
  );
}