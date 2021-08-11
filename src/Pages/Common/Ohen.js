import OhenImg from './Ohen.png';
import OhenGif from './Ohen.gif';
import './Ohen.css';
export const Ohen = ({ terrain }) => {
    return (
        <div className={terrain? "ohen-button-terrain": "ohen-button"}>
            <img className="ohen-img" src={OhenGif} />
        </div>
    );
}
