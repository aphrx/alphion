import * as SQLite from "expo-sqlite";
import { Exercises } from "../data/Exercises.js";

export const db = SQLite.openDatabase("data-104a.db");

export const deleteTask = (id) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM Workouts WHERE id = ?", [id]);
  });
};

export const insertTask = (name, colourOption) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Workouts (task, colourOption) VALUES (?, ?)",
        [name, colourOption],
        function (tx, results) {
          resolve(results.insertId);
        },
        function (tx, error) {
          reject("Error INSERT Task ", error.message);
        }
      );
    });
  });

export const insertExercise = (wid, eid, name, muscle, sets, reps) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Exercises (workoutId, exerciseId, exerciseName, exerciseMuscle, exerciseSets, exerciseReps) VALUES (?, ?, ?, ?, ?, ?)",
      [wid, eid, name, muscle, sets, reps]
    );
  });
};

export const deleteExercises = (wid) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM Exercises WHERE workoutId = ?", [wid]);
  });
};

export const updateWorkouts = (name, colour, wid) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Workouts SET task = ?, colourOption = ? WHERE id = ?",
      [name, colour, wid]
    );
  });
};

export const insertSet = (wid, eid, sid, si, weight, reps) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Sets (workoutId, exerciseId, sessionId, setIndex, weight, reps) VALUES (?, ?, ?, ?, ?, ?)",
      [wid, eid, sid, si, weight, reps]
    );
  });
};

export const updateSet = (wid, eid, sid, si, weight, reps) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Sets SET weight = ?, reps = ? WHERE workoutId = ? AND exerciseId = ? AND sessionId = ? AND setIndex = ?", [weight, reps, wid, eid, sid, si]
    );
  });
};

export const deleteSet = (wid, eid, sid, si) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Sets WHERE workoutId = ? AND exerciseId = ? AND sessionId = ? AND setIndex = ?", [wid, eid, sid, si]
    );
  });
};

export const insertSession = (wid) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Sessions (workoutId, isComplete) VALUES (?, 0)",
        [wid],
        function (tx, results) {
          resolve(results.insertId);
        },
        function (tx, error) {
          reject("Error INSERTing SESSION: ", error.message);
        }
      );
    });
  });

export const getPrevSessionSets = (wid, eid, isAll) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (isAll) {
        tx.executeSql(
          "SELECT sess.id, DATETIME(sess.date, 'localtime') FROM Sessions sess LEFT JOIN Sets s ON sess.id = s.sessionId WHERE sess.workoutId = ? AND sess.isComplete = 1 AND s.exerciseId = ? ORDER BY sess.id DESC ",
          [wid, eid],
          function (tx, results) {
            resolve(results.rows._array);
          },
          function (tx, error) {
            reject("Error INSERT ALL PREV", error.message);
          }
        );
      } else {
        tx.executeSql(
          "SELECT id, DATETIME(date, 'localtime') FROM Sessions WHERE workoutId = ? AND isComplete = 1 ORDER BY id DESC LIMIT 1",
          [wid],
          function (tx, results) {
            if (results.rows.length != 1) {
              resolve({ id: -1, date: -1 });
            } else {
              resolve(results.rows._array[0]);
            }
          },
          function (tx, error) {
            reject("Error INSERT LAST PREV", error);
          }
        );
      }
    });
  });

  export const getPrevSession = (wid, eid) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
        tx.executeSql(
          "SELECT sess.id, DATETIME(sess.date, 'localtime') FROM Sessions sess WHERE sess.workoutId = ? AND sess.isComplete = 1 ORDER BY sess.id DESC ",
          [wid],
          function (tx, results) {
            resolve(results.rows._array);
          },
          function (tx, error) {
            reject("Error INSERT ALL PREV", error.message);
          }
        );
    });
  });

export const getSessionSets = (sid) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Sets WHERE sessionId = ? GROUP BY exerciseId ORDER BY id DESC",
        [sid],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error INSERT ALL PREV", error.message);
        }
      );
    });
  });

