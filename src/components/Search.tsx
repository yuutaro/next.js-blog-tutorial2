export default function Search({ inputKeyword, setInputKeyword }: Search) {
  type Search = {
    inputKeyword: string;
    setInputKeyword: (inputKeyword: string) => void;
  };
  //入力値をセットする関数
  const changeKeyword = (e: any) => {
    setInputKeyword(e.target.value);
  };

  return (
    <>
      {/* キーワード検索 */}
      <div className="my-8 w-full flex justify-center">
        <label className="input input-bordered flex items-center border gap-2 w-1/2 ">
          <input
            type="text"
            className="grow"
            placeholder="キーワード検索"
            value={inputKeyword}
            onChange={changeKeyword}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    </>
  );
}