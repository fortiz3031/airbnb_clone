import ListingCard from "../components/listings/ListingCard";
import Container from "../components/utils/Container";
import Heading from "../components/utils/Heading";
import { SafeListing, SafeUser } from "../types"

  
interface FavouritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null ;
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
      <Heading 
        title="Favourites"
        subtitle="List of places you have favourited!"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 "
      >
        {listings.map((listing: any) => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                />                
            ))}
      </div>
    </Container>
  )
}

export default FavouritesClient
