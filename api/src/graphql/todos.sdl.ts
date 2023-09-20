export const schema = gql`
  type Todo {
    id: Int!
    body: String!
    completed: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    todos: [Todo!]! @requireAuth
    todo(id: Int!): Todo @requireAuth
  }

  input CreateTodoInput {
    body: String!
    completed: Boolean!
  }

  input UpdateTodoInput {
    body: String
    completed: Boolean
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`
