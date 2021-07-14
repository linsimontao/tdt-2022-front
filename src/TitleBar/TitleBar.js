import './TitleBar.css';
import { Mainlogo } from '../Pages/Common/CustomSVG';

export const TitleBar = () => {
    return (
        <div className="titlebar">
            <div className="main-logo">
                <Mainlogo />
            </div>
        </div>
    )
}