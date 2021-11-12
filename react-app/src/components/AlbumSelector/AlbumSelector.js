import styles from "./AlbumSelector.module.css";

const AlbumList = (albumList, selectCallBack, selectedAlbum) => 
    albumList.map(album => {
        const classList = selectedAlbum === album 
            ? `${styles.albumSelector__album} ${styles.albumSelector__album_selected}`
            : styles.albumSelector__album;

        return (
            <div  
                key={album}
                className={classList}
                onClick={() => selectCallBack(album)}
            >{album}</div>
        )
    })

const AlbumSelector = ({albumList, selectCallBack, selectedAlbum}) => {
    
    return (
        <div className={styles.albumSelector}>
            <div 
                className={styles.albumSelector__clearButton}
                onClick={() => {selectCallBack(null)}}
            >clear</div>
            <h2 className={styles.albumSelector__header}>Albums</h2>
            <div className={styles.albumSelector__albumListWrapper}>
                {AlbumList(albumList, selectCallBack, selectedAlbum)}
            </div>
        </div>
    )
}

export default AlbumSelector;