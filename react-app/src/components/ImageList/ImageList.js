import styles from "./ImageList.module.css";
import ImageCard from './../ImageCard/ImageCard';

const Images = (imageList, showModalCallBack, deleteImageCallBack) =>
  imageList.map(image => <ImageCard 
                            key={image._id} 
                            image={image} 
                            showModalCallBack={showModalCallBack}
                            deleteImageCallBack={deleteImageCallBack}
                        />);

const ImageList = ({imageList, showModalCallBack, deleteImageCallBack}) => {
    return (
        <div className={styles.imageList}>
            {Images(imageList, showModalCallBack, deleteImageCallBack)}
        </div>
    )
}

export default ImageList;