const SizeList = ({ sizes, handler = false }) => {
  return sizes?.map(({ allowed, price, retail_price, size, stock }) => (
    <div key={size} className="size_list_item">
      <h3>{size}</h3>
      <h4>
        <span>Allowed: {allowed}</span>
        <span>Stock: {stock}</span>
      </h4>
      <h4>
        <span>Price: {price}</span>
        <span>MRP: {retail_price}</span>
      </h4>
      {handler && (
        <div className="delete" onClick={() => handler(size)}>
          &#10006;
        </div>
      )}
    </div>
  ));
};

export default SizeList;
