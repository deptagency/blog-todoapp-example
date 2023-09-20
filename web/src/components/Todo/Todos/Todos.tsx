import { FileEdit, XCircle } from 'lucide-react'
import type {
  DeleteTodoMutationVariables,
  EditTodoById,
  FindTodos,
  UpdateTodoInput,
} from 'types/graphql'

import { Form, CheckboxField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Todo/TodosCell'
import { truncate } from 'src/lib/formatters'

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodoMutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodoMutation($id: Int!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      body
      completed
      createdAt
      updatedAt
    }
  }
`

const TodosList = ({ todos }: FindTodos) => {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTodoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todo ' + id + '?')) {
      deleteTodo({ variables: { id } })
    }
  }

  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo updated')
      navigate(routes.todos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateTodoInput, id: EditTodoById['todo']['id']) => {
    updateTodo({ variables: { id, input } })
  }

  return (
    <div className="flex justify-center px-8">
      <table className="container max-w-4xl">
        <tbody>
          {todos.map((todo) => {
            if (!todo.completed) {
              return (
                <tr
                  key={todo.id}
                  className={`flex items-center p-4 transition-opacity ${
                    todo.completed && 'opacity-25'
                  }`}
                >
                  <td>
                    <Form>
                      <CheckboxField
                        id="completed"
                        name="completed"
                        onChange={() =>
                          onSave({ completed: !todo.completed }, todo.id)
                        }
                        defaultChecked={todo.completed}
                        className="rw-input h-4 w-4"
                        errorClassName="rw-input rw-input-error"
                      />
                    </Form>
                  </td>
                  <td className="flex-1 px-2">{truncate(todo.body)}</td>
                  <td>
                    <nav className="rw-table-actions gap-2">
                      <Link
                        to={routes.editTodo({ id: todo.id })}
                        title={'Edit todo ' + todo.id}
                        className="text-gray-500 hover:text-green-500"
                      >
                        <FileEdit />
                      </Link>
                      <button
                        type="button"
                        title={'Delete todo ' + todo.id}
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => onDeleteClick(todo.id)}
                      >
                        <XCircle />
                      </button>
                    </nav>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TodosList
