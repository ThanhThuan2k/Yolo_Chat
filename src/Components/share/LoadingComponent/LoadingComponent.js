import { Spinner } from 'react-bootstrap';
import './LoadingComponent.scss';

export default function LoadingComponent(props) {
    return (
        <div className="loading-container" style={{width: props.width, height: props.height}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="span">Vui lòng chờ</div>
        </div>
    );
}

LoadingComponent.defaultProps = {
    width: '100%',
    height: '100%'
}