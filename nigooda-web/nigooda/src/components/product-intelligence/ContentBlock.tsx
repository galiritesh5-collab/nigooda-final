type Props = {
  section: any;
};

const TextSection = ({ section }: Props) => {

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      <h2 className="text-2xl font-bold mb-4">
        {section.title}
      </h2>

      <p className="text-gray-700 leading-7 whitespace-pre-line">
        {section.content}
      </p>

    </div>
  );
};

export default TextSection;