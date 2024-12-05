import { useState } from "react";

const SearchBarCombobox = ({
  suggestions,
  onSelect,
  handleInputChange,
  query,
  setQuery,
  isOpen,
  setIsOpen,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions?.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      // reset
      resetSearchBar();
    }
  };

  const resetSearchBar = () => {
    setIsOpen(!isOpen);
    setActiveIndex(-1);
    setQuery("");
  };

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    resetSearchBar();
  };

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Suggestions Dropdown */}
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {suggestions?.length > 0 ? (
            suggestions?.map((suggestion, index) => (
              <li
                key={suggestion.id}
                onClick={() => handleSelect(suggestion)}
                className={`px-4 py-2 cursor-pointer ${
                  activeIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                <div>
                  <p className="">{suggestion.name}</p>
                  {suggestion.type === "restaurant" ? (
                    <p className="text-gray-500 text-sm">View Restaurant</p>
                  ) : (
                    <p className="text-gray-500 text-sm">See Item Restaurant</p>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-600">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBarCombobox;
