import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import { Box } from "@material-ui/core";
import "./Dashboard.scss";
import GameTable from "./GameTable";
import { useWindowSize } from "../../utils/useWindowSize";

const Dashboard = (props) => {
  const { games = [], refreshCallback } = props;
  const [gameData, setGameData] = useState({});
  const size = useWindowSize();

  function compare(a, b) {
    return moment.utc(a.date).diff(moment.utc(b.date));
  }

  function average(list) {
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
      sum = sum + list[i].score;
    }

    return sum / list.length || 0;
  }

  const prepareData = useCallback(() => {
    var alabels = [];
    var adata = [];
    var blabels = [];
    var bdata = [];

    function movingAverage(list) {
      var averageList = [];
      for (var i = 1; i < list.length + 1; i++) {
        averageList.push(average(list.slice(0, i)));
      }
      return averageList;
    }

    if (games === null || games.length === 0) {
      return;
    } else {
      games.sort(compare);

      var averageList = movingAverage(games);
      averageList[0] = games[0].score;

      for (var i = 0; i < games.length; i++) {
        alabels.push(i);
        adata.push(games[i].score);
      }

      for (var j = 0; j < averageList.length; j++) {
        blabels.push(j);
        bdata.push(averageList[j]);
      }

      var mostRecentGameSorted = games.reverse();

      setGameData({
        games: mostRecentGameSorted,
        averages: averageList,
        labels: alabels,
        datasets: [
          {
            label: "Games",
            data: adata,
            fill: false,
            backgroundColor: "#42A5F5",
            borderColor: "#42A5F5",
            fontColor: "#fff",
          },
          {
            label: "Average",
            data: bdata,
            fill: false,
            backgroundColor: "#66BB6A",
            borderColor: "#66BB6A",
            fontColor: "#fff",
          },
        ],
      });
    }
  }, [games]);

  useEffect(() => {
    prepareData();
  }, [games, prepareData]);

  return (
    <div className="GameChart-container w-full p-0">
      <Box className="GameChart-ParentGrid">
        {size.width > 960 && (
          <Box className="GameChart-Grid" direction="row">
            <Chart className="GameChart" type="line" data={gameData} />
          </Box>
        )}
        <div id="insideDiv">
          <GameTable
            {...props}
            games={games}
            refreshCallback={refreshCallback}
          />
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
