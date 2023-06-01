import './Button.css';
const Button = (props) => {
  return (
    <button
      className={`todo-item-btn ${props.className}`}
      onClick={props.onClick}
      type={props.type | 'button'}
    >
      {props.btnValue}
    </button>
  );
};
export default Button;
