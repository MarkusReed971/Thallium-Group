import styles from "./ModalImage.module.css";

const ModalImage = ({image, isShowed, hideCallBack}) => {
    const classList = isShowed 
        ? `${styles.modal} ${styles.modal_show}`
        : `${styles.modal} ${styles.modal_hide}`;

    return image ? (
        <div className={classList}>
            <div className={styles.modal__card}>
                <div 
                    className={styles.modal__hideButton}
                    onClick={hideCallBack}
                >×</div>
                <img 
                    className={styles.modal__image} 
                    src={ image.url } 
                    alt={image.title}
                />
                <h4 className={styles.modal__title}>{image.title}</h4>
                <div className={styles.modal__album}>{`album: ${image.albumId}`}</div>
            </div>
       </div>)
       : null
}

export default ModalImage;