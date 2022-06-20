import OhenImg from './Ohen.png';
import OhenGif from './Ohen.gif';
import './Ohen.css';
export const Ohen = ({ terrain, setFireworks }) => {
    return (
        <div className={terrain? "ohen-button-terrain": "ohen-button"} onClick={() => {if(setFireworks) setFireworks(true)}}>
            <img className="ohen-img" src={OhenGif} />
        </div>
    );
}
