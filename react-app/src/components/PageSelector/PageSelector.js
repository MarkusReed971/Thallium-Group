import styles from "./PageSelector.module.css";

const PageList = (pageCount, selectCallBack, selectedPage) => {
    const pageList = [...Array(pageCount).keys()].map(el => ++el);

    return pageList.map(page => {
        const classList = selectedPage === page 
            ? `${styles.pageSelector__page} ${styles.pageSelector__page_selected}`
            : styles.pageSelector__page;

        return (
            <div  
                key={page}
                className={classList}
                onClick={() => selectCallBack(page)}
            >{page}</div>
        )
    })
}
    
const PageSelector = ({pageCount, selectCallBack, selectedPage}) => {
    
    return (
        <div className={styles.pageSelector}>
            <div className={styles.pageSelector__pageListWrapper}>
                {PageList(pageCount, selectCallBack, selectedPage)}
            </div>
        </div>
    )
}

export default PageSelector;