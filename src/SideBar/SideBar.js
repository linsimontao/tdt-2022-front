import { Link } from 'react-router-dom';
import { InfoIcon, RiderIcon, MapIcon, ShareIcon } from "../Pages/Common/CustomSVG";
import { RIDER, MAP, INFO, SHARE } from '../constant/Constant';

const data = [
    {
        title: RIDER,
        path: `${process.env.PUBLIC_URL}/`,
        icon: <RiderIcon fill="#000" width="20.55" height="18.01"/>
    },
    {
        title: MAP,
        path: `${process.env.PUBLIC_URL}/map`,
        icon: <MapIcon fill="#000" width="16.56" height="16.56"/>
    },
    {
        title: INFO,
        path: '/info',
        icon: <InfoIcon fill="#000" width="17.58" height="17.58"/>
    }
    // {
    //     title: SHARE,
    //     path: '/info',
    //     icon: <ShareIcon fill="#000" width="12.83" height="14"/>
    // }
];

export const SideBar = ({active, setActive}) => {
    return (
        <>
            <nav className="sidebar">
                <div className="sidebar-icon-list">
                    {data.map((item, i) => {
                        return (
                            <Link key={`${item.title}-${i}`} to={item.path} onClick={() => setActive(item.title)}>
                                <div className={active === item.title? "sidebar-icon-item-active": "sidebar-icon-item"} >
                                    {item.icon}
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}