export const completeSession = (sid) => {
  db.transaction((tx) => {
    tx.executeSql("UPDATE Sessions SET isComplete = 1 WHERE id = ?", [sid]);
  });
};

export const getSetsForExercise = (wid, sid, eid) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Sets WHERE workoutId = ? AND sessionId = ? AND exerciseId = ? ORDER BY setIndex ASC",
        [wid, sid, eid],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error INSERT GET SETS ", error.message);
        }
      );
    });
  });

export const getSessions = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT DATE(date, 'localtime') as date, COUNT(id) as count FROM Sessions WHERE isComplete = 1 GROUP BY DATE(date, 'localtime')",
        [],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error INSERT GET SETS ", error.message);
        }
      );
    });
  });

export const isLastSessionComplete = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT isComplete FROM Sessions WHERE isComplete = 1 GROUP BY DATE(date, 'localtime')",
        [],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error INSERT GET SETS ", error.message);
        }
      );
    });
  });

export const getSessionStartTime = (sid) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, workoutId, isComplete, DATETIME(date, 'localtime') FROM Sessions WHERE id = ?",
        [sid],
        function (tx, results) {
          resolve(results.rows._array[0].date);
        },
        function (tx, error) {
          reject("Error INSERT GET Date", error);
        }
      );
    });
  });

export const insertExerciseOption = (exercise, muscle, isCustom) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO ExerciseOptions (exercise, muscle, isCustom) VALUES (?, ?, ?)",
        [exercise, muscle, isCustom],
        function (tx, results) {
          resolve(results.insertId);
        },
        function (tx, error) {
          reject("Error INSERTing Exercises: ", error.message);
        }
      );
    });
  });

export const getExerciseOptionsCount = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM ExerciseOptions",
        [],
        function (tx, results) {
          resolve(results.rows._array[0].count);
        },
        function (tx, error) {
          reject("Error GET Count", error);
        }
      );
    });
  });

export const getExerciseName = (eid) => 
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT exercise FROM ExerciseOptions WHERE id = ?",
        [eid],
        function (tx, results) {
          resolve(results.rows._array[0].exercise);
        },
        function (tx, error) {
          reject("Error INSERT GET Exercises", error);
        }
      );
    });
  });

export const getExerciseOptions = (page, search) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ExerciseOptions WHERE exercise LIKE ? LIMIT 20 OFFSET 20*(?-1)",
        [`%${search}%`, page],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error INSERT GET Exercises", error);
        }
      );
    });
  });
  

export const getIfLastSessionCompleted = (workoutId) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Sessions WHERE workoutId = ? ORDER BY id DESC LIMIT 1",
        [workoutId],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error Get Last Session Completed", error);
        }
      );
    });
  });

  export const getAllSessions = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT s.*, task FROM Sessions s LEFT JOIN Workouts w ON w.id = s.workoutId WHERE s.isComplete = 1",
        [],
        function (tx, results) {
          resolve(results.rows._array);
        },
        function (tx, error) {
          reject("Error Get Last Session Completed", error);
        }
      );
    });
  });

export const createTable = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, colourOption INTEGER);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutId INTEGER, exerciseId INTEGER, exerciseName TEXT, exerciseMuscle TEXT, exerciseSets FLOAT, exerciseReps FLOAT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Sets (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutId INTEGER, exerciseId INTEGER, sessionId INTEGER, setIndex INTEGER, weight FLOAT, reps INTEGER);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutId INTEGER, isComplete INTEGER, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS ExerciseOptions (id INTEGER PRIMARY KEY AUTOINCREMENT, exercise TEXT, muscle TEXT, isCustom INTEGER);"
    );
  });

  let new_created = await getExerciseOptionsCount();
  if (new_created == 0) {
    for (let i = 0; i < Exercises.length; i++) {
      await insertExerciseOption(Exercises[i].exercise, Exercises[i].muscle, 0);
    }
  }
};
