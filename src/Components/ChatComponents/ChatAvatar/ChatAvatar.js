import './ChatAvatar.scss';

export default function ChatAvatar(props) {
    const styles = {
        width: props.width,
        height: props.width,
        opacity: props.opacity,
        display: props.display ? 'block' : 'none',
    }
    return (
        <div className="avatar" style={styles}>
            <div className="avatar-container">
                <img className="image" src={props.avatar} alt="" />
            </div>
            {
                props.displayOnline && props.online ? <span className="online-dot"></span> : <></>
            }
        </div>
    );
}

ChatAvatar.defaultProps = {
    avatar: 'https://picsum.photos/200',
    width: '80px',
    displayOnline: false,
    online: false,
    opacity: '1',
    display: true,
}