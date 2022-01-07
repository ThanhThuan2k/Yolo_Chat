import './ChatAvatar.scss';

export default function ChatAvatar(props) {
    const styles = {
        width: props.width,
        height: props.width,
        opacity: props.opacity,
        marginRight: props.margin > 0 ? '20px' : '0',
        marginLeft: props.margin < 0 ? '20px' : '0',
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
    margin: 1,
}