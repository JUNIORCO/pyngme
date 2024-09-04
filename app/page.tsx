import { PageContentContainer } from "./components/common";
import CreatePyng from "./components/create-pyng/create-pyng";
import PopularPyngs from "./components/popular-pyngs/popular-pyngs";

export default async function Home() {
  return (
    <PageContentContainer>
      <CreatePyng />
      <PopularPyngs />
    </PageContentContainer>
  );
}
