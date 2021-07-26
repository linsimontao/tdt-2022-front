import OhenImg from './Ohen.png';
import './Ohen.css';
export const Ohen = ({ terrain }) => {
    return (
        <div className={terrain? "ohen-button-terrain": "ohen-button"}>
            <img className="ohen-img" src={OhenImg} />
        </div>
    );
}
