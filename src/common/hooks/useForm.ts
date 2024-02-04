import { ChangeEvent, useState } from "react";
import { FormValues } from "../types/types";

export function useForm(inputValues: FormValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
