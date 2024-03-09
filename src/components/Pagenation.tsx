import React, { useEffect } from "react";
export default function Pagenation({
  page,
  setPage,
  pageNumber,
  setPageNumber,
  pageMax,
}: Page) {
  type Page = {
    page: number;
    setPage: (page: number) => void;
    pageNumber: number[];
    setPageNumber: (pageNumber: number[]) => void;
  };

  //page更新後にページネーション番号を更新
  useEffect(() => {
    changePageNumber();
  }, [page, setPage]);

  //メインページ切り替え
  const changePage = (num: number) => {
    //選択したページ番号をメインページ番号にセット
    setPage(num);
    changePageNumber();
  };
  //ページネーション番号切り替え
  const changePageNumber = () => {
    //最大ページ数が5以下の場合
    if (pageMax <= 5) {
      setPageNumber([1, 2, 3, 4, 5]);
    } else {
      //最大ページ数が5より大きい場合
      //現在ページ番号が3以下の場合
      if (page <= 3) {
        setPageNumber([1, 2, 3, 4, 5]);
        //現在のページ番号が(4〜pageMax-2)の場合
      } else if (page <= pageMax - 2) {
        setPageNumber([page - 2, page - 1, page, page + 1, page + 2]);
        //現在のページ番号がpageMax-2〜pageMaxの場合
      } else if (page <= pageMax) {
        setPageNumber([
          pageMax - 4,
          pageMax - 3,
          pageMax - 2,
          pageMax - 1,
          pageMax,
        ]);
      }
    }
  };

  return (
    <>
      <div className="join w-full flex justify-center">
        {pageNumber.map((i: number) => (
          <button
            key={i}
            className={`join-item btn ${page === i ? "disabled" : ""}`}
            onClick={() => changePage(i)}
            disabled={page === i}
          >
            {i}
          </button>
        ))}
      </div>
    </>
  );
}
