import ScoreCard from "./ScoreCard";
import TextSection from "./TextSection";
import StrengthWeaknessCard from "./StrengthWeaknessCard";

type Props = {
  sections: any[];
};

const DynamicRenderer = ({ sections }: Props) => {

  return (
    <div className="space-y-6">

      {sections.map((section, index) => {

        switch (section.type) {

          case "score_grid":
            return (
              <ScoreCard
                key={index}
                section={section}
              />
            );

          case "text_block":
            return (
              <TextSection
                key={index}
                section={section}
              />
            );

          case "strengths_weaknesses":
            return (
              <StrengthWeaknessCard
                key={index}
                section={section}
              />
            );

          default:
            return null;
        }

      })}

    </div>
  );
};

export default DynamicRenderer;