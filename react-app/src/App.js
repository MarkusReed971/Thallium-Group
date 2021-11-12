import React from 'react';
import './App.css';
import AlbumSelector from './components/AlbumSelector/AlbumSelector';
import ImageList from './components/ImageList/ImageList';
import ModalImage from './components/ModalImage/ModalImage';
import PageSelector from './components/PageSelector/PageSelector';

const url = "http://localhost:3001/images/";

const getAlbumListAsync = async () => {
  const res = await fetch(url + "albums");
  return await res.json();
}

const getImageListAsync = async (filter) => {
  const res = await fetch(url + filter);
  return await res.json();
}

const deleteImageAsync = async (id) => {
  const res = await fetch(url + id, {
    method: "DELETE"
  });
  return res.status;
}

class App extends React.Component {
  state = {
    imageList: [],
    albumList: [],
    selectedPage: 1,
    pageCount: 0,
    imagePerPage: 10,
    albumId: null,
    showModal: false,
    modalImage: null
  }

  setImageList(filter) {
    getImageListAsync(filter)
      .then(({ count, imageList }) => this.setState(prev => {
        return {
          ...prev,
          imageList,
          pageCount: Math.ceil(count / this.state.imagePerPage)
        }
      }));
  }

  setAlbumList() {
    getAlbumListAsync()
      .then(albumList => this.setState(prev => {
        return {
          ...prev,
          albumList
        }
      }));
  }

  deleteImage(id) {
    const isAccepted = window.confirm("Are you sure you want to delete this image?");
    if (isAccepted) {
      deleteImageAsync(id)
      .then(status => {
        switch(status) {
          case 200:
            this.setImageList(this.calcFilter());
            break;
          case 404:
            alert({error: "Image not found!"});
            break;
          default: 
            alert({error: "Server error!"});
            break;
        }
      })
    }
    
  }

  calcFilter() {
    const { imagePerPage, selectedPage, albumId } = this.state;

    return JSON.stringify({
      skip: imagePerPage * (selectedPage - 1),
      limit: imagePerPage,
      albumId: albumId
    });
  }

  componentDidMount() {
    this.setImageList(this.calcFilter());
    this.setAlbumList();
  }

  selectAlbumHandler(albumId) {
    this.setState(prev => {
      return {
        ...prev,
        selectedPage: 1,
        albumId
      }
    },
      () => { this.setImageList(this.calcFilter()) }
    );
  }

  selectPageHandler(selectedPage) {
    this.setState(prev => {
      return {
        ...prev,
        selectedPage
      }
    },
      () => { this.setImageList(this.calcFilter()) }
    );
  }

  showModalHandler(image) {
    this.setState(prev => {
      return {
        ...prev,
        modalImage: image,
        showModal: true
      }
    });
  }

  hideModalHandler() {
    this.setState(prev => {
      return {
        ...prev,
        modalImage: null,
        showModal: false
      }
    });
  }

  render = () => {
    const {
      albumList,
      albumId,
      imageList,
      pageCount,
      selectedPage,
      modalImage,
      showModal,
    } = this.state;

    return (
      <div className="app">
        <div className="container">
          <AlbumSelector
            albumList={albumList}
            selectCallBack={this.selectAlbumHandler.bind(this)}
            selectedAlbum={albumId}
          />
          <ImageList
            imageList={imageList}
            showModalCallBack={this.showModalHandler.bind(this)}
            deleteImageCallBack={this.deleteImage.bind(this)}
          />
          <PageSelector
            pageCount={pageCount}
            selectCallBack={this.selectPageHandler.bind(this)}
            selectedPage={selectedPage}
          />
        </div>
        <ModalImage
          image={modalImage}
          isShowed={showModal}
          hideCallBack={this.hideModalHandler.bind(this)}
        />
      </div>
    )
  }
}

export default App;
