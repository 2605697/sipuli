import { events, ads } from "../mock_data/AdsBar.json";
import classes from "../css/adsbar.module.css";
import placeholder from "../assets/ad-placeholder.svg";

function SearchBox({ }) {
  return (
    <input className={classes.search} type="search" placeholder="Search" />
  )
}

function Event({ event: { date, title, location } }) {
  return (
    <div className={classes.event}>
      <span className={classes.eventdate}>{date}</span>
      <span className={classes.eventtitle}>{title}</span>
      <span className={classes.eventlocation}>{location}</span>
    </div>
  )
}

function EventList({ }) {
  return (
    <div className={classes.panel}>
      <h2 className={classes.panelheader}>Events</h2>
      {
        events.map((event, index) => {
          return (
            <Event key={index} event={event}></Event>
          )
        })
      }
    </div>
  )
}

function Ad({ ad: { title, href } }) {
  return (
    <a className={classes.ad} href={href} target="_blank" rel="noreferrer">
      <img className={classes.adimage} src={placeholder} alt={title} />
      <span className={classes.adtitle}>{title}</span>
    </a>
  )
}

function AdsList({ }) {
  return (
    <div className={classes.panel}>
      {
        ads.map((ad, index) => {
          return (
            <Ad key={index} ad={ad}></Ad>
          )
        })
      }
    </div>
  )
}

function AdsBar({ }) {
  return (
    <div className={classes.root}>
      <SearchBox />
      <div className={classes.scroll}>
        <AdsList />
        <EventList />
      </div>
    </div>
  )
}

export default AdsBar
