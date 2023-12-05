import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/utils/EmptyState"
import TripsClient from "./TripsClient"


const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if(reservations.length === 0) {
        return(
            <ClientOnly>
                <EmptyState 
                    title="No Trip Found"
                    subtitle="Looks like you havent reserved any trips."
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default TripsPage
