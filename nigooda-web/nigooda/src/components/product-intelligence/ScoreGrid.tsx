type Props = {
  section: any;
};

const ScoreCard = ({ section }: Props) => {

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      <h2 className="text-2xl font-bold mb-5">
        {section.title}
      </h2>

      <div className="space-y-4">

        {section.items.map((item: any, index: number) => (

          <div
            key={index}
            className="border rounded-xl p-4"
          >

            <div className="flex items-center justify-between">

              <h3 className="font-semibold">
                {item.label}
              </h3>

              <span className="font-bold text-indigo-600">
                ⭐ {item.score}
              </span>

            </div>

            <p className="text-gray-600 text-sm mt-2">
              {item.reason}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ScoreCard;