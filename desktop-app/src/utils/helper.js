export const getBg = (id, currentId) => {
  if (id === currentId)
    return "#444444"
}

export const getColor = (method) => {
  if (method === "GET")
    return "#049a13"
  else if (method === "POST")
    return "orange"
  else if (method === "PUT")
    return "pink"
  return "white"
}