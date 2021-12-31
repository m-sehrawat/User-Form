import { useState } from "react";
import { FormInput } from "./FormInput";


export const Form = () => {

    const initState = {
        fullName: "",
        age: "",
        address: "",
        department: "",
        salary: "",
        isMarried: ""
    }

    const [formData, setFormData] = useState(initState);
    const [isMarried, setIsMarried] = useState(false);

    const handleChange = (e) => {
        let { name, value, checked, type } = e.target;
        value = type === "checkbox" ? checked : value;
        type === "checkbox" && setIsMarried(!isMarried);

        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <FormInput submit={handleSubmit} handleChange={handleChange} isMarried={isMarried} />
        </>
    );
};