import React from 'react';
import {ScrollView, StyleSheet, Text, RefreshControl, View} from 'react-native';
import AppStatusBar from "./AppStatusBar";
import {any} from "prop-types";

const LOCALE = "es-US"
const US_LOCALE = "en-US"
const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const MONTHS = 5
const DESIRED_DATE = "2019-09-01"

export default class HomeScreen extends React.Component {

  state = {
    refreshing: false,
    updated: new Date(),
    slots: [
    ],
    error: ""
  }

  private title = "Consulado General deEspaña\nen San Francisco"
  private startDate: any
  private endDate: any

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      updated: new Date(),
      slots: [
      ],
      error: ""
    }

    this.startDate = new Date(/*"10/1/2019"*/)
    this.startDate.setHours(0, 0, 0, 0)
    // Set to beginning of month
    this.startDate.setDate(1)
    console.log(`startDate: ${this.startDate.toLocaleDateString(LOCALE)}`)

    this.endDate = new Date(this.startDate)
    this.endDate.setMonth(this.endDate.getMonth()+MONTHS)
    this.endDate.setHours(-24)
    console.log(`endDate: ${this.endDate.toLocaleDateString(LOCALE)}`)
  }

  componentDidMount(): void {
    this.onRefresh()
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <AppStatusBar/>
        <ScrollView contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <Text style={styles.titleText}>{this.title}</Text>
          <Text style={styles.subTitleText}>
            Rango de fechas: {this.startDate.toLocaleDateString(US_LOCALE)} - {this.endDate.toLocaleDateString(US_LOCALE)}
          </Text>
          <Text style={styles.subTitleText}>Actualizado: {this.state.updated.toLocaleString(US_LOCALE)}</Text>
          {this.state.refreshing &&
            <Text style={styles.loadingText}>Loading...</Text>
          }
          { this.renderSlots() }
          {this.state.error !== "" &&
            <Text style={styles.errorText}>{this.state.error}</Text>
          }
        </ScrollView>
      </View>
    );
  }

  renderSlots = () => {
    return (
      <React.Fragment>
        {this.state.slots.map((slot, i) => {
          const date = new Date(slot.date)
          date.setMinutes(date.getTimezoneOffset())
          const dateStyle = (slot.date <= DESIRED_DATE) ? styles.desiredDateText : styles.dateText
          const times = this.renderTimes(slot.times)
          if (times.length > 0) {
            return (
              <React.Fragment key={slot.date}>
                <Text style={dateStyle}>{date.toLocaleDateString(LOCALE, DATE_OPTIONS)}</Text>
                <Text style={styles.timeText}>
                  {times.map((time, j) => {
                    return (
                      <Text key={slot.date+j}>{time}{j < times.length-1 ? "," : ""} </Text>
                    )
                  })}
                </Text>
              </React.Fragment>
            )
          } else {
            return null
          }
        })}
      </React.Fragment>
    )
  }

  renderTimes = (times: []) => {
    let results = new Array()
    let j = 0
    Object.keys(times).forEach(key => {
      let time = times[key].time
      if (time.startsWith("0")) {
        time = time.substr(1)
      }
      results.push(<Text key={j++}>{time}</Text>)
    })
    return results
  }

  onRefresh = async () => {
    this.setState({
      refreshing: true,
      updated: new Date(),
      slots: [],
      error: ""
    })

    let date = new Date(this.startDate)
    await this.fetchData(date)
    date.setMonth(date.getMonth() + 1)
    await this.fetchData(date)
    date.setMonth(date.getMonth() + 1)
    await this.fetchData(date)
    date.setMonth(date.getMonth() + 1)
    await this.fetchData(date)
    date.setMonth(date.getMonth() + 1)
    await this.fetchData(date)
    const count = this.countSlots(this.state.slots)
    this.setState({
      refreshing: false,
      error: (count === 0) ? "No appointments available" : ""
    })
  }

  fetchData = async (startDate: Date) => {
    try {
      // No slots
      // const responseText = `callback=jQuery211023413918402414224_1560269559404({"Slots":[{"agenda":"bkt86361","date":"2019-07-01","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-02","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-03","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-04","times":[],"state":2},{"agenda":"bkt86361","date":"2019-07-05","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-06","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-07","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-08","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-09","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-10","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-11","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-12","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-13","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-14","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-15","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-16","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-17","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-18","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-19","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-20","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-21","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-22","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-23","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-24","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-25","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-26","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-27","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-28","times":[],"state":0},{"agenda":"bkt86361","date":"2019-07-29","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-30","times":[],"state":3},{"agenda":"bkt86361","date":"2019-07-31","times":[],"state":3}],"maxDays":"2021-06-11"});`
      // Has slots
      // const responseText = `callback=jQuery211023413918402414224_1560269559404({"Slots":[{"agenda":"bkt86361","date":"2019-10-01","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-02","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-03","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-04","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-05","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-06","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-07","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-08","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-09","times":[],"state":1},{"agenda":"bkt86361","date":"2019-10-10","times":{"610":{"time":"10:10"}},"state":1},{"agenda":"bkt86361","date":"2019-10-11","times":{"580":{"time":"09:40"},"620":{"time":"10:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-12","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-13","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-14","times":{"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"620":{"time":"10:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-15","times":{"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-16","times":{"540":{"time":"09:00"},"560":{"time":"09:20"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-17","times":{"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-18","times":{"550":{"time":"09:10"},"560":{"time":"09:20"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-19","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-20","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-21","times":{"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-22","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-23","times":{"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-24","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-25","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-26","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-27","times":[],"state":0},{"agenda":"bkt86361","date":"2019-10-28","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-29","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-30","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1},{"agenda":"bkt86361","date":"2019-10-31","times":{"540":{"time":"09:00"},"550":{"time":"09:10"},"560":{"time":"09:20"},"570":{"time":"09:30"},"580":{"time":"09:40"},"590":{"time":"09:50"},"600":{"time":"10:00"},"610":{"time":"10:10"},"620":{"time":"10:20"},"660":{"time":"11:00"},"670":{"time":"11:10"},"680":{"time":"11:20"}},"state":1}],"maxDays":"2021-06-11"});`

      let endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth()+1)
      endDate.setHours(-24)
      const start = this.toISODateString(startDate)
      const end = this.toISODateString(endDate)
      console.log(`Fetching ${start} - ${end}`)
      const url = `https://app.bookitit.com/onlinebookings/datetime/?callback=jQuery211023413918402414224_1560269559404&type=default&publickey=21a8d76163e6f2dc0e5ca528c922d37c3&lang=es&services%5B%5D=bkt180488&agendas%5B%5D=bkt86361&version=1&src=https%3A%2F%2Fapp.bookitit.com%2Fes%2Fhosteds%2Fwidgetdefault%2F21a8d76163e6f2dc0e5ca528c922d37c3&srvsrc=https%3A%2F%2Fapp.bookitit.com&start=${start}&end=${end}&selectedPeople=1&_=1560269559408`

      const response = await fetch(
        url,
      );
      const responseText = await response.text()
      const startPos = responseText.indexOf("{")
      const endPos = responseText.lastIndexOf("}")
      if (startPos >= 0 && endPos >= 0) {
        const jsonText = responseText.substring(startPos, endPos+1)
        const responseJson = JSON.parse(jsonText);
        if (responseJson["Slots"]) {
          this.setState({
            refreshing: true,
            updated: new Date(),
            slots: this.state.slots.concat(responseJson["Slots"]),
            error: ""
          })
        } else {
          this.setState({
            refreshing: false,
            error: "Invalid server response"
          })
        }
      } else {
        this.setState({
          refreshing: false,
          error: "Invalid server response"
        })
      }
    } catch (error) {
      console.error(error);
      this.setState({
        refreshing: false,
        error: error
      })
    }
  }

  private countSlots(slots) {
    let count = 0
    slots.forEach(slot => {
      if (slot.times) {
        count += slot.times.length
      }
    })
    return count
  }

  private toISODateString(date: Date) {
    const dateString = date.toISOString()
    return dateString.substr(0, 10)
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 14,
    fontStyle: "italic"
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  desiredDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: "red"
  },
  timeText: {
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    paddingTop: 20
  },
  loadingText: {
    paddingTop: 20,
    fontSize: 14,
    fontStyle: "italic"
  }
});

