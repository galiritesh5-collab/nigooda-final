type Props = {
  section: any;
};

const StrengthWeaknessCard = ({ section }: Props) => {

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4 text-green-700">
          Strengths
        </h2>

        <ul className="space-y-3">

          {section.strengths.map((item: string, index: number) => (

            <li key={index}>
              ✅ {item}
            </li>

          ))}

        </ul>

      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4 text-red-700">
          Concerns
        </h2>

        <ul className="space-y-3">

          {section.weaknesses.map((item: string, index: number) => (

            <li key={index}>
              ⚠️ {item}
            </li>

          ))}

        </ul>

      </div>

    </div>
  );
};

export default StrengthWeaknessCard;