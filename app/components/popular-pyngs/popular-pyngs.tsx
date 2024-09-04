import { Title } from "../common";
import PopularPyngsCard from "./card";

export default function PopularPyngs() {
  return (
    <div className="flex flex-col gap-4">
      <Title>Popular Pyngs</Title>

      <div className="carousel rounded-box space-x-4">
        <div className="carousel-item">
          <PopularPyngsCard title="Price Drops" type="primary" />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard title="Blog Posts" type="secondary" />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard title="Sale" type="accent" />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard title="New Jobs" type="success" />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard title="Track Leadership" type="error" />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard title="New Reviews" type="warning" />
        </div>
      </div>
    </div>
  );
}
