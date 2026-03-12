type Props = {
  categories: string[];
  onSelect: (category: string) => void;
};

const CategorySelector = ({ categories, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="border rounded-lg p-4 text-left hover:bg-slate-50 font-medium"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
