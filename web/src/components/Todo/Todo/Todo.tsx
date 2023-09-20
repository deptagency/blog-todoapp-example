import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

import type { DeleteTodoMutationVariables, FindTodoById } from 'types/graphql'

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodoMutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

interface Props {
  todo: NonNullable<FindTodoById['todo']>
}

const Todo = ({ todo }: Props) => {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo deleted')
      navigate(routes.todos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTodoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todo ' + id + '?')) {
      deleteTodo({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Todo {todo.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{todo.id}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{todo.body}</td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>{checkboxInputTag(todo.completed)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(todo.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(todo.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTodo({ id: todo.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(todo.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Todo
