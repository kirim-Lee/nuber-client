/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPlace
// ====================================================

export interface editPlace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface editPlace {
  EditPlace: editPlace_EditPlace;
}

export interface editPlaceVariables {
  placeId: number;
  name?: string | null;
  isFav?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlace
// ====================================================

export interface addPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface addPlace {
  AddPlace: addPlace_AddPlace;
}

export interface addPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChat
// ====================================================

export interface getChat_GetChat_chat_messages {
  __typename: "Message";
  id: number;
  text: string;
  userId: number | null;
}

export interface getChat_GetChat_chat {
  __typename: "Chat";
  passengerId: number;
  driverId: number;
  messages: (getChat_GetChat_chat_messages | null)[] | null;
}

export interface getChat_GetChat {
  __typename: "GetChatResponse";
  ok: boolean;
  error: string | null;
  chat: getChat_GetChat_chat | null;
}

export interface getChat {
  GetChat: getChat_GetChat;
}

export interface getChatVariables {
  chatId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_SendChatMessage_message {
  __typename: "Message";
  text: string;
  chatId: number | null;
}

export interface sendMessage_SendChatMessage {
  __typename: "SendChatMessageResponse";
  ok: boolean;
  error: string | null;
  message: sendMessage_SendChatMessage_message | null;
}

export interface sendMessage {
  SendChatMessage: sendMessage_SendChatMessage;
}

export interface sendMessageVariables {
  text: string;
  chatId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateMyProfile: updateProfile_UpdateMyProfile;
}

export interface updateProfileVariables {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reportMovement
// ====================================================

export interface reportMovement_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
  error: string | null;
}

export interface reportMovement {
  ReportMovement: reportMovement_ReportMovement;
}

export interface reportMovementVariables {
  orientation?: number | null;
  lastLat?: number | null;
  lastLng?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNearByDrivers
// ====================================================

export interface getNearByDrivers_GetNearByDrivers_drivers {
  __typename: "User";
  id: number;
  lastLat: number | null;
  lastLng: number | null;
}

export interface getNearByDrivers_GetNearByDrivers {
  __typename: "GetNearbyDriversResponse";
  ok: boolean;
  error: string | null;
  drivers: (getNearByDrivers_GetNearByDrivers_drivers | null)[] | null;
}

export interface getNearByDrivers {
  GetNearByDrivers: getNearByDrivers_GetNearByDrivers;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestRide
// ====================================================

export interface requestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface requestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  error: string | null;
  ride: requestRide_RequestRide_ride | null;
}

export interface requestRide {
  RequestRide: requestRide_RequestRide;
}

export interface requestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRides
// ====================================================

export interface getRides_GetNearByRide_ride_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRides_GetNearByRide_ride {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: getRides_GetNearByRide_ride_passenger;
}

export interface getRides_GetNearByRide {
  __typename: "GetNearByRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRides_GetNearByRide_ride | null;
}

export interface getRides {
  GetNearByRide: getRides_GetNearByRide;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptRide
// ====================================================

export interface acceptRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface acceptRide {
  UpdateRideStatus: acceptRide_UpdateRideStatus;
}

export interface acceptRideVariables {
  rideId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: nearbyRides
// ====================================================

export interface nearbyRides_NearbyRideSubscription_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface nearbyRides_NearbyRideSubscription {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: nearbyRides_NearbyRideSubscription_passenger;
}

export interface nearbyRides {
  NearbyRideSubscription: nearbyRides_NearbyRideSubscription | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleDriving
// ====================================================

export interface toggleDriving_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface toggleDriving {
  ToggleDrivingMode: toggleDriving_ToggleDrivingMode;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerification
// ====================================================

export interface startPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface startPhoneVerification {
  StartPhoneVerification: startPhoneVerification_StartPhoneVerification;
}

export interface startPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRide
// ====================================================

export interface getRide_GetRide_ride_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  chatId: number | null;
  driver: getRide_GetRide_ride_driver | null;
  passenger: getRide_GetRide_ride_passenger;
}

export interface getRide_GetRide {
  __typename: "GetRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRide_GetRide_ride | null;
}

export interface getRide {
  GetRide: getRide_GetRide;
}

export interface getRideVariables {
  rideId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: rideUpdates
// ====================================================

export interface rideUpdates_RideStatusSubscription_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  chatId: number | null;
  driver: rideUpdates_RideStatusSubscription_driver | null;
  passenger: rideUpdates_RideStatusSubscription_passenger;
}

export interface rideUpdates {
  RideStatusSubscription: rideUpdates_RideStatusSubscription | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRide
// ====================================================

export interface updateRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface updateRide {
  UpdateRideStatus: updateRide_UpdateRideStatus;
}

export interface updateRideVariables {
  rideId: number;
  status: StatusOptions;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface verifyPhone {
  CompletePhoneVerification: verifyPhone_CompletePhoneVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  firstName: string;
  lastName: string;
  email: string | null;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaces
// ====================================================

export interface getPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isFav: boolean;
}

export interface getPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (getPlaces_GetMyPlaces_places | null)[] | null;
}

export interface getPlaces {
  GetMyPlaces: getPlaces_GetMyPlaces;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOptions {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  ONROUTE = "ONROUTE",
  REQUESTING = "REQUESTING",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
