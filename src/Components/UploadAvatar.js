import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCrop, FaTrashAlt } from 'react-icons/fa';
import "../Styles/UploadAvatar.scss";

class UploadAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            url: null
        }
    }

    clickHandle = (e) => {
        if (this.state.url == null) {
            const current = this.myRef.current;
            current.click();
        } else {
            return;
        }
    }

    uploadImageHandle = (e) => {
        const file = e.target.files[0];
        var fileReader = new FileReader();
        var url = fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            this.setState((state) => ({
                ...state,
                url: fileReader.result,
            }));
            this.props.getImage(file);
        }
    }

    deleteClickHandle = () => {
        this.setState((state) => ({
            ...state,
            url: null
        }));
        this.props.deleteImage();
    }

    render() {
        return (
            <div className={this.props.className + " " + "upload-image"} onClick={(e) => this.clickHandle(e)}>
                {
                    this.state.url == null ? (
                        <>
                            <input type="file" accept="image/*" onChange={(e) => this.uploadImageHandle(e)} ref={this.myRef} className="input-tag" />
                            <div className="circle">
                                <AiOutlinePlus className="plus-icon" />
                            </div>
                        </>
                    ) : (
                        <>
                            <img src={this.state.url} className="show-image" />
                            <div className="image-action-area">
                                <div className="action">
                                    <div className="delete-button action-item" onClick={() => this.deleteClickHandle()}>
                                        <FaTrashAlt className="delete-icon icon" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        );
    }
}

UploadAvatar.defaultProps = {
    className: "item"
}

export default UploadAvatar;