import Search from "../../icons/Search";

const SearchBar = () => {
  return (
    <form className="search_bar">
      <input
        type="search"
        name="search"
        className="search"
        placeholder="Dog Food/ Cat Food/ Treats/ etc..."
        autoFocus={true}
        autoCapitalize="true"
      />
      <div className="n">
        <Search />
      </div>
    </form>
  );
};

export default SearchBar;
