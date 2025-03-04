"use client";

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}

interface TaskFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function NewTaskModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void>;
}) {
  async function handleSubmit(event: React.FormEvent<TaskFormElement>) {
    event.preventDefault();
    const title = event.currentTarget.elements.title.value.trim();
    const description = event.currentTarget.elements.description.value.trim();
    await onSubmit(title, description);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded shadow">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Task</h2>
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 rounded border focus:border-blue-500 focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 rounded border focus:border-blue-500 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
