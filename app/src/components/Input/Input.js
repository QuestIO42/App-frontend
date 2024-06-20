/**
 * 
 * @param {Object} props - Properties of the object
 * @param {string} name - Label/Title of the objet e.g. (email, username, ...)
 * @param {function} value - The variable at the input
 * @param {function} setValue - Function to set the variable value (should come from useState function)
 * @param {boolean} type - Sets the input type, defaults to text (text/password/radio/checkbox/button)
 * @returns
 */
export default function Input(props){
    return (

    <div className="mb-4">
        <label htmlFor={props.name} className="form-label">{props.name}</label>
        <input
            type={props.type || "text"}
            className="form-input"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
        />
        {props.children}
    </div>
        
    );
}