import Theme from "@/components/theme";
import { changeTheme } from "@/store/modules/themeSlice";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useSelector((state: any) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"];

  const handler = () => {
    const index = themes.indexOf(theme);
    const next = themes[(index + 1) % themes.length];
    dispatch(changeTheme(next));
  };


  return (
    <>
      <Head>
        <title>My Next.js Site</title>
      </Head>
      <Theme>
        <h1>Hello world!</h1>
        <input type="button" onClick={handler} value={theme} />
      </Theme>
    </>
  );
}
