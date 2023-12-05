import getCurrentUser from "../actions/getCurrentUser"
import getFavouriteListings from "../actions/getFavouriteListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/utils/EmptyState"
import FavouritesClient from "./FavouritesClient"


const ListingPage = async () => {
  const listings = await getFavouriteListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="looks like you have no favourite listings"
        />
      </ClientOnly>
    )
  }

  return(
    <ClientOnly>
      <FavouritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage
