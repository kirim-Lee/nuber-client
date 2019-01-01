import React from 'react';

interface IProps {
    submitFn: (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void;
    className: string;
}
const Form: React.SFC<IProps> = ({submitFn, className, children}) => (
    <form 
        className={className}
         onSubmit={ e => {
            e.preventDefault(); 
            submitFn(e);
        }}
    >
    {children}
    </form>
);

export default Form;