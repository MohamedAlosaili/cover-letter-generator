import { ChangeEvent, ComponentProps, MutableRefObject, useState } from "react";
import Button from "../Button";
import Input from "./Input";

import inputs from "../../inputs";

interface FormProps extends ComponentProps<"form"> {
  userInfo: MutableRefObject<{
    [key: string]: string;
  }>;
}

const Form = ({ userInfo, ...props }: FormProps) => {
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    userInfo.current = { ...userInfo.current, [name]: value };
  };

  return (
    <>
      <Button
        alt
        className="mx-auto text-sm"
        onClick={() => setShowOptional(prev => !prev)}
      >
        {showOptional ? "Hide" : "Show"} Optional Inputs
      </Button>
      <form
        {...props}
        className="py-8 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
      >
        {inputs.map(
          ({ label, hint, ...input }) =>
            (input.required || showOptional) && (
              <Input key={input.id} {...input} onChange={handleChange}>
                <span>
                  {label}{" "}
                  <span className="text-rose-600">{input.required && "*"}</span>
                </span>
                {hint && (
                  <>
                    <span className="block rounded-full w-5 h-5 text-sm text-center border border-black/50 cursor-pointer mr-2 peer">
                      !
                    </span>
                    <span className="absolute z-10 bg-white shadow-2xl rounded-lg p-3 border border-black/10 bottom-0 left-1 opacity-0 transition-opacity pointer-events-none peer-hover:opacity-100">
                      {hint}
                    </span>
                  </>
                )}
              </Input>
            )
        )}
        <Button className="sm:col-span-2 w-11/12 md:w-full mx-auto">
          Generate
        </Button>
      </form>
    </>
  );
};

export default Form;
