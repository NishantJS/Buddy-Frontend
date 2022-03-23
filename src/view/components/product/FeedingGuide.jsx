const FeedingGuide = ({ feeding_guide = {}}) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Feeding Guide</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(feeding_guide).map((element,index) => {
          return (
            <tr key={element+index}>
              <td>{element}</td>
              <td>{feeding_guide[element]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default FeedingGuide
