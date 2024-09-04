import { currentUser } from "@clerk/nextjs/server";
import { Title } from "../common";
import PopularPyngsCard from "./card";

export default async function PopularPyngs() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="flex flex-col gap-4">
      <Title>Popular Pyngs</Title>

      <div className="carousel carousel-center rounded-box space-x-4">
        <div className="carousel-item">
          <PopularPyngsCard
            title="Price Drops"
            content="the price goes under $25"
            userEmail={userEmail}
          />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard
            title="New Reviews"
            content="a new review is posted"
            userEmail={userEmail}
          />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard
            title="Blog Posts"
            content="a new blog post is published"
            userEmail={userEmail}
          />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard
            title="New Jobs"
            content="a new job is posted"
            userEmail={userEmail}
          />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard
            title="Track Hires"
            content="a new employee is hired"
            userEmail={userEmail}
          />
        </div>
        <div className="carousel-item">
          <PopularPyngsCard
            title="Sale"
            content="a new sale is announced"
            userEmail={userEmail}
          />
        </div>
      </div>
    </div>
  );
}
