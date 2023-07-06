import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters." })
    .max(50),
  dueDate: z.string().refine(
    (dateString) => {
      const date = new Date(dateString);
      return (
        !isNaN(date.getTime()) && dateString === date.toISOString().slice(0, 10)
      );
    },
    {
      message: "Invalid date. The format should be YYYY-MM-DD.",
    }
  ),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type TaskFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          {...register("title")}
          id="title"
          type="text"
          className="form-control"
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          {...register("dueDate")}
          id="dueDate"
          type="date"
          className="form-control"
        />
        {errors.dueDate && (
          <p className="text-danger">{errors.dueDate.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default TaskForm;
