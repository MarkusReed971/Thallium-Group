import styles from "./ImageCard.module.css"

const ImageCard = ({image, showModalCallBack, deleteImageCallBack}) => {
    return (
        <div className={styles.card}>
            <div>
                <img 
                    className={styles.card__image} 
                    src={ image.thumbnailUrl } 
                    alt={image.title}
                    onClick={() => showModalCallBack(image)}
                />
                <h4 className={styles.card__title}>{image.title}</h4>
            </div>
            <div className={styles.card__footer}>
                <span className={styles.card__album}>{`album: ${image.albumId}`}</span>
                <span 
                    className={styles.card__deleteButton}
                    onClick={() => deleteImageCallBack(image._id)}
                >delete</span>
            </div>
        </div>
    )
}

export default ImageCard;