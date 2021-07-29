import './SelectComponent.css';
export const SelectComponent = ({type, data, onChangeHandler}) => {
    return (
        // <select className={`select-${type}`}>
        <select className={`select-${type}`} onChange={onChangeHandler}>
            {
                data.map(item => <option value={item.value}>{item.name}</option>)
            }
        </select>
    );
}