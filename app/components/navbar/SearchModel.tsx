'use client'
import qs from "query-string"
import { useRouter, useSearchParams } from "next/navigation"
import Modal from "../modals/Modal"
import useSearchModal from "../utils/hooks/useSearchModal"
import {useMemo, useState , useCallback} from 'react'
import { Range } from "react-date-range"
import CountrySelect, { CountrySelectValue } from "../utils/inputs/CountrySelect"
import dynamic from "next/dynamic"
import { formatISO } from "date-fns"
import Heading from "../utils/Heading"
import Calendar from "../utils/inputs/Calendar"
import Counter from "../utils/inputs/Counter"

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const searchModal = useSearchModal()
  const router = useRouter()
  const params = useSearchParams()
  
  const [location , setLocation] = useState<CountrySelectValue>()
  const [step , setStep] = useState(STEPS.LOCATION)
  const [guestCount , setGuestCount] = useState(1)
  const [roomCount , setRoomCount] = useState(1)
  const [bathroomCount , setBathroomCount] = useState(1)
  const [dateRange , setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key:'selection'
  })

  const Map = useMemo(() =>dynamic(() => import('../utils/Map'),{
    ssr: false,
  }) , [location])

  const onBack = useCallback(() => {
    setStep((value) => value -1)
  }, [])
  
  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  } , [])
  
  const onSubmit = useCallback(async() => {
    if(step !== STEPS.INFO){
      return onNext()
    }
    
    let currentQuery = {};
    
    if ( params ){
       currentQuery = qs.parse(params.toString())

      }
      
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      }

      if(dateRange.startDate){
        updatedQuery.startDate = formatISO(dateRange.startDate)
      }

      if(dateRange.endDate){
        updatedQuery.endDate = formatISO(dateRange.endDate)
      }

      const url = qs.stringifyUrl({
        url: "/",
        query: updatedQuery,
      } , { skipNull: true })
      
      setStep(STEPS.LOCATION)
      searchModal.onClose()
      router.push(url)
    } ,[
      step , searchModal , location , router ,guestCount , roomCount , bathroomCount , dateRange , onNext , params
    ]) 

    const actionLabel = useMemo(() => {
      if(step === STEPS.INFO){
        return 'Search'
      }

      return 'Next'

    } , [step])

    const secondaryActionLabel = useMemo(() => {
      if(step == STEPS.LOCATION){
        return undefined;
      }

      return 'Back'

    }, [step])

    let bodyContent = (
      <div className="flex flex-col gap-8" >
        <Heading
          title="Where do you wanna go"
          subtitle="Find the perfect location"
        />
        <CountrySelect 
          value={location}
          onChange={(value) =>
          setLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    )

    if(step === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8 " >
          <Heading
          title="When do you plan to go"
          subtitle="Make sure everyone is safe"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
        </div>
      )
    }

    if(step === STEPS.INFO){
      bodyContent = (
        <div className="flex flex-col gap-8 " >
           <Heading
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter 
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter 
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter 
          title="Bathrooms"
          subtitle="How many bathrooms doyou need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
        </div>
      )
    }


  return (
    <Modal 
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
    />
  )
}

export default SearchModal
