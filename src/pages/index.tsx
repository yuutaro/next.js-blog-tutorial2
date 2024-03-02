import { changeTheme } from "@/store/modules/themeSlice";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useSelector((state: any) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(changeTheme(theme === "light" ? "dark" : "light"));
  };


  return (
    <>
      <Head>
        <title>My Next.js Site</title>
      </Head>
      <h1>Hello world!</h1>
      <button onClick={handler}>changeTheme</button>
      <p>{theme}</p>
    </>
  );
}
