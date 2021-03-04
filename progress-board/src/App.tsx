import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/database";
//@ts-ignore
import jwtVerify from "jose/dist/browser/jwt/verify";

const SECRET_STR =
  "L3tGLlskXFB0c2MyR3hSRSwnVjk1SloocFxMalFaNTp+SXhQNk9kQ3VbcHQ5b2lIJVEhNkIwdURjPWR2cSJAQA==";
const PRIVATE_KEY = Buffer.from(atob(SECRET_STR));

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyAyKgYHFgHghjs5xmKe-Lcfbw9uLX7nq10",
  authDomain: "viridos-735a4.firebaseapp.com",
  databaseURL: "https://viridos-735a4-default-rtdb.firebaseio.com",
  projectId: "viridos-735a4",
  storageBucket: "viridos-735a4.appspot.com",
  messagingSenderId: "733706320390",
  appId: "1:733706320390:web:4aa064d1df16534e1ea187",
  measurementId: "G-M625MW5KBP",
};

let database: any;

async function init() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  while (firebase.apps.length === 0) {
    await wait(1000);
  }
  firebase
    .database()
    .ref("/")
    .on("value", (data) => {
      database = data.val();
      //console.log(database);
    });
}

init();

export default class App extends React.Component {
  state = {
    database: { statuses: {}, users: {} },
  };

  componentDidMount() {
    (async () => {
      while (true) {
        await wait(1000);
        if (database !== undefined) {
          this.setState({ database: database });
          this.renderStatuses();
        }
      }
    })();
  }

  getName(value: string) {
    //@ts-ignore
    let temp = this.state.database.users[value].name;
    if (temp == undefined) {
      return "";
    } else {
      return temp;
    }
  }

  getCompletion(value: string) {
    //@ts-ignore
    let temp = this.state.database.statuses[value].completed;
    if (temp == undefined) {
      return "";
    } else {
      return temp;
    }
  }

  async getStatus(value: string, skipFormat?: boolean) {
    //@ts-ignore
    let temp = this.state.database.statuses[value].status;
    if (temp == undefined) {
      return "";
    } else {
      if (!isNaN(temp)) {
        if (skipFormat) {
          return temp;
        }
        return temp + " (legacy)";
      } else {
        let res;
        try {
          return await jwtVerify(temp, PRIVATE_KEY).then(
            (out: { payload: { status: any } }) => {
              res = out.payload.status;
              if (skipFormat) {
                return res;
              }
              return res + " (verified)";
            }
          );
        } catch (e) {
          let data64 = temp;
          data64 = data64.substring(data64.indexOf(".") + 1);
          data64 = data64.substring(0, data64.indexOf("."));
          res = JSON.parse(atob(data64)).status;
          if (skipFormat) {
            return res;
          }
          return res + " (faulty)";
        }
      }
    }
  }

  async renderStatuses() {
    let keys = Object.keys(this.state.database.statuses);
    for (let i in keys) {
      let temp = await this.getStatus(keys[i]);
      this.setState({ [keys[i]]: temp });
    }
  }

  compare(a: string, b: string) {
    //let aStatus = await this.getStatus(a, true);
    //let bStatus = await this.getStatus(b, true);
    //@ts-ignore
    let aStatus = Number.parseInt(this.state[a]);
    //@ts-ignore
    let bStatus = Number.parseInt(this.state[b]);
    if (aStatus > bStatus) {
      return -1;
    } else if (bStatus > aStatus) {
      return 1;
    } else {
      let aComplete = this.getCompletion(a);
      let bComplete = this.getCompletion(b);
      if (aComplete == "") {
        return 1;
      }
      if (bComplete == "") {
        return -1;
      }
      if (aComplete > bComplete) {
        return 1;
      } else if (bComplete > aComplete) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "row",
          overflow: "auto",
        }}
      >
        <table>
          <thead>
            <th>pos</th>
          </thead>
          {Object.keys(this.state.database.statuses).map((value, index) => (
            <tbody>
              <td>{index + 1}</td>
            </tbody>
          ))}
        </table>
        <table>
          <thead>
            <th>name</th>
            <th>uid</th>
            <th>status</th>
            <th>completion</th>
          </thead>
          <tbody>
            {Object.keys(this.state.database.statuses)
              .sort((a, b) => this.compare(a, b))
              .map((value) => (
                <tr key={value}>
                  {/* <td>{index + 1}</td> */}
                  <td>{this.getName(value)}</td>
                  <td>{value}</td>
                  {/* @ts-ignore */}
                  <td>{this.state[value]}</td>
                  <td>{this.getCompletion(value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// function App() {
//   const [database, setDatabase] = useState({});
//   let dataFormatted = React.useMemo(() => {
//     let temp: any[] = [];
//     let keys = Object.keys(database);
//     console.log(keys)
//     for (let i in keys) {
//       let objTemp = {
//         uid: i,
//         //@ts-ignore
//         name: database.users[i].name,
//         //@ts-ignore
//         status: database.statuses[i].status,
//       };
//       temp.push(objTemp);
//     }
//     console.log(temp);
//     return temp;
//   }, []);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "name",
//         accessor: "name",
//       },
//       {
//         Header: "status",
//         accessor: "status",
//       },
//       {
//         Header: "uid",
//         accessor: "uid",
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     //@ts-ignore
//   } = useTable({ columns, dataFormatted });

//   useEffect(() => {
//     (async () => {
//       while (true) {
//         await wait(1000);
//         if (database !== undefined) {
//           setDatabase(database);
//         }
//       }
//     })();
//   }, []);

//   return (
//     <div className="App">
//       <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps()}
//                   style={{
//                     borderBottom: "solid 3px red",

//                     background: "aliceblue",

//                     color: "black",

//                     fontWeight: "bold",
//                   }}
//                 >
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);

//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td
//                       {...cell.getCellProps()}
//                       style={{
//                         padding: "10px",

//                         border: "solid 1px gray",

//                         background: "papayawhip",
//                       }}
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
