import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";
import getListings, { IListingsParams } from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import getCurrentUser from "./actions/getCurrentUser";
export const dynamic = "force-dynamic";
interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  // throw new Error(
  //   "This error was thrown on purpose to simulate a server error",
  // );

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
