import s from './paginator.module.css';

const Paginator = (props) => {
    debugger
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= props.numOfPages; i += 1) {
        pages.push(i);
    }

    return (
        <div className={s.pagination}>
            {pages.map(p => <span className={props.currentPage === p ? `${s.page} ${s.active}` : s.page} onClick={() => props.onPageChanged(p)}>{p}</span>)}
            <span>...</span>
            <span className={props.currentPage === pagesCount ? `${s.page} ${s.active}` : s.page} onClick={() => props.onPageChanged(pagesCount)}>{pagesCount}</span>
        </div>
    )
}

export default Paginator;