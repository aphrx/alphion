import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase('database-8.db');


export const deleteTask = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Workouts WHERE id = ?", [id]);
    })
  }

export const insertTask = (name, colourOption) => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO Workouts (task, colourOption) VALUES (?, ?)", [name, colourOption], 
        function(tx, results) {
            resolve(results.insertId);
        },
        function(tx, error) {
            reject("Error INSERT Task ", error.message);
        }
      );
  });
});


export const insertExercise = (wid, eid, name, muscle, sets, reps) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO Exercises (workoutId, exerciseId, exerciseName, exerciseMuscle, exerciseSets, exerciseReps) VALUES (?, ?, ?, ?, ?, ?)", [wid, eid, name, muscle, sets, reps]);
    });
  }

  export const deleteExercises = (wid) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Exercises WHERE workoutId = ?", [wid]);
    });
  }

  export const updateWorkouts = (name, colour, wid) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE Workouts SET task = ?, colourOption = ? WHERE id = ?", [name, colour, wid]);
    });
  }

  export const insertSet = (wid, eid, sid, si, weight, reps) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO Sets (workoutId, exerciseId, sessionId, setIndex, weight, reps) VALUES (?, ?, ?, ?, ?, ?)", [wid, eid, sid, si, weight, reps]);
    });
  }

  export const insertSession = (wid) => new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO Sessions (workoutId, isComplete) VALUES (?, 0)", [wid],
      function(tx, results) {
        resolve(results.insertId);
      },
      function(tx, error) {
          reject("Error INSERTing SESSION: ", error.message);
      });
    });
  });

  export const getPrevSession = (wid, isAll) => new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if(isAll){
        tx.executeSql("SELECT id, DATETIME(date, 'localtime') FROM Sessions WHERE workoutId = ? AND isComplete = 1 ORDER BY id DESC", [wid],
          function(tx, results) {
            resolve(results.rows._array);
          },
          function(tx, error) {
              reject("Error INSERT ALL PREV", error.message);
          });
      } 
      else{
        tx.executeSql("SELECT id, DATETIME(date, 'localtime') FROM Sessions WHERE workoutId = ? AND isComplete = 1 ORDER BY id DESC LIMIT 1", [wid],
          function(tx, results) {
            console.log(results.rows._array[0])
            if(results.rows.length != 1){
              resolve({id: -1, date: -1});
            }
            else{
              resolve(results.rows._array[0]);
            }
          },
          function(tx, error) {
              reject("Error INSERT LAST PREV", error);
          });
      }
    });
  });

  export const completeSession = (sid) =>{ 
    db.transaction((tx) => {
      tx.executeSql("UPDATE Sessions SET isComplete = 1 WHERE id = ?", [sid]);
    });
  };

  export const getSetsForExercise = (wid, sid, eid) => new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Sets WHERE workoutId = ? AND sessionId = ? AND exerciseId = ? ORDER BY setIndex ASC", [wid, sid, eid],
      function(tx, results) {
        resolve(results.rows._array);
      },
      function(tx, error) {
          reject("Error INSERT GET SETS ", error.message);
      });
    });
  });

  export const getSessions = () => new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT DATE(date, 'localtime') as date, COUNT(id) as count FROM Sessions WHERE isComplete = 1 GROUP BY DATE(date, 'localtime')", [],
      function(tx, results) {
        resolve(results.rows._array);
      },
      function(tx, error) {
          reject("Error INSERT GET SETS ", error.message);
      });
    });
  });

  export const getSessionStartTime = (sid) => new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT id, workoutId, isComplete, DATETIME(date, 'localtime') FROM Sessions WHERE id = ?", [sid],
      function(tx, results) {
        console.log(results)
        resolve(results.rows._array[0].date);
      },
      function(tx, error) {
          reject("Error INSERT GET Date", error);
      });
    });
  });

export const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS Workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, colourOption INTEGER);")
      tx.executeSql("CREATE TABLE IF NOT EXISTS Exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutId INTEGER, exerciseId INTEGER, exerciseName TEXT, exerciseMuscle TEXT, exerciseSets FLOAT, exerciseReps FLOAT);")
      tx.executeSql("CREATE TABLE IF NOT EXISTS Sets (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutId INTEGER, exerciseId INTEGER, sessionId INTEGER, setIndex INTEGER, weight FLOAT, reps INTEGER);")
      tx.executeSql("CREATE TABLE IF NOT EXISTS Sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutId INTEGER, isComplete INTEGER, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);")
    })
  }