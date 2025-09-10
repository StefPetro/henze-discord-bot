import { writeFileSync } from "fs";
import { HenzeEvent, TimeBandEvent, Root } from "../interfaces/interfaces"

export const writeHenzeOddsToFile = async () => {
  const response = await fetch("https://content.sb.danskespil.dk/content-service/api/v1/q/time-band-event-list?maxMarkets=9999&marketSortsIncluded=--,H1,H2,HH,HL,MH,MR,WH&marketGroupTypesIncluded=CUSTOM_GROUP,MATCH_RESULT,MONEYLINE,STATIC_SPREAD,STATIC_TOTAL&allowedEventSorts=MTCH&includeChildMarkets=true&prioritisePrimaryMarkets=true&includeCommentary=true&includeIncidents=true&includeMedia=true&drilldownTagIds=12&excludeDrilldownTagIds=20769,22796,22797,22800&maxTotalItems=120&maxEventsPerCompetition=99&maxCompetitionsPerSportPerBand=99&maxEventsForNextToGo=99&startTimeOffsetForNextToGo=600");
  const data = await response.json() as Root;
  const tomorrow = data.data.timeBandEvents.filter(x => x.type === "TOMORROW")?.[0];
  const fileName = `./henze.txt`;
  if (tomorrow?.events) {
    const henzeEvents = getHenzeOddsFromTimeBandEvents(tomorrow);
    console.log(`Total amount of Henze Events found: ${henzeEvents.length}`);
    
    if (henzeEvents.length > 0) {
      writeFileSync(
        fileName,
        henzeEvents.map(event => `${event.event}: Market: ${event.market}, Outcome: ${event.outcome}, Odds: ${event.odds}`).join("\n"),
        {
          flag: "w"
        }
      );

      console.log(`Henze odds written to file: ${fileName}`);
    }
  } else {
    console.log("No events found.");
  }

  return fileName;
}

const getHenzeOddsFromTimeBandEvents = (timeBandEvents: TimeBandEvent) => {
  const events = timeBandEvents.events.filter(event => event.markets.some(market => market.outcomes.find(x => x.prices.find(y => y.decimal <= 1.2))));
  // Find all henze odds from events that has them
  const odds = events.map(event => {
    return event.markets.flatMap(market => {
      return market.outcomes.flatMap(x => {
        return x.prices.filter(y =>  1.08 <= y.decimal && y.decimal <= 1.2).map(y => ({
          event: event.name,
          market: market.name,
          outcome: x.name,
          odds: y.decimal
        }) as HenzeEvent);
      });
    });
  });
  return odds.flat();
}