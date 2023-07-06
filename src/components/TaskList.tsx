interface Task {
  id: number;
  title: string;
  dueDate: string;
  category: string;
}

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onDelete }: Props) => {
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Due Date</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.dueDate}</td>
            <td>{task.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
