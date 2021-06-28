export const SubPageTitle = ({ subPageTitle, subPageActive, setSubPageActive }) => {
    if (subPageActive) {
        return (
            <div className="subpage-title">
                <button className="subpage-button" onClick={() => setSubPageActive(false)}>{'<'}</button>
                <h2>{subPageTitle}</h2>
            </div>
        )
    } else {
        return (
            <div className="subpage-title">
                <button className="subpage-button" onClick={() => setSubPageActive(true)}>{'>'}</button>
            </div>
        )
    }
}
