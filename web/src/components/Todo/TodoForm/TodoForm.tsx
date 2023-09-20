import type { EditTodoById, UpdateTodoInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTodo = NonNullable<EditTodoById['todo']>

interface TodoFormProps {
  todo?: EditTodoById['todo']
  onSave: (data: UpdateTodoInput, id?: FormTodo['id']) => void
  error: RWGqlError
  loading: boolean
}

const TodoForm = (props: TodoFormProps) => {
  const onSubmit = (data: FormTodo) => {
    props.onSave(data, props?.todo?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTodo> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>

        <TextField
          name="body"
          defaultValue={props.todo?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="body" className="rw-field-error" />

        <Label
          name="completed"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Completed
        </Label>

        <CheckboxField
          name="completed"
          defaultChecked={props.todo?.completed}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="completed" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoForm
