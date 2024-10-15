export type CreateToDoRequest = {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
};

export type CreateToDoResponse = {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  dueDate: string;
  priority: string;
};
