import './Info.css';
import { INFO } from '../../constant/Constant';
import { useHistory } from "react-router-dom";

export const Info = ({ setActive, setInfoDisplayed }) => {
    setInfoDisplayed(true);
    setActive(INFO);
    const history = useHistory();
        
    const clickHandler = () => {
        history.push("/");
    };

    return (
        <div className="info">
            <div className="info-title">
                <h2>本サービスについて</h2>
            </div>
            <div className="info-divider"></div>
            <div className="info-body">
                <p className="info-text">Dummy</p>
            </div>
            <div className="info-bottom">
                <button className="info-btn" onClick={ clickHandler }>閉じる</button>
            </div>
        </div>
    );
}