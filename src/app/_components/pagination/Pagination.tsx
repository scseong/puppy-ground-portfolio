import React, { Dispatch, SetStateAction } from 'react';
import style from './pagination.module.scss';
export type Props = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total: number | undefined;
  limit: number;
};

function Pagination({ page, setPage, total, limit }: Props) {
  const numPages = Math.ceil(total! / limit);

  return (
    <nav className={style.bottonWarpper}>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
    </nav>
  );
}

export default Pagination;
