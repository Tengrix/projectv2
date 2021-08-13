import React, {useState} from "react";
import styles from "./pagination.module.css"
interface TablePaginationActionsProps {
    currentPortion:number;
    page:number;
    rowsPerPage:number;
    totalNumberOfPacks:number
    onChangePaginate:(page:number,currentPortion:number)=>void
    portionSize:number
}

export function TablePaginationActions(props: TablePaginationActionsProps) {
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(props.totalNumberOfPacks/props.rowsPerPage);i++){
        pageNumbers.push(i)
    }
    const portionCount = Math.ceil(Math.ceil(props.totalNumberOfPacks/props.rowsPerPage) / props.portionSize)
    const [portionNumber, setPortionNumber] = useState(props.currentPortion)
    const leftPortionNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPortionNumber = portionNumber * props.portionSize
    return (
            <div className={styles.paginatorBody}>
                <button
                    onClick={() => setPortionNumber(1)}
                    disabled={portionNumber == 1}
                    className={styles.buttons}
                >
                    - -
                </button>
                <button
                    onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}
                    disabled={portionNumber == 1}
                    className={styles.buttons}
                >
                    -
                </button>
                {pageNumbers
                    .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map((p) => {
                        const pageStyle = `${props.page === p && styles.pageActive} ${
                            styles.numberPageStyle
                        }`
                        return (
                            <button key={p} onClick={() => props.onChangePaginate(p,portionNumber)} className={pageStyle}>
                            {p}
                        </button>
                        )
                    })}
                <button
                    onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}
                    disabled={portionCount <= portionNumber}
                    className={styles.buttons}
                >
                    +
                </button>
                <button
                    onClick={() => setPortionNumber(portionCount)}
                    disabled={portionCount <= portionNumber}
                    className={styles.buttons}
                >
                    ++
                </button>
        </div>
    );
}