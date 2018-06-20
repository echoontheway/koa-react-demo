
import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class Image extends Component {
    constructor(props){
        super(props);
        this.state = {
          showImageLoading:false
        }
        this.fileUploadClick = this.fileUploadClick.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
    
    static propTypes = {
      onChange: PropTypes.func,
      editorState: PropTypes.object,
    }
    fileUploadClick(event){
      this.fileUpload = true;
      event.stopPropagation();
    }
    selectImage(event){
      if (event.target.files && event.target.files.length > 0) {
        this.uploadImage(event.target.files[0]);
      }
    }
    uploadImage(file){
      this.toggleShowImageLoading();
      const { uploadCallback } = this.props.config;
      uploadCallback(file)
        .then(({ data }) => {
          this.setState({
            showImageLoading: false,
            dragEnter: false,
            imgSrc: data.link || data.url,
          });
          this.fileUpload = false;
        }).catch(() => {
          this.setState({
            showImageLoading: false,
            dragEnter: false,
          });
        });
    }
    toggleShowImageLoading(){
      const showImageLoading = !this.state.showImageLoading;
      this.setState({
        showImageLoading,
      });
    }
    render() {
      const {
        config: { icon, className, title,inputAccept },
        translations,
      } = this.props;
      return (
        <div onClick={this.fileUploadClick} className="rdw-image-wrapper">
          <label htmlFor="file">
            <img src={icon} alt="Image"/>
          </label>
          <input
              type="file"
              id="file"
              accept={inputAccept}
              onChange={this.selectImage}
              className="rdw-image-modal-upload-option-input"
            />
        </div>
      );
    }
  }