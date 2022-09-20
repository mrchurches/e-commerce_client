import React from "react";
import "./Pagination.css"

export default function Pagination({ gamesPerPage, games, paginado, currentPage }) {
    const pageNums = [];

    for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
        pageNums.push(i)
    }
    function previous() {
        paginado(currentPage - 1)
        setTimeout(()=> window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }),500)
    }
    function next() {
        paginado(currentPage + 1)
        setTimeout(()=> window.scroll({top: 0}),500)
    }

    return (
        <nav>
            <ul className="pages">
                <button onClick={previous} className="arrowsPag" disabled={currentPage === pageNums[0] ? true : false}>{"<"}</button>
                {
                    pageNums && pageNums.map(e => {
                        return (
                            <li key={e} className={currentPage === e ? "actual" : "non"}>
                                <span onClick={() => paginado(e) }>{e}</span>
                            </li>
                        )
                    })
                }
                <button className="arrowsPag" onClick={next} disabled={currentPage === pageNums.length ? true : false}>{">"}</button>
            </ul>
        </nav>
    )
}