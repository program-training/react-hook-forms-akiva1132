import {  useForm } from "react-hook-form";
import "./RegularForm.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  gender: string;
}

interface Props {
  field: string;
  messege: any;
}
const errorMassege = (props: Props) => {
  return <p>{`${props.field} ${props.messege}`}</p>;
};


function RegularForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();


  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Change Me To React Hook Form</h1>
      <div>
        <input
          type="text"
          id="username"
          placeholder="Enter UserName"
          {...register("username", {
            required: { value: true, message: "is required" },
            minLength: { value: 4, message: "is minLength" },
          })}

          aria-invalid={errors.username ? "true" : "false"}
        />
        {errors.username
          ? errorMassege({
              field: "username",
              messege: errors.username?.message,
            })
          : null}
      </div>

      <div>
        <input
          type="text"
          id="email"
          placeholder="Enter Email"
          {...register("email", {
            required: { value: true, message: "is required" },
            minLength: { value: 4, message: "is minLength" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "is unsupported",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email
          ? errorMassege({ field: "email", messege: errors.email.message })
          : null}
      </div>

      <div>
        <input
          type="text"
          id="password"
          placeholder="Enter Password"
          {...register("password", {
            required: { value: true, message: "is required" },
            minLength: { value: 8, message: "is minLength" },
            maxLength: { value: 20, message: "is maxLength" },
            pattern: {
              value:
                /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
              message: "is unsupported",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password
          ? errorMassege({
              field: "password",
              messege: errors.password.message,
            })
          : null}
      </div>
      <div>
        <select
          {...register("gender", {
            required: { value: true, message: "is required" },
          })}
          name="gender">
          <option value="">gender</option>
          <option value="male">male</option>
          <option value="famale">famale</option>
        </select>
        {errors.gender
          ? errorMassege({ field: "gender", messege: errors.gender.message })
          : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegularForm;
