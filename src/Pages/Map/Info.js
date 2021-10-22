import './Info.css';
import { 
    INFO, 
    INFO_CONTENT_PLAIN1_PART1, 
    INFO_CONTENT_PLAIN1_PART2,
    INFO_CONTENT_PLAIN2, 
    INFO_CONTENT_PLAIN3, 
    INFO_CONTENT_PLAIN4, 
    INFO_CONTENT_PLAIN5,
    INFO_CONTENT_SMALL,
    INFO_CONTENT_BOLD1, 
    INFO_CONTENT_BOLD2, 
    INFO_CONTENT_BOLD3, 
    INFO_CONTENT_LINK1,
    INFO_CONTENT_LINK2,
    INFO_CONTENT_LINK3
} from '../../constant/Constant';
import { useHistory } from "react-router-dom";
import { CloseIcon } from '../Common/CustomSVG';

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
                <div className="info-close" onClick={clickHandler}>
                    <CloseIcon />
                </div>
                <h3>リアルタイムマップ東北応援企画</h3>
            </div>
            <div className="info-divider"></div>
            <div className="info-body">
                <span className="info-text-plain">{INFO_CONTENT_PLAIN1_PART1}</span>
                <a href={INFO_CONTENT_LINK1}><span className="info-text-plain">{INFO_CONTENT_LINK1}</span></a>
                <span className="info-text-plain">{INFO_CONTENT_PLAIN1_PART2}</span>
                <span className="info-text-bold">{INFO_CONTENT_BOLD1}</span>
                <span className="info-text-plain">{INFO_CONTENT_PLAIN2}</span>
                <span className="info-text-bold">{INFO_CONTENT_BOLD2}</span>
                <span className="info-text-plain">{INFO_CONTENT_PLAIN3}</span>
                <span className="info-text-bold">{INFO_CONTENT_BOLD3}</span>
                <span className="info-text-plain">{INFO_CONTENT_PLAIN4}</span>
                <span className="info-text-small">{INFO_CONTENT_SMALL}</span>
                <a href={INFO_CONTENT_LINK2}><span className="info-text-small">{INFO_CONTENT_LINK2}</span></a>
                <span className="info-text-small">{INFO_CONTENT_PLAIN5}</span>
                <a href={INFO_CONTENT_LINK3}><span className="info-text-small">{INFO_CONTENT_LINK3}</span></a>
            </div>
        </div>
    );
}