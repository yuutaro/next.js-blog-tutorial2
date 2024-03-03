import Header from "@/components/Header";
import Theme from "@/components/theme";
import { changeTheme } from "@/store/modules/themeSlice";
import { Inter } from "next/font/google";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <Theme>
        <Header>
          <div>hello world!</div>
        </Header>
      </Theme>
    </>
  );
}
