export interface HenzeEvent {
  event: string;
  market: string;
  outcome: string;
  odds: number
}

// BELOW IS AUTO GENERATED FROM THE API RESPONSE

export interface Root {
  data: Data
  extensions: any
  errors: any[]
}

export interface Data {
  timeBandEvents: TimeBandEvent[]
}

export interface TimeBandEvent {
  type: string
  date?: string
  competitionSummary: CompetitionSummary[]
  events: Event[]
  outrights: Outright[]
}

export interface CompetitionSummary {
  competitionDrilldownTagId: string
  typeIds: string[]
  eventCount: number
  marketCount?: number
}

export interface Event {
  id: string
  externalIds: ExternalId[]
  extKey: any
  retailCode: any
  name: string
  active: boolean
  displayed: boolean
  status: string
  displayOrder: number
  popularityOrder: any
  channels: string[]
  sortCode: string
  startTime: string
  started: boolean
  liveNow: boolean
  liveBettingAvailable: boolean
  liveRcpBettingAvailable: boolean
  resulted: boolean
  settled: boolean
  cashoutAvailable: boolean
  sportId: string
  competitionDrilldownTagId: string
  raceNumber: number
  venue: any
  isVoid: boolean
  blurb: any
  fixedOddsAvailable: boolean
  rcpAvailable: boolean
  statisticsAvailable: boolean
  neutralVenue: boolean
  meeting: any
  teams: Team[]
  mediaProviders: MediaProvider[]
  type: Type
  class: Class
  category: Category
  marketCount: number
  marketCounts: MarketCounts
  markets: Market[]
  commentary?: Commentary
}

export interface ExternalId {
  id: string
  provider: string
}

export interface Team {
  id: any
  side: string
  name: string
  alternativeNames: AlternativeName[]
  code: any
  externalId: any
  status: any
}

export interface AlternativeName {
  type: string
  value: string
}

export interface MediaProvider {
  id?: string
  name: string
  providerCode: any
  mediaType: string
  media: Medum[]
  logoResource: any
  listingUrl?: string
}

export interface Medum {
  active: boolean
  url: any
  startTime: string
  endTime?: string
  externalMediaIds: ExternalMediaId[]
}

export interface ExternalMediaId {
  id: string
  type: string
}

export interface Type {
  id: string
  name: string
  alternativeNames: any[]
  displayOrder: string
  fixedOddsAvailable: boolean
}

export interface Class {
  id: string
  name: string
  displayOrder: string
}

export interface Category {
  id: string
  name: string
  displayOrder: string
  code: string
}

export interface MarketCounts {
  total: number
  fixedOdds: number
}

export interface Market {
  id: string
  eventId: string
  templateMarketId: string
  type: string
  subType: string
  name: string
  active: boolean
  displayed: boolean
  status: string
  collectionIds: string[]
  betInRun: boolean
  rcpBetInRun: boolean
  resulted: any
  flags: string[]
  displayOrder: number
  displaySortId: any
  channels: string[]
  handicapValue?: number
  livePriceAvailable: boolean
  cashoutAvailable: boolean
  rcpAvailable: boolean
  minimumAccumulator: number
  maximumAccumulator: number
  fixedOddsAvailable: boolean
  groupCode: string
  blurb: any
  retailCode: any
  outcomes: Outcome[]
}

export interface Outcome {
  id: string
  marketId: string
  name: string
  type: string
  subType?: string
  displayOrder: number
  active: boolean
  displayed: boolean
  status: string
  channels: string[]
  resulted: boolean
  rcpAvailable: boolean
  runnerNumber: number
  retailCode: any
  outcomeScore: any
  prices: Price[]
}

export interface Price {
  numerator: number
  denominator: number
  decimal: number
  displayOrder: number
  priceType: string
  handicapLow?: string
  handicapHigh?: string
}

export interface Commentary {
  clock: Clock
  participants: Participant[]
  facts: Fact[]
  periods: any[]
}

export interface Clock {
  id: string
  offset: number
  lastUpdate: string
  state: string
}

export interface Participant {
  id: string
  name: string
  type: string
  role: string
  roleCode: string
  active: boolean
}

export interface Fact {
  id: string
  type: string
  value: string
  participantId: string
}

export interface Outright {
  id: string
  name: string
  displayOrder: number
  startTime: string
  sportId: string
  competitionDrilldownTagId: string
  blurb?: string
  type: Type2
  class: Class2
  category: Category2
  marketCount: number
  marketCounts: MarketCounts2
  markets: Market2[]
}

export interface Type2 {
  id: string
  name: string
  displayOrder: string
  fixedOddsAvailable: boolean
}

export interface Class2 {
  id: string
  name: string
  displayOrder: string
}

export interface Category2 {
  id: string
  name: string
  displayOrder: string
  code: string
}

export interface MarketCounts2 {
  total: number
  fixedOdds: number
}

export interface Market2 {
  id: string
  eventId: string
  templateMarketId: string
  type: string
  subType: string
  name: string
  active: boolean
  displayed: boolean
  status: string
  resulted: any
  flags: string[]
  displayOrder: number
  displaySortId: any
}
