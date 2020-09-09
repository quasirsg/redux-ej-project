let id = 0;
function reducer(state = [], action) {
  switch (action.type) {
    case 'AGREGAR': {
      id++;

      return [
        ...state,
        {
          id,
          text: action.payload.text,
        },
      ];
    }

    case'BORRAR': {
      const index = state.findIndex((n) => n.id === action.payload.id);

      state.splice(index, 1);

      return [...state];
    }

    case 'ALTERNAR': {
      const item = state.find((n) => n.id === action.payload.id);

      item.completado = !item.completado;

      return [
          ...state,
        ];
    }

    default:
      return state;
  }
}

export default reducer;
