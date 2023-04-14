export interface IHeroBanner {
  card?: JSX.Element;
  image?: JSX.Element;
}

export const HeroBanner = ({ card, image }: IHeroBanner) => {
  return (
    <header className=" w-full p-8 ">
      <div className="z-10 w-full flex flex-wrap justify-between items-center">
        {card && card}
        {image && image}
      </div>
    </header>
  );
};
