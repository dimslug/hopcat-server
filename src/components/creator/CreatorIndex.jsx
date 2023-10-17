import React from 'react'
import CreatorDisplay from './CreatorDisplay'

export default function CreatorIndex(props ) {
  console.log(props)
  const sessiontoken = props.sessiontoken
  const setSessionToken = props.setSessionToken
  const currentPage = props.currentPage
  const creatorID = props.creatorID
  const setCreatorID = props.setCreatorID
  return (
   <CreatorDisplay 
   setSessionToken={setSessionToken}
   sessiontoken={sessiontoken} 
   currentPage={currentPage}
   setCreatorID={setCreatorID}
   creatorID={creatorID}
   />
  )
}
