import clsx from 'clsx';
import React, { useState } from 'react';
import s from './paginator.module.css';

type PropsType = {
  totalItemsCount: number;
  pageSize?: number;
  numOfPages?: number;
  onPageChanged: (p: number) => void;
  currentPage: number;
};

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize = 10,
  numOfPages = 10,
  onPageChanged,
  currentPage,
}) => {
  const initialPortionNumber = Math.ceil(currentPage / numOfPages);
  const [portionNumber, setPortionNumber] = useState(initialPortionNumber);
  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  const leftPortionPageNumber = (portionNumber - 1) * numOfPages + 1;
  let rightPortionPageNumber = portionNumber * numOfPages;
  if (rightPortionPageNumber > pagesCount) rightPortionPageNumber = pagesCount;

  const lastPortion = Math.ceil(pagesCount / numOfPages);
  const pages: Array<number> = [];
  for (let i = leftPortionPageNumber; i <= rightPortionPageNumber; i += 1) {
    pages.push(i);
  }

  return (
    <div className={s.pagination}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(1)} className={clsx(s.page, s.button)}>
          {'<<'}
        </button>
      )}
      {portionNumber > 1 && (
        <button
          onClick={() => setPortionNumber(portionNumber - 1)}
          className={clsx(s.page, s.button)}
        >
          Prev
        </button>
      )}
      <div className={s.pages}>
        {pages.map((p) => (
          <span
            className={clsx(s.page, currentPage === p && [s.active])}
            onClick={() => onPageChanged(p)}
            key={p}
          >
            {p}
          </span>
        ))}
      </div>
      {portionNumber < lastPortion && (
        <button
          onClick={() => setPortionNumber(portionNumber + 1)}
          className={clsx(s.page, s.button)}
        >
          Next
        </button>
      )}
      {portionNumber < lastPortion && (
        <button onClick={() => setPortionNumber(lastPortion)} className={clsx(s.page, s.button)}>
          {'>>'}
        </button>
      )}
    </div>
  );
};

export default Paginator;
