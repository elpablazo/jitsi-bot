import { ErrorMessage, Field } from "formik";

export default function FormField({
  name,
  title,
  type = "text",
  ...props
}: any) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm text-gray-600 text-left px-2 font-semibold"
      >
        {title}
      </label>
      <Field
        name={name}
        type={type}
        className="border-2 rounded px-4 py-2 border-gray-500 font-semibold focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-600 focus:outline-none"
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm text-left pl-2"
      />
    </div>
  );
}
