import React, { useState, useEffect, PureComponent } from "react";
import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Papa from "papaparse";
import "./styles.css";
import csvFile from "./data_sample.csv";

class PlotData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      startDate: null,
      endDate: null,
      countryCntrlChecked: true,
      appCntrlChecked: true,
      adCntrlChecked: true,
      platformCntrlChecked: true,
      usersCntrlCheck: true,
      showChartView: true,
      showTableView: false
    };
    this.checkCountry = this.checkCountry.bind(this);
    this.checkAdNetwork = this.checkAdNetwork.bind(this);
    this.checkPlatform = this.checkPlatform.bind(this);
    this.checkApp = this.checkApp.bind(this);
    this.checkUsers = this.checkUsers.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeDateControls = this.changeDateControls.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  shouldComponentUpdate = (newProps, newState) => {
    console.log(
      "Handle here streaming data input type or prop change, as we're using PureComponent/Memoized"
    );
    return true; //return true only if prop is changed in case of streaming input.
  };

  toggleView = () => {
    this.setState({
      showTableView: !this.state.showTableView,
      showChartView: !this.state.showChartView
    });
  };

  checkCountry = () => {
    this.setState({
      countryCntrlChecked: !this.state.countryCntrlChecked
    });
  };

  checkAdNetwork = () => {
    this.setState({
      adCntrlChecked: !this.state.adCntrlChecked
    });
  };

  checkPlatform = () => {
    this.setState({
      platformCntrlChecked: !this.state.platformCntrlChecked
    });
  };

  checkApp = () => {
    this.setState({
      appCntrlChecked: !this.state.appCntrlChecked
    });
  };

  checkUsers = () => {
    this.setState({
      usersCntrlCheck: !this.state.usersCntrlCheck
    });
  };

  changeStartDate = () => {
    const startDateValue = this.refs["start-date"].value;
    this.setState({ startDate: startDateValue });
  };

  changeEndDate = () => {
    const endDateValue = this.refs["end-date"].value;
    this.setState({ endDate: endDateValue });
  };

  changeDateControls = () => {
    const oldData = this.props.data;
    const self = this;
    if (+new Date(this.state.startDate) > +new Date(this.state.endDate)) {
      alert("Dates are incorrect. Plz check and try again");
      return;
    }

    let newData = [];
    for (let index = 0; index < oldData.length; index++) {
      const item = oldData[index];
      if (
        +new Date(
          item.Date.split("/")[2],
          parseInt(item.Date.split("/")[1]) - 1,
          item.Date.split("/")[0]
        ) >= +new Date(self.state.startDate) &&
        +new Date(
          item.Date.split("/")[2],
          parseInt(item.Date.split("/")[1]) - 1,
          item.Date.split("/")[0]
        ) < +new Date(self.state.endDate)
      ) {
        newData.push(item);
      }
    }
    console.log(newData);
    if (!newData.length) {
      alert("No Valid Data Found");
      return;
    }
    this.setState({
      data: newData
    });
  };

  render() {
    // console.log(this.props.data);
    const data = this.state.data;
    console.log("inside render");
    return (
      <div className="container">
        {this.state.showChartView && (
          <div className="plotArea">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCountry" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorPlatform"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#D982CF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D982CF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF89AF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF89AF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9974AC" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9974AC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Date" />
                <YAxis type="category" tick={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                {this.state.countryCntrlChecked ? <Area
                    type="monotone"
                    dataKey="Country"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorCountry)"
                  /> : ''}
                {this.state.appCntrlChecked ? <Area
                    type="monotone"
                    dataKey="App"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorApp)"
                  />: ''}
                {this.state.platformCntrlChecked ? <Area
                    type="monotone"
                    dataKey="Platform"
                    stroke="#D982CF"
                    fillOpacity={1}
                    fill="url(#colorPlatform)"
                  /> : ''}
                {this.state.adCntrlChecked ? <Area
                    type="monotone"
                    dataKey="Ad Network"
                    stroke="#FF89AF"
                    fillOpacity={1}
                    fill="url(#colorAd)"
                  /> : ''}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        {this.state.showTableView && (
          <div className="plotTable">
            <table>
              <tr>
                {this.state.countryCntrlChecked ? <th>Country</th> : ""}
                {this.state.adCntrlChecked ? <th>Ad Network</th> : ""}
                {this.state.platformCntrlChecked ? <th>Platform</th> : ""}
                {this.state.appCntrlChecked ? <th>App</th> : ""}
                {this.state.usersCntrlCheck ? <th>Daily Users</th> : ""}
              </tr>
              {this.state.data.map((item) => {
                return (
                  <tr key={Math.random() + "_" + item.Date}>
                    {this.state.countryCntrlChecked ? (
                      <td>{item["Country"]}</td>
                    ) : (
                      ""
                    )}
                    {this.state.adCntrlChecked ? (
                      <td>{item["Ad Network"]}</td>
                    ) : (
                      ""
                    )}
                    {this.state.platformCntrlChecked ? (
                      <td>{item["Platform"]}</td>
                    ) : (
                      ""
                    )}
                    {this.state.appCntrlChecked ? <td>{item["App"]}</td> : ""}
                    {this.state.usersCntrlCheck ? (
                      <td>{item["Daily Users"]}</td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </table>
          </div>
        )}
        <div className="plotControls">
          <div className="dateControle">
            <strong>Choose DateControls:</strong>
            <div>
              <input
                type="date"
                ref="start-date"
                id="start-date"
                onChange={this.changeStartDate}
                placeholder="start-date"
              />
              <input
                type="date"
                ref="end-date"
                id="end-date"
                onChange={this.changeEndDate}
                placeholder="end-date"
              />
              <div>
                <button
                  className="changeDateControles"
                  onClick={this.changeDateControls}
                >
                  SHOW
                </button>
              </div>
            </div>
          </div>
          <div className="datasetControls">
            <strong>Choose DataSets:</strong>
            <div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={this.state.countryCntrlChecked}
                  onChange={this.checkCountry}
                  className="countryCheck"
                />
                Country
              </div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={this.state.countryCntrlChecked}
                  onChange={this.checkApp}
                  className="countryCheck"
                />
                App
              </div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={this.state.countryCntrlChecked}
                  onChange={this.checkAdNetwork}
                  className="countryCheck"
                />
                Ad Network
              </div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={this.state.countryCntrlChecked}
                  onChange={this.checkPlatform}
                  className="countryCheck"
                />
                Platform
              </div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={this.state.countryCntrlChecked}
                  onChange={this.checkUsers}
                  className="countryCheck"
                />
                Users
              </div>
            </div>
          </div>
          <div className="viewSwitchControl">
            <strong>Choose View Option</strong>
            <div>
              <input
                type="radio"
                defaultChecked={this.state.showTableView}
                checked={this.state.showTableView}
                onChange={this.toggleView}
                className="table-radio"
                id="table-radio"
                refs="table-radio"
              />{" "}
              Show table
              <input
                type="radio"
                defaultChecked={this.state.showChartView}
                checked={this.state.showChartView}
                onChange={this.toggleView}
                className="table-chart"
                id="table-chart"
                refs="table-chart"
              />{" "}
              Show Chart
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // const file = require("./data_sample.csv");
    Papa.parse(csvFile, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log("Finished:", results.data);
        setData(results.data);
      }
    });
  }, []);
  return (
    <div className="App">
      {data.length ? <PlotData data={data} /> : "Loading..."}
    </div>
  );
}
