export interface IHeroBanner {
  card?: JSX.Element;
  image?: JSX.Element;
  slider?: JSX.Element;
}

export const HeroBanner = ({ card, image, slider }: IHeroBanner) => {
  return (
    <div className=" w-full p-8 ">
      <div className="z-10 w-full flex justify-between items-center">
        {card && card}
        {image && image}
        {slider && slider}
      </div>
    </div>
  );
};
