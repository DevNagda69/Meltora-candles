import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const buttonClass = `btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`;

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="loading"></span>
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
