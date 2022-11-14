import './result.css'
const Result = ({ response }) => {
  const getBG = (status) => {
    if (status >= 500)
      return "orange"
    else if (status >= 400)
      return "red"
    else if (status >= 300)
      return "blue"
    else if (status >= 200)
      return "green"
    else return "violet"
  }

  return (
    <div className="result-tab-container">
      <p style={{ fontSize: "1.5vw" }}>HTTP status code responses: </p>
      {
        response?.response?.map(res =>
          <div className='response-count' key={res.status}
            style={{ backgroundColor: getBG(res.status) }}>
            <p>{res.status}: {res.count} times</p>
          </div>
        )
      }
    </div>
  );
}
export default Result;