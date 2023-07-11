import { ChangeEvent, ComponentProps, MutableRefObject, useState } from "react";
import Button from "../Button";
import Input from "./Input";

import inputs, { UserInfo } from "@/inputs";

interface FormProps extends ComponentProps<"form"> {
  userInfo: MutableRefObject<UserInfo>;
  loading: boolean;
}

const Form = ({ userInfo, loading, ...props }: FormProps) => {
  const [showOptional, setShowOptional] = useState(false);

  // Refresh form inputs when reset clicked
  const [formKey, setFormKey] = useState(Math.random().toString());

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    userInfo.current = { ...userInfo.current, [name]: value };
  };

  return (
    <form
      key={formKey}
      {...props}
      className="py-8 grid px-4 sm:grid-cols-2 gap-4 max-w-2xl mx-auto overflow-hidden"
    >
      {inputs.map(
        ({ label, hint, ...input }) =>
          (input.required || showOptional) && (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              disabled={loading}
            >
              <span>
                {label}{" "}
                <span className="text-rose-600">{input.required && "*"}</span>
              </span>
              {hint && (
                <>
                  <span className="flex items-center justify-center rounded-full w-4 h-4 text-xs border border-black/50 cursor-pointer mr-2 peer">
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
      <Button
        alt
        type="button"
        className="text-sm"
        onClick={() => setShowOptional(prev => !prev)}
      >
        {showOptional ? "Hide" : "Show"} Optional Inputs
      </Button>
      <Button
        alt
        type="reset"
        disabled={loading}
        onClick={() => setFormKey(Math.random().toString())}
      >
        Reset Fields
      </Button>
      <Button className="sm:col-span-2" disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
};

export default Form;
